import React from 'react';
import PropTypes from 'prop-types';
import { Paper } from '@material-ui/core';
import DOMPurify from 'dompurify';

ProductDescription.propTypes = {
  product: PropTypes.object,
};

function ProductDescription({ product = {} }) {
  // Prevent XSS
  const safeDescription = DOMPurify.sanitize(product.description);
  return (
    <Paper style={{ padding: '15px' }}>
      <div dangerouslySetInnerHTML={{ __html: safeDescription }}></div>
    </Paper>
  );
}

export default ProductDescription;
