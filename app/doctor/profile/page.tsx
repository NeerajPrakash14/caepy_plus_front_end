import ProfileView from '@/views/ProfileView';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function ProfilePage() {
  return <ProtectedRoute><ProfileView /></ProtectedRoute>;
}
