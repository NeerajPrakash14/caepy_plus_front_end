import Dashboard from '@/views/Dashboard';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function DashboardPage() {
  return <ProtectedRoute><Dashboard /></ProtectedRoute>;
}
