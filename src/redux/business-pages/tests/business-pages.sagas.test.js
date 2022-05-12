import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import {
  handleBusinessPagesLoad,
  handleCurrentBusinessPageLoad,
  handleAddBusinessPage,
  handleBusinessPageUpdate,
  handleBusinessPageError
} from '../business-pages.sagas';
import {
  setBusinessPages,
  setLoading,
  setCurrentBusinessPage,
  setBusinessPagesError
} from '../business-pages.actions';
import { config } from '../../../configs';

import {
  businessPages,
  businessPageCode,
  businessPage,
  fakeBusinessPage,
  businessPageToUpdate,
  businessPageToCreate,
  error
} from './business-pages.variables';

import {
  getAllBusinessPages,
  createBusinessPage,
  getBusinessPageByCode,
  updateBusinessPage
} from '../business-pages.operations';

import {
  handleErrorSnackbar,
  handleSuccessSnackbar
} from '../../snackbar/snackbar.sagas';
import businessPagesReducer from '../business-pages.reducer';

const { SUCCESS_ADD_STATUS, SUCCESS_UPDATE_STATUS } = config.statuses;

describe('business pages sagas test', () => {
  it('#1 should receive all business pages and set to store', () =>
    expectSaga(handleBusinessPagesLoad)
      .withReducer(businessPagesReducer)
      .provide([[call(getAllBusinessPages), businessPages]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .hasFinalState({
        list: [...businessPages],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));
  it('#2 should receive one page and set to store', () =>
    expectSaga(handleCurrentBusinessPageLoad, { payload: businessPageCode })
      .withReducer(businessPagesReducer)
      .provide([
        [call(getBusinessPageByCode, businessPageCode), fakeBusinessPage]
      ])
      .put(setLoading(true))
      .put(setCurrentBusinessPage(fakeBusinessPage))
      .put(setLoading(false))
      .hasFinalState({
        list: [],
        currentPage: fakeBusinessPage,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('#3 Should to add business page', () =>
    expectSaga(handleAddBusinessPage, { payload: businessPageToCreate })
      .withReducer(businessPagesReducer)
      .provide([
        [
          call(createBusinessPage, businessPageToCreate),
          { _id: businessPage._id }
        ],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(setLoading(true))
      .put(setLoading(false))
      .hasFinalState({
        list: [],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('#4 Should to update business page', () =>
    expectSaga(handleBusinessPageUpdate, { payload: businessPageToUpdate })
      .withReducer(businessPagesReducer)
      .provide([
        [
          call(updateBusinessPage, businessPageToUpdate),
          {
            _id: businessPageToUpdate.id,
            title: { value: businessPageToUpdate.page.title.value }
          }
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(setLoading(true))
      .put(setLoading(false))
      .hasFinalState({
        list: [],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));
  it('should handle orders error', () => {
    expectSaga(handleBusinessPageError, error)
      .withReducer(businessPagesReducer)
      .provide([[call(handleErrorSnackbar, error.message)]])
      .put(setLoading(false))
      .put(setBusinessPagesError({ e: error }))
      .hasFinalState({
        list: [],
        currentPage: null,
        loading: false,
        error: { e: error }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(2);
      });
  });
});
