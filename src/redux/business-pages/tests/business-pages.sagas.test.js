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

import {
  businessPages,
  businessPageId,
  businessPage,
  fakeBusinessPage,
  businessPageToUpdate
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
  it('#2 should receive all business pages and set to store', () =>
    expectSaga(handleBusinessPagesLoad)
      .provide([[call(getAllBusinessPages), businessPages]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run());
  it('#3 should receive one page and set to store', () =>
    expectSaga(handleCurrentBusinessPageLoad, { payload: businessPageId })
      .provide([
        [
          call(getBusinessPageById, businessPageId),
          fakeBusinessPage.data.getBusinessPageById
        ]
      ])
      .put(setLoading(true))
      .put(setCurrentBusinessPage(fakeBusinessPage.data.getBusinessPageById))
      .put(setLoading(false))
      .run());

  it('#4 Should delete business page and remove it from store', () =>
    expectSaga(handleBusinessPageDelete, { payload: businessPages[0]._id })
      .provide([[call(deleteBusinessPage, businessPageId), businessPages[0]]])
      .put(setLoading(true))
      .put(setBusinessPages([businessPages[1]]))
      .put(setLoading(false))
      .run());

  it('#5 Should to add business page and set it to store', () =>
    expectSaga(handleAddBusinessPage, { payload: businessPage })
      .provide([[call(createBusinessPage, businessPage)]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run());

  it('#6 Should to update business page', () =>
    expectSaga(handleBusinessPageUpdate, { payload: businessPageToUpdate })
      .provide([
        [call(updateBusinessPage, businessPageToUpdate), businessPageToUpdate]
      ])
      .put(setLoading(true))
      .put(setBusinessPages(businessPageToUpdate))
      .put(setLoading(false))
      .run());
});
