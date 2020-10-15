import { takeEvery, call, put } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import {
  setOrder,
  setOrderError,
  setOrdersCurrentPage,
  getOrder
} from './orders.actions';