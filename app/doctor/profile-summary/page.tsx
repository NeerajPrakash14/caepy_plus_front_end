import ProfileSummary from '@/views/ProfileSummary';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function ProfileSummaryPage() {
  return <ProtectedRoute><ProfileSummary /></ProtectedRoute>;
}
