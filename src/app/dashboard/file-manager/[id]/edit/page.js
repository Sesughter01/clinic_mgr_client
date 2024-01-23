import PropTypes from 'prop-types';
// utils
import axios, { endpoints } from 'src/utils/axios';
// sections
import { FileEditView } from 'src/sections/product/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Product Edit',
};

export default function ProductEditPage({ params }) {
  const { id } = params;

  return <FileEditView id={id} />;
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product) => ({
    id: product.id,
  }));
}

ProductEditPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
