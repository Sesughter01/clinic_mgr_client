import PropTypes from 'prop-types';
// _mock
import { _userList } from 'src/_mock/_user';


// sections
import { ClinicEditView } from 'src/sections/clinic/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Clinic manager: Clinic Edit',
};

export default function ClinicEditPage({ params }) {
  const { id } = params;

  return <ClinicEditView id={id} />;
}

export async function generateStaticParams() {
  return _userList.map((user) => ({
  
    id: user.id,
  }));
}



ClinicEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
