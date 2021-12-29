import { Box } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handleCategoryChange = (newCategoryId) => {
    if (!onChange) return;
    const newFilters = {
      // dont need this filters value anymore because the ListPage component will set the preFilters in handleFilterChange
      // ...filters,
      'category.id': newCategoryId,
    };
    // console.log(newCategoryId);
    // console.log(newFilters);
    onChange(newFilters);
  };

  const handlePriceChange = (newPrice) => {
    console.log(newPrice);
    if (onChange) {
      onChange(newPrice);
    }
  };

  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handlePriceChange} />
    </Box>
  );
}

export default ProductFilters;
