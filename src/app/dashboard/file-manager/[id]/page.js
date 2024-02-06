import PropTypes from 'prop-types';
// utils
import axios, { endpoints } from 'src/utils/axios';
// sections
import {FileListView } from 'src/sections/file-manager/view';

// ----------------------------------------------------------------------

export const metadata = {
  title: 'Dashboard: Jail files',
};

export default function FileDetailsPage({ params }) {
  const { id } = params;

  return <FileListView id={id} />
}

export async function generateStaticParams() {
  const res = await axios.get(endpoints.product.list);

  return res.data.products.map((product) => ({
    id: product.id,
  }));
}

FileDetailsPage.propTypes = {
  params: PropTypes.shape({
    id: PropTypes.string,
  }),
};
