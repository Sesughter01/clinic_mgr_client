// sections
// import { JwtRegisterView } from 'src/sections/auth/jwt';
import { ModernRegisterView } from 'src/sections/auth-demo/modern';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'EDMS: Register',
};

export default function RegisterPage() {
  return <ModernRegisterView />;
}
