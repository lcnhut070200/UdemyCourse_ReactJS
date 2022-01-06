import { Box, Container, Grid, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import React, { useEffect, useState } from 'react';
import queryString from 'query-string';
import productApi from '../../../api/productApi';
import ProductFilters from '../components/ProductFilters';
import ProductList from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductSort from '../components/ProductSort';
import FilterViewer from '../components/Filters/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'no-wrap',
    marginTop: '16px',
    paddingBottom: '16px',
  },
  sortTabs: {
    borderBottom: '1px solid #ccc',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // true -> "true"
    // {isPromotion: "true"}
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 12,
      _sort: params._sort || 'updated_at:DESC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 12,
    total: 10,
    page: 1,
  });

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination } = await productApi.getAll(queryParams);
        setProductList(data);
        console.log({ data, pagination });
        setPagination(pagination);
      } catch (error) {
        console.log('failed to load product list ', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    const filters = { ...queryParams, _page: page };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = { ...queryParams, _sort: newSortValue };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    const filters = { ...queryParams, ...newFilters };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFilterView = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <Box className={classes.sortTabs}>
                <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
                <FilterViewer filters={queryParams} onChange={handleFilterView} />
              </Box>
              {loading ? <ProductSkeletonList length={12} /> : <ProductList data={productList} />}
              <Box className={classes.pagination}>
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
