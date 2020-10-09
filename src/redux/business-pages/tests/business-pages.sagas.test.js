import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import {
  handleBusinessPagesLoad,
  handleCurrentBusinessPageLoad,
  handleAddBusinessPage,
  handleBusinessPageUpdate,
  handleBusinessPageError,
  handleBusinessPageDelete
} from '../business-pages.sagas';
import {
  setBusinessPages,
  setLoading,
  setCurrentBusinessPage,
  addBusinessPage
} from '../business-pages.actions';

import {
  businessPages,
  businessPageId,
  businessPage,
  fakeBusinessPage,
  fakePages,
  businessPageToDeleteMock,
  businessPageToUpdate
} from './business-pages.variables';
import {
  getAllBusinessPages,
  createBusinessPage,
  deleteBusinessPage,
  getBusinessPageById,
  updateBusinessPage
} from '../business-pages.operations';

describe('pattern sagas test', () => {
  it('should not throw error', () => {
    expect(getAllBusinessPages).not.toThrow();
    expect(createBusinessPage).not.toThrow();
    expect(deleteBusinessPage).not.toThrow();
    expect(updateBusinessPage).not.toThrow();
    expect(getBusinessPageById).not.toThrow();
  });
  it('#1 should receive all business pages and set to store', () => {
    expectSaga(handleBusinessPagesLoad)
      .provide([[matchers.call.fn(getAllBusinessPages), fakePages]])
      .put(setLoading(true))
      .put(setBusinessPages(fakePages))
      .put(setLoading(false))
      .run();
  });
  it('#2 should receive one page and set to store', () => {
    expectSaga(handleCurrentBusinessPageLoad, businessPageId)
      .provide([[matchers.call.fn(getBusinessPageById()), fakeBusinessPage]])
      .put(setLoading(true))
      .put(setCurrentBusinessPage(fakeBusinessPage))
      .put(setLoading(false))
      .run();
  });

  it('#3 Should delete business page and remove it from store', () => {
    expectSaga(handleBusinessPageDelete, businessPageId)
      .provide([
        [matchers.call.fn(deleteBusinessPage()), businessPageToDeleteMock]
      ])
      .put(setLoading(true))
      .put(setBusinessPages(businessPageToDeleteMock))
      .put(setLoading(false))
      .run();
  });

  it('#4 Should to add business page and set it to store', () => {
    expectSaga(handleAddBusinessPage, businessPage)
      .provide([[matchers.call.fn(addBusinessPage()), businessPage]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run();
  });

  it('#5 Should to update business page', () => {
    expectSaga(handleBusinessPageUpdate, businessPageToUpdate)
      .provide([[matchers.call.fn(updateBusinessPage()), businessPageToUpdate]])
      .put(setLoading(true))
      .put(setBusinessPages(businessPages))
      .put(setLoading(false))
      .run();
  });
});
