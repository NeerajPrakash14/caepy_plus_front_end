import ReviewProfile from '@/views/ReviewProfile';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function ReviewPage() {
  return <ProtectedRoute><ReviewProfile /></ProtectedRoute>;
}
