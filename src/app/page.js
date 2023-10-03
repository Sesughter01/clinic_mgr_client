// sections
import { HomeView } from 'src/sections/home/view';
import { redirect } from 'next/navigation'

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Clinic Manager',
};

export default function HomePage() {
  redirect("auth-demo/classic/login", 'push')
 

  return <HomeView />;
}
