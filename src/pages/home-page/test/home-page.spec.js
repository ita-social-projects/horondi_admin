import React, { useState } from 'react';
import { render } from '@testing-library/react';
import { useSelector, useDispatch } from 'react-redux';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

import HomePage from '../home-page';

jest.mock('../home-page.styles.js', () => ({
  useStyles: () => ({})
}));

jest.mock('../../common.styles.js', () => ({
  useStyles: () => ({})
}));

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn().mockImplementationOnce((selector) => selector()),
  useDispatch: jest.fn()
}));
