const setOrder = (newOrder) => ({
  type: 'SET_ORDER',
  payload: newOrder
});

const setOrderStatus = (newOrderStatus) => ({
  type: 'SET_ORDER_STATUS',
  payload: newOrderStatus
});

const setOrders = (newOrders) => ({
  type: 'SET_ORDERS',
  payload: newOrders
});

const ordersLoadingStatus = () => ({
  type: 'SET_LOADING_STATUS'
});

export { setOrder, setOrders, setOrderStatus, ordersLoadingStatus };
