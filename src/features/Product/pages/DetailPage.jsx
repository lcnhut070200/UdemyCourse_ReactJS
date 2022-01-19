import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { useRouteMatch } from 'react-router-dom';
import { CircularUnderLoad } from '../../../utils';
import AddToCartForm from '../components/AddToCartForm';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetails from '../hooks/useProductDetails';
const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },
  loading: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '400px',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const {
    params: { productId },
  } = useRouteMatch();

  const { product, loading } = useProductDetails(productId);

  const handleAddToCartSubmit = (formValues) => {
    console.log('form submit: ', formValues);
  };
  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          {loading ? (
            <div className={classes.loading}>
              <CircularUnderLoad />
            </div>
          ) : (
            <Grid container>
              <Grid item className={classes.left}>
                <ProductThumbnail product={product} />
              </Grid>
              <Grid item className={classes.right}>
                <ProductInfo product={product} />
                <AddToCartForm onSubmit={handleAddToCartSubmit} />
              </Grid>
            </Grid>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default DetailPage;
