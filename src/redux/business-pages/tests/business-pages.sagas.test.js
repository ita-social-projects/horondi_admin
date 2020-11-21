import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { call, put } from 'redux-saga/effects';
import {
  SET_BUSINESS_PAGES_LOADING,
  SET_BUSINESS_PAGES,
  ADD_BUSINESS_PAGE,
  DELETE_BUSINESS_PAGE,
  SET_CURRENT_BUSINESS_PAGE,
  UPDATE_BUSINESS_PAGE,
  SET_BUSINESS_PAGES_ERROR
} from '../business-pages.types';
import {
  SET_SNACKBAR_MESSAGE,
  SET_SNACKBAR_SEVERITY,
  SET_SNACKBAR_STATUS
} from '../../snackbar/snackbar.types';
import {
  handleBusinessPagesLoad,
  handleCurrentBusinessPageLoad,
  handleAddBusinessPage,
  handleBusinessPageUpdate,
  handleBusinessPageDelete,
  handleBusinessPageError
} from '../business-pages.sagas';
import {
  setBusinessPages,
  setLoading,
  setCurrentBusinessPage,
  addBusinessPage,
  setBusinessPagesError
} from '../business-pages.actions';
import {
  setSnackBarMessage,
  setSnackBarSeverity,
  setSnackBarStatus
} from '../../snackbar/snackbar.actions';
import {
  businessPages,
  businessPageId,
  businessPage,
  fakeBusinessPage,
  fakePages,
  businessPageToDeleteMock,
  businessPageToUpdate,
  fakeError
} from './business-pages.variables';
import {
  getAllBusinessPages,
  createBusinessPage,
  deleteBusinessPage,
  getBusinessPageById,
  updateBusinessPage
} from '../business-pages.operations';

describe('business pages sagas test', () => {
  it('#1 should not throw error', () => {
    expect(getAllBusinessPages).not.toThrow();
    expect(createBusinessPage).not.toThrow();
    expect(deleteBusinessPage).not.toThrow();
    expect(updateBusinessPage).not.toThrow();
    expect(getBusinessPageById).not.toThrow();
  });
  it('#2 should receive all business pages and set to store', () => {
    expectSaga(handleBusinessPagesLoad)
      .provide([[call(getAllBusinessPages), fakePages]])
      .put(setLoading(true))
      .put(setBusinessPages(fakePages))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(4);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ payload: true, type: SET_BUSINESS_PAGES_LOADING })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_BUSINESS_PAGES, payload: fakePages })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: false })
        );
      });
  });
  it('#3 should receive one page and set to store', () => {
    expectSaga(handleCurrentBusinessPageLoad, businessPageId)
      .provide([[call(getBusinessPageById), fakeBusinessPage]])
      .put(setLoading(true))
      .put(setCurrentBusinessPage(fakeBusinessPage))
      .put(setLoading(false))
      .run()
      .then((res) => {
        const { allEffects: analysis } = res;
        expect(analysis).toHaveLength(4);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_CURRENT_BUSINESS_PAGE, payload: fakeBusinessPage })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: false })
        );
      });
  });

  it('#4 Should delete business page and remove it from store', () => {
    expectSaga(handleBusinessPageDelete, businessPageId)
      .provide([
        [matchers.call.fn(deleteBusinessPage()), businessPageToDeleteMock]
      ])
      .put(setLoading(true))
      .put(deleteBusinessPage(businessPageToDeleteMock))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(4);
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: DELETE_BUSINESS_PAGE, payload: businessPageToDeleteMock })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: false })
        );
      });
  });

  it('#5 Should to update business page', () => {
    expectSaga(handleBusinessPageUpdate, businessPageToUpdate)
      .provide([[call(updateBusinessPage), businessPageToUpdate]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(4);
        const analysisPut = analysis.filter((item) => item.type === 'PUT');
        const analysisCall = analysis.filter((item) => item.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: UPDATE_BUSINESS_PAGE, payload: businessPageToUpdate })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: false })
        );
      });
  });
  it('#6 Should to add business page and set it to store', () => {
    expectSaga(handleAddBusinessPage, businessPage)
      .provide([[call(addBusinessPage), businessPage]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        expect(analysis).toHaveLength(4);
        const analysisPut = analysis.filter((el) => el.type === 'PUT');
        const analysisCall = analysis.filter((el) => el.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: true })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: ADD_BUSINESS_PAGE, payload: businessPage })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: false })
        );
      });
  });
  it('#7 should handle orders error', () => {
    expectSaga(handleBusinessPageError, fakeError)
      .put(setLoading(false))
      .put(setBusinessPagesError({ e: fakeError }))
      .put(setSnackBarSeverity('error'))
      .put(setSnackBarMessage(fakeError.message))
      .put(setSnackBarStatus(true))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
        expect(analysisPut[0]).toEqual(
          put({ type: SET_BUSINESS_PAGES_LOADING, payload: false })
        );
        expect(analysisPut[1]).toEqual(
          put({ type: SET_BUSINESS_PAGES_ERROR, payload: { e: fakeError } })
        );
        expect(analysisPut[2]).toEqual(
          put({ type: SET_SNACKBAR_SEVERITY, payload: 'error' })
        );
        expect(analysisPut[3]).toEqual(
          put({ type: SET_SNACKBAR_MESSAGE, payload: fakeError.message })
        );
        expect(analysisPut[4]).toEqual(
          put({ type: SET_SNACKBAR_STATUS, payload: true })
        );
      });
  });
});
