import Onboarding from '@/views/Onboarding';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function OnboardingPage() {
  return <ProtectedRoute><Onboarding /></ProtectedRoute>;
}
