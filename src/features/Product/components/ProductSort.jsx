import React from 'react';
import PropTypes from 'prop-types';

ProductSort.propTypes = {
  activeIndex: PropTypes.number.isRequired,
  onChange: PropTypes.func,
};

function ProductSort(props) {
  return <div>Sort by:</div>;
}

export default ProductSort;
