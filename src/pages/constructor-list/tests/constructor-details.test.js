import React from 'react';
import * as reactRedux from 'react-redux';
import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow, mount, render } from 'enzyme';
import { shape } from 'prop-types';
import {
  BrowserRouter,
  Route,
  Switch,
  useHistory,
  useLocation
} from 'react-router-dom';
import { ConnectedRouter, routerMiddleware } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { applyMiddleware, createStore } from 'redux';
import { rootReducer } from '../../../redux/root.reducer';

import mockStore from './mockStore';
import ConstructorModelDetails from '../constructor-details';

configure({ adapter: new Adapter() });

createBrowserHistory(['/constructor-model/60eadfb9e913fc288294bd9']);

const router = (route) => ({
  history: new BrowserRouter().history,
  route
});

const createContext = (route) => ({
  context: { ...router(route) },
  childContextTypes: { router: shape({}) }
});

function mountWrap(node, route) {
  return mount(node, createContext(route));
}

describe('constructor-details tests', () => {
  let wrapper;
  let spyOnUseSelector;
  let spyOnUseDispatch;
  let mockDispatch;

  const route = {
    location: {},
    match: ['/constructor-model/60eadfb9e913fc288294bd9']
  };

  const wrappedMount = () => mountWrap(<ConstructorModelDetails />, route);

  beforeEach(() => {
    spyOnUseSelector = jest.spyOn(reactRedux, 'useSelector');
    spyOnUseSelector.mockImplementation(() => mockStore);

    spyOnUseDispatch = jest.spyOn(reactRedux, 'useDispatch');

    mockDispatch = jest.fn();
    spyOnUseDispatch.mockReturnValue(mockDispatch);

    // wrapper = mount(
    //   <BrowserRouter>
    //     <ConstructorModelDetails match={{
    //         params: { id: '60eadfb9e913fc288294bd9' },
    //         isExact: true,
    //         path: '/constructor-model/:id',
    //         url: '/constructor-model/60eadfb9e913fc288294bd9'
    //       }} />
    //   </BrowserRouter>
    //   );

    // const sagaMiddleware = createSagaMiddleware();
    // store = createStore(
    //   rootReducer(history),
    //   composeWithDevTools(
    //     applyMiddleware(sagaMiddleware, routerMiddleware(history))
    //   )
    // );
  });

  afterEach(() => {
    jest.restoreAllMocks();
    spyOnUseSelector.mockClear();
  });

  test.skip('Should render constructor-details', () => {
    const route = {
      location: {},
      match: ['/constructor-model/60eadfb9e913fc288294bd9']
    };
    wrapper = wrappedMount();

    // wrapper = mount(
    //   <ConnectedRouter store={store} history={history}>
    //     <Switch>
    //       <Route
    //         path='/constructor-model/:id'
    //         exact
    //         component={ConstructorModelDetails}
    //       />
    //     </Switch>
    //   </ConnectedRouter>
    // );

    expect(wrapper).toBeDefined();
  });
});
