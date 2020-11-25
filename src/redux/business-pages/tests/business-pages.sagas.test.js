import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga/effects';
import {
  handleBusinessPagesLoad,
  handleCurrentBusinessPageLoad,
  handleAddBusinessPage,
  handleBusinessPageUpdate,
  handleBusinessPageDelete
} from '../business-pages.sagas';
import {
  setBusinessPages,
  setLoading,
  setCurrentBusinessPage
} from '../business-pages.actions';
import { config } from '../../../configs';
import {
  setSnackBarSeverity,
  setSnackBarStatus,
  setSnackBarMessage
} from '../../snackbar/snackbar.actions';

import {
  businessPages,
  businessPageId,
  businessPage,
  fakeBusinessPage,
  businessPageToUpdate,
  businessPageToCreate
} from './business-pages.variables';

import {
  getAllBusinessPages,
  createBusinessPage,
  deleteBusinessPage,
  getBusinessPageById,
  updateBusinessPage
} from '../business-pages.operations';

import businessPagesReducer from '../business-pages.reducer';
import { selectBusinessPagesList } from '../../selectors/business-pages.selectors';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

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
    expectSaga(handleCurrentBusinessPageLoad, { payload: businessPageId })
      .withReducer(businessPagesReducer)
      .provide([[call(getBusinessPageById, businessPageId), fakeBusinessPage]])
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

  it('#3 Should delete business page and remove it from store', () =>
    expectSaga(handleBusinessPageDelete, { payload: businessPages[0]._id })
      .provide([
        [select(selectBusinessPagesList), businessPages],
        [call(deleteBusinessPage, businessPages[0]._id), businessPages[0]]
      ])
      .withReducer(businessPagesReducer)
      .put(setLoading(true))
      .put(setBusinessPages([businessPages[1]]))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_DELETE_STATUS))
      .put(setSnackBarStatus(true))
      .put(setLoading(false))
      .hasFinalState({
        list: [businessPages[1]],
        currentPage: null,
        loading: false,
        error: null
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(6);
      }));

  it('#4 Should to add business page', () =>
    expectSaga(handleAddBusinessPage, { payload: businessPageToCreate })
      .withReducer(businessPagesReducer)
      .provide([
        [
          call(createBusinessPage, businessPageToCreate),
          { _id: businessPage._id }
        ]
      ])
      .put(setLoading(true))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
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
        expect(analysisPut).toHaveLength(6);
      }));

  it('#5 Should to update business page', () =>
    expectSaga(handleBusinessPageUpdate, { payload: businessPageToUpdate })
      .withReducer(businessPagesReducer)
      .provide([
        [
          call(updateBusinessPage, businessPageToUpdate),
          {
            _id: businessPageToUpdate.id,
            title: { value: businessPageToUpdate.page.title.value }
          }
        ]
      ])
      .put(setLoading(true))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_UPDATE_STATUS))
      .put(setSnackBarStatus(true))
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
        expect(analysisPut).toHaveLength(6);
      }));
});
