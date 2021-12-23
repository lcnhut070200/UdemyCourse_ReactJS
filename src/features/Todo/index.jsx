import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import NotFound from '../../components/NotFount/NotFound';
import DetailPage from './pages/DetailPage/DetailPage';
import ListPage from './pages/ListPage/ListPage';

TodoFeature.propTypes = {};

function TodoFeature(props) {
  const match = useRouteMatch();
  return (
    <div>
      <Switch>
        <Route path={match.path} component={ListPage} exact />
        <Route path={`${match.path}/:todoId`} component={DetailPage} exact />

        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

export default TodoFeature;
