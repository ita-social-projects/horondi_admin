import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { BrowserRouter } from 'react-router-dom';
import { MockedProvider } from '@apollo/client/testing';
import PromoCodePage from '../promo-code-page';
import { theme } from '../../../components/app/app-theme/app.theme';
import TableContainerRow from '../../../containers/table-container-row';
import TableContainerGenerator from '../../../containers/table-container-generator';
import LoadingBar from '../../../components/loading-bar';
import { getAllPromoCodes } from '../operations/promo-code.queries';
import { deletePromoCodeByID } from '../operations/promo-code.mutation';

jest.mock('react-redux');
jest.mock('../promo-code-page.styles', () => ({
  useStyles: () => ({})
}));
jest.mock('connected-react-router', () => ({
  push: jest.fn()
}));
const rowsPerPage = 10;
const currentPage = 1;

const mockStore = {
  rowsPerPage: 10,
  currentPage: 1
};

useSelector.mockImplementation(() => mockStore);
const mocks = [
  {
    request: {
      query: getAllPromoCodes,
      variables: {
        limit: rowsPerPage,
        skip: rowsPerPage * currentPage
      }
    },
    result: {
      data: {
        getAllPromoCodes: {
          count: '1',
          items: [
            {
              categories: ['backpacks', 'bags', 'accessories', 'constructor'],
              code: 'www',
              dateFrom: '2022-04-08T14:22:43.437Z',
              dateTo: '2022-04-30T14:22:43.452Z',
              discount: 10,
              _id: '62470ac47cc7af17305abd47'
            }
          ]
        }
      },
      loading: false
    }
  },
  {
    request: {
      query: deletePromoCodeByID,
      variables: {
        id: 'promoID'
      },
      context: {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjJmNDhjZWEwZDEyYTAwMjRkNzgyN2EiLCJpYXQiOjE2NDk0MjkyNzAsImV4cCI6MTY0OTQzMjg3MH0.WcDQSLKvEpOCIKe_4D6DrCgNhUd0c4Hgyyo75hfEhnI'
        }
      }
    },
    result: {
      data: {
        deletePromoCode: { _id: '6239a310ed27613a04a17bb8' }
      }
    }
  }
];
const mocks2 = [
  {
    request: {
      query: getAllPromoCodes,
      variables: {
        limit: rowsPerPage,
        skip: rowsPerPage * currentPage
      }
    },
    result: {
      data: {
        getAllPromoCodes: {
          count: '0',
          items: []
        }
      },
      loading: false
    }
  },
  {
    request: {
      query: deletePromoCodeByID,
      variables: {
        id: 'promoID'
      },
      context: {
        headers: {
          token:
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MjJmNDhjZWEwZDEyYTAwMjRkNzgyN2EiLCJpYXQiOjE2NDk0MjkyNzAsImV4cCI6MTY0OTQzMjg3MH0.WcDQSLKvEpOCIKe_4D6DrCgNhUd0c4Hgyyo75hfEhnI'
        }
      }
    },
    result: {
      data: {
        deletePromoCode: { _id: '6239a310ed27613a04a17bb8' }
      }
    }
  }
];

const themeValue = theme('light');
const dispatch = jest.fn();

useDispatch.mockImplementation(() => dispatch);
let wrapper;

describe('PromoCodePage component tests', () => {
  beforeEach(() => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
  });
  afterEach(() => {
    jest.restoreAllMocks();
    wrapper = null;
  });

  it('Should render PromoCodePage', () => {
    expect(wrapper).toBeDefined();
  });
  it('Component TableContainerRow should exist', async () => {
    setTimeout(() => {
      expect(wrapper.exists(TableContainerRow)).toBe(true);
    }, 1000);
  });
  it('Component TableContainerGenerator should exist', () => {
    setTimeout(() => {
      expect(wrapper.exists(TableContainerGenerator)).toBe(true);
    }, 1000);
  });
});

describe('PromoCodePage component test with loading', () => {
  it('test Loader in PromoCodePage component', () => {
    wrapper = mount(
      <MockedProvider mocks={mocks} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );

    expect(wrapper.exists(LoadingBar)).toBe(true);
  });
  it('test PromoCodePage component without items', () => {
    wrapper = mount(
      <MockedProvider mocks={mocks2} addTypename={false}>
        <BrowserRouter>
          <ThemeProvider theme={themeValue}>
            <PromoCodePage />
          </ThemeProvider>
        </BrowserRouter>
      </MockedProvider>
    );
    expect(wrapper).toBeTruthy();
  });
});
