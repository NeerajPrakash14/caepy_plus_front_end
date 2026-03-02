import ProfileSubmitted from '@/views/ProfileSubmitted';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function SubmittedPage() {
  return <ProtectedRoute><ProfileSubmitted /></ProtectedRoute>;
}
