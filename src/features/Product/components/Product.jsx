import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { STATIC_HOST, THUMBNAIL_PLACEHODER } from '../../../constants';

const useStyles = makeStyles((them) => ({
  root: {},
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingLeft: '8px',
  },
  price: {
    paddingLeft: '8px',
  },

  salePrice: {
    fontSize: '16',
    fontWeight: 'bold',
    marginRight: '8px',
  },
}));

Product.propTypes = {
  product: PropTypes.object,
};

function Product({ product }) {
  const classes = useStyles();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHODER;

  return (
    <Box padding={1}>
      <Box padding={1} minHeight={215}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2" className={classes.name}>
        {product.name}
      </Typography>
      <Typography variant="body2" className={classes.price}>
        <Box component="span" className={classes.salePrice}>
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
            product.salePrice
          )}
        </Box>
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
