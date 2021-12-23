import React, { useEffect, useState, useMemo } from 'react';
import { useHistory, useLocation, useRouteMatch } from 'react-router-dom';
import TodoList from '../../components/TodoList';
import queryString from 'query-string';
import TodoForm from '../../components/TodoForm/TodoForm';

ListPage.propTypes = {};

function ListPage(props) {
  const initTodoList = [
    {
      id: 1,
      title: 'eat',
      status: 'new',
    },
    {
      id: 2,
      title: 'code',
      status: 'completed',
    },
    {
      id: 3,
      title: 'sleep',
      status: 'new',
    },
  ];

  const location = useLocation();
  const history = useHistory();
  const match = useRouteMatch();

  const [todoList, setTodoList] = useState(initTodoList);
  const [filteredStatus, setFilteredStatus] = useState(() => {
    const params = queryString.parse(location.search);
    return params.status || 'all';
  });

  const handleTodoClick = (todo, index) => {
    console.log(todo, index);

    // clone current array to the new one
    const newTodoList = [...todoList];

    // toggle state
    newTodoList[index] = {
      ...newTodoList[index],
      status: newTodoList[index].status === 'new' ? 'completed' : 'new',
    };
    // update todo list
    setTodoList(newTodoList);
  };

  const handleShowAll = () => {
    const queryParams = { status: 'all' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowCompleted = () => {
    const queryParams = { status: 'completed' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  const handleShowNew = () => {
    const queryParams = { status: 'new' };
    history.push({
      pathname: match.path,
      search: queryString.stringify(queryParams),
    });
  };

  useEffect(() => {
    const params = queryString.parse(location.search);
    setFilteredStatus(params.status || 'all');
  }, [location.search]);

  const renderTodoList = useMemo(() => {
    return todoList.filter((todo) => filteredStatus === 'all' || filteredStatus === todo.status);
  }, [todoList, filteredStatus]);

  const handleTodoFormSubmit = (values) => {
    console.log('form submit: ', values);
    const newTodo = {
      id: todoList.length + 1,
      title: values.title,
      status: 'new',
    };

    // clone a new state before setState
    const newTodoList = [...todoList, newTodo];
    setTodoList(newTodoList);
  };

  return (
    <div>
      <h3>Todo Form</h3>
      <TodoForm onSubmit={handleTodoFormSubmit} />
      <h3>Todo List</h3>
      <TodoList todoList={renderTodoList} onTodoClick={handleTodoClick} />
      <div>
        <button onClick={handleShowAll}>Show All</button>
        <button onClick={handleShowCompleted}>Show Completed</button>
        <button onClick={handleShowNew}>Show New</button>
      </div>
    </div>
  );
}

export default ListPage;
