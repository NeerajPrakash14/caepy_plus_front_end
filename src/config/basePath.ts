const rawBase = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export const BASE_PATH: string = rawBase
    ? `/${rawBase.replace(/^\/|\/$/g, '')}`
    : '';

export const BASE_PATH_WITH_SLASH: string = BASE_PATH ? `${BASE_PATH}/` : '/';
