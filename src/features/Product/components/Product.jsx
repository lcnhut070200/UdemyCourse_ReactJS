import { Box, makeStyles, Typography } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { STATIC_HOST, THUMBNAIL_PLACEHODER } from '../../../constants';
import { formatPrice } from '../../../utils';

const useStyles = makeStyles((them) => ({
  root: {},
  product: {
    cursor: 'pointer',
  },
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

  const history = useHistory();

  const handleClickProduct = () => {
    // Navigate to detail page: /products/:productId
    history.push(`/products/${product.id}`);
  };

  return (
    <Box padding={1} onClick={handleClickProduct} className={classes.product}>
      <Box padding={1} minHeight={215}>
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2" className={classes.name}>
        {product.name}
      </Typography>
      <Typography variant="body2" className={classes.price}>
        <Box component="span" className={classes.salePrice}>
          {formatPrice(product.salePrice)}
        </Box>
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
