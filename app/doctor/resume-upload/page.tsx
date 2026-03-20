import ResumeUpload from '@/views/ResumeUpload';
import ProtectedRoute from '@/components/ProtectedRoute';
export const dynamic = 'force-dynamic';
export default function ResumeUploadPage() {
  return <ProtectedRoute><ResumeUpload /></ProtectedRoute>;
}
