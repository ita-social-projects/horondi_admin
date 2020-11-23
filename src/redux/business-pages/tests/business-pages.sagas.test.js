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
  businessPageToCreate,
  updatedBusinessPage,
  fakeBusinessPageRes
} from './business-pages.variables';
import {
  getAllBusinessPages,
  createBusinessPage,
  deleteBusinessPage,
  getBusinessPageById,
  updateBusinessPage
} from '../business-pages.operations';

const {
  SUCCESS_ADD_STATUS,
  SUCCESS_DELETE_STATUS,
  SUCCESS_UPDATE_STATUS
} = config.statuses;

describe('business pages sagas test', () => {
  it('#1 should not throw error', () => {
    expect(getAllBusinessPages).not.toThrow();
    expect(createBusinessPage).not.toThrow();
    expect(deleteBusinessPage).not.toThrow();
    expect(updateBusinessPage).not.toThrow();
    expect(getBusinessPageById).not.toThrow();
  });
  it('#2 should receive all business pages and set to store', () =>
    expectSaga(handleBusinessPagesLoad)
      .put(setLoading(true))
      .provide([[call(getAllBusinessPages), businessPages]])
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));
  it('#3 should receive one page and set to store', () =>
    expectSaga(handleCurrentBusinessPageLoad, { payload: businessPageId })
      .provide([[call(getBusinessPageById, businessPageId), fakeBusinessPage]])
      .put(setLoading(true))
      .put(setCurrentBusinessPage(fakeBusinessPage))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(3);
      }));

  it('#4 Should delete business page and remove it from store', () =>
    expectSaga(handleBusinessPageDelete, { payload: businessPages[0]._id })
      .provide([
        [call(deleteBusinessPage, businessPages[0]._id), businessPages[0]]
      ])
      .put(setLoading(true))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_DELETE_STATUS))
      .put(setSnackBarStatus(true))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(6);
      }));

  it('#5 Should to add business page and set it to store', () =>
    expectSaga(handleAddBusinessPage, { payload: businessPageToCreate })
      .provide([
        [
          call(createBusinessPage, businessPageToCreate),
          { data: { addBusinessText: { _id: businessPage._id } } }
        ]
      ])
      .put(setLoading(true))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_ADD_STATUS))
      .put(setSnackBarStatus(true))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(6);
      }));

  it('#6 Should to update business page', () =>
    expectSaga(handleBusinessPageUpdate, { payload: businessPageToUpdate })
      .provide([
        [
          call(updateBusinessPage, businessPageToUpdate),
          {
            data: {
              updateBusinessText: { _id: businessPageToUpdate.id },
              title: { value: businessPageToUpdate.page.title.value }
            }
          }
        ]
      ])
      .put(setLoading(true))
      .put(setSnackBarSeverity('success'))
      .put(setSnackBarMessage(SUCCESS_UPDATE_STATUS))
      .put(setSnackBarStatus(true))
      .put(setLoading(false))
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(6);
      }));
});
