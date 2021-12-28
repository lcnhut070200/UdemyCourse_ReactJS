import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
// import './App.css';
import Header from './components/Header/Header';
import NotFound from './components/NotFount/NotFound';
import AlbumFeature from './features/Album/index.';
import Counter from './features/Counter/Counter';
import ProductFeature from './features/Product/ProductFeature';
import TodoFeature from './features/Todo';

function App() {
  return (
    <div className="App">
      <Header />

      <Switch>
        <Redirect from="/home" to="/" exact />
        <Redirect from="/post-list/:postId" to="/post/:postId" />

        <Route path="/" component={Counter} exact />
        <Route path="/todos" component={TodoFeature} />
        <Route path="/albums" component={AlbumFeature} />
        <Route path="/products" component={ProductFeature} />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default App;
