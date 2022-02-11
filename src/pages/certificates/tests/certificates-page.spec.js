import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

import certificatesReducer from '../../../redux/certificates/certificates.reducer';
import CertificatesPage from '../certificates-page';

import {
  fakeCertificatesState,
  fakeUserState,
  fakeTableState,
  fakeEmptyCertificatesState
} from './certificates-page.variables';

const renderWithRedux = (
  component,
  { initialState, store = createStore(certificatesReducer, initialState) } = {}
) => ({
    ...render(<Provider store={store}>{component}</Provider>, {
      wrapper: MemoryRouter
    }),
    store
  });

describe('About certificates page', () => {
  it('should render the loading bar while getting data', () => {
    const { getByRole } = renderWithRedux(<CertificatesPage />, {
      initialState: {
        Certificates: {
          ...fakeCertificatesState,
          certificatesLoading: true
        },
        Users: {
          ...fakeUserState,
          usersLoading: true
        }
      }
    });
    expect(getByRole('progressbar')).toBeInTheDocument();
  });

  it('should render the appropriate message, if there is no items in certificates list', () => {
    const { getByText } = renderWithRedux(<CertificatesPage />, {
      initialState: {
        Certificates: {
          ...fakeEmptyCertificatesState
        },
        Users: {}
      }
    });
    expect(getByText(/Сертифікати відсутні/i)).toBeInTheDocument();
  });

  it('should render the table with data about certificates', async () => {
    const { getAllByRole } = renderWithRedux(<CertificatesPage />, {
      initialState: {
        Certificates: {
          list: {
            count: 2,
            items: [
              {
                _id: '61e04efaedc3271854cf4f32',
                name: '03FreeHorondi',
                value: 1500,
                createdBy: {
                  _id: '618a3d2353c0ee0025ca916d'
                },
                isActivated: true,
                isUsed: false,
                dateStart: '2022-01-13T16:10:29.323Z',
                dateEnd: '2023-01-14T16:10:29.323Z'
              }
            ]
          },
          certificatesLoading: false,
          ...fakeCertificatesState
        },
        Users: { ...fakeUserState },
        Table: { ...fakeTableState }
      }
    });
    expect(getAllByRole('row')).toHaveLength(4);
  });
});
