import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlox: 'row wrap',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    padding: 0,
    listStyleType: 'none',

    '& > li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Miễn phí vận chuyển',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true, // Always show
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = { ...filters };
      if (newFilters.isFreeShip) {
        delete newFilters.isFreeShip;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyến mãi',
    isActive: (filters) => true,
    isVisible: (filters) => filters.isPromotion,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.isPromotion;
      return newFilters;
    },
    onToggle: (filters) => {},
  },
  {
    id: 3,
    getLabel: (filters) => `Từ ${filters.salePrice_lte} đến ${filters.salePrice_gte}`,
    isActive: (filters) => true,
    isVisible: (filters) =>
      Object.keys(filters).includes('salePrice_lte') &&
      Object.keys(filters).includes('salePrice_gte'),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      delete newFilters.salePrice_lte;
      delete newFilters.salePrice_gte;
      return newFilters;
    },
    onToggle: (filters) => {},
  },
  // {
  //   id: 4,
  //   getLabel: (filters) => 'danh muc',
  //   isActive: (filters) => true,
  //   isVisible: (filters) => true,
  //   isRemovable: true,
  //   onRemove: (filters) => {},
  //   onToggle: (filters) => {},
  // },
];

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

function FilterViewer({ filters = {}, onChange = null }) {
  const classes = useStyles();

  const visibleFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);

  return (
    <Box component="ul" className={classes.root}>
      {visibleFilters.map((x) => (
        <li key={x.id}>
          <Chip
            size="small"
            label={x.getLabel(filters)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    console.log(123);
                    if (!onChange) return;
                    const newFilters = x.onToggle(filters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (!onChange) return;
                    const newFilters = x.onRemove(filters);
                    onChange(newFilters);
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
}

export default FilterViewer;
