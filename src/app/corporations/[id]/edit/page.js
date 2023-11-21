
import PropTypes from 'prop-types';
// _mock
import {data}  from 'src/_mock/_coorperation';
// sections
import {ProductEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Corperation: Corperation Edit',
};

export default function ProductEditView({ params }) {
  const { id } = params;

  return <ProductEditView id={id} />;
}

export async function generateStaticParams() {
  return data.items.map((item) => ({
    id: item.id,
  }));
}

ProductEditView.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
