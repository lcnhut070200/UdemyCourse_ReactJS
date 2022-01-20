import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import AddToCartForm from '../components/AddToCartForm';
import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetails from '../hooks/useProductDetails';
const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(4),
  },
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
    display: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

function DetailPage(props) {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();

  const { product, loading } = useProductDetails(productId);

  const handleAddToCartSubmit = (formValues) => {
    console.log('form submit: ', formValues);
  };

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
              <AddToCartForm onSubmit={handleAddToCartSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <ProductMenu />

        <Switch>
          <Route path={url} exact>
            <ProductDescription product={product} />
          </Route>
          <Route path={`${url}/additional`} exact component={ProductAdditional} />
          <Route path={`${url}/reviews`} exact component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
