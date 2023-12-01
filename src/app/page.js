// sections
import { HomeView } from 'src/sections/home/view';
import { redirect } from 'next/navigation'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Clinic Manager',
};

export default function HomePage() {
  redirect("auth/jwt/login", 'push')
 

  return <HomeView />;
}
