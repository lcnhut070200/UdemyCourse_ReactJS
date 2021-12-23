import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrease, increase } from './counterSlice';
import styles from './styles.module.css';

const useStyles = makeStyles({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    border: 0,
    borderRadius: 3,
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    color: 'white',
    height: 32,
    padding: '0 30px',
  },
});

Counter.propTypes = {};

function Counter(props) {
  const count = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const classes = useStyles();

  const handleIncreaseClick = () => {
    const action = increase(); //action creator
    dispatch(action);
  };

  const handleDecreaseClick = () => {
    const action = decrease(); //action creator
    dispatch(action);
  };

  return (
    <div className={styles.counter}>
      <h2>Counter feature </h2>
      <h4>Counter: {count}</h4>
      <Button className={classes.root} onClick={handleIncreaseClick}>
        Increase
      </Button>
      <Button className={classes.root} onClick={handleDecreaseClick}>
        Decrease
      </Button>
    </div>
  );
}

export default Counter;
