import axios, {
    type AxiosResponse,
    type InternalAxiosRequestConfig,
    type AxiosError,
} from 'axios';

// ---------------------------------------------------------------------------
// Axios instance — single source of truth for API communication
// ---------------------------------------------------------------------------

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL || '/api/v1',
    headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
    },
});

// ---------------------------------------------------------------------------
// Helper — generate a unique request ID for traceability
// ---------------------------------------------------------------------------

const generateRequestId = (): string => {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) {
        return crypto.randomUUID();
    }
    return 'xxxx-xxxx-xxxx'.replace(/x/g, () =>
        Math.floor(Math.random() * 16).toString(16),
    );
};

// ---------------------------------------------------------------------------
// REQUEST interceptor — centralised header management
// ---------------------------------------------------------------------------
//
// Every outgoing request passes through here. Add any new headers
// (API keys, tracing, feature flags) in one place.
// ---------------------------------------------------------------------------

api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 1. JWT authentication
        const token = localStorage.getItem('access_token');
        const tokenType = localStorage.getItem('token_type') || 'Bearer';
        if (token) {
            config.headers.Authorization = `${tokenType} ${token}`;
        }

        // 2. Traceability / debugging headers
        config.headers['X-Request-ID'] = generateRequestId();
        config.headers['X-Request-Timestamp'] = new Date().toISOString();

        // 3. Client version (helps backend track which frontend version is calling)
        config.headers['X-Client-Version'] = import.meta.env.VITE_APP_VERSION || '1.0.0';

        return config;
    },
    (error) => Promise.reject(error),
);

// ---------------------------------------------------------------------------
// RESPONSE interceptor — centralised error handling
// ---------------------------------------------------------------------------
//
// Every response (success & error) passes through here.
// This is the single place to handle:
//   • 401 auto-logout
//   • Structured error logging
//   • Rate-limiting / retry (future)
//
// The actual GenericResponse unwrapping is done via the `parseResponse`
// and `parseResponseField` helpers below so each service can opt-in to
// the exact extraction it needs without risking breakage.
// ---------------------------------------------------------------------------

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error: AxiosError) => {
        if (error.response?.status === 401) {
            // Clear all auth data
            const keysToRemove = [
                'access_token', 'token_type', 'expires_in',
                'doctor_id', 'mobile_number', 'is_new_user',
                'role', 'doctor_profile', 'caepy_current_user_id',
            ];
            keysToRemove.forEach((key) => localStorage.removeItem(key));

            // Redirect to login (window.location since this is outside React Router)
            if (window.location.pathname !== '/login') {
                window.location.href = '/login';
            }
        }

        return Promise.reject(error);
    },
);

// ---------------------------------------------------------------------------
// Response parsing helpers
// ---------------------------------------------------------------------------
//
// The backend wraps most responses in a GenericResponse envelope:
//   { success: boolean, message: string, data: T }
//
// These helpers provide a **single, consistent** way to extract the
// payload. If the backend changes the envelope shape in the future,
// update ONLY these helpers — every service benefits automatically.
// ---------------------------------------------------------------------------

/**
 * Unwrap a GenericResponse envelope.
 *
 * Given an AxiosResponse whose body is `{ success, data, message }`,
 * returns the inner `data` value. Falls back to the raw body if the
 * envelope isn't present (e.g. legacy endpoints).
 */
export const parseResponse = <T = unknown>(response: AxiosResponse): T => {
    const body = response.data;

    // If the body looks like GenericResponse, extract .data
    if (
        body !== null &&
        typeof body === 'object' &&
        'success' in body &&
        'data' in body
    ) {
        return body.data as T;
    }

    // Fallback: return raw body
    return body as T;
};

/**
 * Extract a specific nested field from a GenericResponse.
 *
 * Useful when the payload looks like `{ success, data: { fields: [...] } }`
 * and you want to pull out `fields` directly.
 *
 * Example:  `parseResponseField(response, 'fields')` → `[...]`
 */
export const parseResponseField = <T = unknown>(
    response: AxiosResponse,
    field: string,
): T => {
    const data = parseResponse<Record<string, unknown>>(response);

    if (data && typeof data === 'object' && field in data) {
        return (data as Record<string, unknown>)[field] as T;
    }

    // Fallback: try the raw body
    const raw = response.data;
    if (raw && typeof raw === 'object' && field in raw) {
        return raw[field] as T;
    }

    return data as T;
};

/**
 * Extract the error detail from an Axios error response.
 *
 * Consistently pulls the human-readable message from various backend
 * error shapes (`detail`, `message`, `error`, status text).
 */
export const parseErrorMessage = (error: unknown): string => {
    if (axios.isAxiosError(error)) {
        const data = error.response?.data;
        if (typeof data === 'string') return data;
        if (data?.detail) return typeof data.detail === 'string' ? data.detail : JSON.stringify(data.detail);
        if (data?.message) return data.message;
        if (data?.error) return data.error;
        return error.response?.statusText || error.message;
    }
    if (error instanceof Error) return error.message;
    return 'An unexpected error occurred';
};

export default api;
