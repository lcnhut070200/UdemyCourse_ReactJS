import React, { useEffect } from 'react';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import productApi from './api/productApi';
// import './App.css';
import Header from './components/Header/Header';
import NotFound from './components/NotFount/NotFound';
import AlbumFeature from './features/Album/index.';
import Counter from './features/Counter/Counter';
import TodoFeature from './features/Todo';

function App() {
  useEffect(() => {
    const fetchProducts = async () => {
      const params = {
        _limit: 10,
      };
      const productList = await productApi.getAll(params);
      console.log(productList);
    };
    fetchProducts();
  }, []);

  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/post/:postId" />

        <Route path="/" component={Counter} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />

        <Route component={NotFound} />
      </Switch>
      <h4>Footer</h4>
    </div>
  );
}

export default App;
