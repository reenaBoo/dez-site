import AdminShell from '@/components/admin/AdminShell';
import { requireAdmin } from '@/lib/auth/server';

export const dynamic = 'force-dynamic';

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  await requireAdmin();
  return <AdminShell>{children}</AdminShell>;
}
