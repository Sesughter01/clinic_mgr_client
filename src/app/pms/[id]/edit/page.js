import PropTypes from 'prop-types';
// _mock
import { _userList } from 'src/_mock/_user';


// sections
import { OrderEditView } from 'src/sections/order/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Pms: Pms Edit',
};

export default function OrderEditPage({ params }) {
  const { id } = params;

  return <OrderEditView id={id} />;
}

export async function generateStaticParams() {
  return _userList.map((user) => ({
  
    id: user.id,
  }));
}



OrderEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
