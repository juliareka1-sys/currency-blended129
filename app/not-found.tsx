import { redirect } from 'next/navigation';

export default function NotFoundPage() {
  // const router = useRouter()
  // router.push('/');
  redirect('/');
}
