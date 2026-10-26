import LoginForm from '@/components/admin/LoginForm';

type Props = { searchParams: Promise<{ next?: string }> };

export default async function LoginPage({ searchParams }: Props) {
  const { next } = await searchParams;
  return <LoginForm next={typeof next === 'string' ? next : undefined}/>;
}
