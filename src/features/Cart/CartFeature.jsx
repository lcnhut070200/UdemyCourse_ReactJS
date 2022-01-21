import React from 'react';
import { useSelector } from 'react-redux';
import { cartTotalSelector } from '../../features/Cart/selectors';
CartFeature.propTypes = {};

function CartFeature(props) {
  const cartTotal = useSelector(cartTotalSelector);
  return <div>Cart total: {cartTotal}</div>;
}

export default CartFeature;
