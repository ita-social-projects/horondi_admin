import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';
import Constructor from '../constructor.reducer';

import {
  handleConstructorLoad,
  handleConstructorsLoad,
  handleConstructorPartsLoad,
  handleConstructorAdd,
  handleConstructorUpdate,
  handleConstructorDelete
} from '../constructor.sagas';

import {
  mockConstructorsState,
  mockConstructors,
  mockId,
  mockConstructor,
  mockConstructorsLoadPayload,
  statuses,
  mockInputConstructor
} from './constructor.variables';

import {
  setConstructorLoading,
  setConstructor,
  removeConstructorFromStore,
  setConstructors
} from '../constructor.actions';

import {
  getConstructorById,
  getAllConstructors,
  getAllConstructorParts,
  deleteConstructor,
  updateConstructorById,
  createConstructor
} from '../constructor.operations';

import { updatePagination, setItemsCount } from '../../table/table.actions';

import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

describe('Test Constructor sagas', () => {
  const countAnalysis = (result) => {
    const { allEffects: analysis } = result;
    return analysis.filter((e) => e.type === 'PUT');
  };

  it('should get Constructor by id', async (done) => {
    expectSaga(handleConstructorLoad, { payload: mockId })
      .withReducer(combineReducers({ Constructor }), {
        Constructor: mockConstructorsState
      })
      .put(setConstructorLoading(true))
      .provide([[call(getConstructorById, mockId), mockConstructor]])
      .put(setConstructor(mockConstructor))
      .put(setConstructorLoading(false))
      .hasFinalState({
        Constructor: {
          ...mockConstructorsState,
          constructor: mockConstructor
        }
      })
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(3);
      });
    done();
  });

  it('should throw error when trying to get construtor by wrong id', async (done) => {
    expectSaga(handleConstructorLoad, { payload: mockId })
      .provide([[call(getConstructorById), mockConstructor]])
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(6);
      });
    done();
  });

  it('should get all Constructors', async (done) => {
    expectSaga(handleConstructorsLoad, {
      payload: { ...mockConstructorsLoadPayload }
    })
      .withReducer(combineReducers({ Constructor }), {
        Constructor: mockConstructorsState
      })
      .put(setConstructorLoading(true))
      .provide([
        [
          call(getAllConstructors, { ...mockConstructorsLoadPayload }),
          mockConstructors
        ]
      ])
      .put(setItemsCount(mockConstructors.count))
      .put(setConstructors(mockConstructors.items))
      .hasFinalState({
        Constructor: {
          ...mockConstructorsState,
          list: mockConstructors.items
        }
      })
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(4);
      });
    done();
  });

  it('should get all Constructor parts', async (done) => {
    expectSaga(handleConstructorPartsLoad)
      .withReducer(combineReducers({ Constructor }), {
        Constructor: mockConstructorsState
      })
      .put(setConstructorLoading(true))
      .provide([[call(getAllConstructorParts), mockConstructors]])
      .put(setItemsCount(mockConstructors.count))
      .put(setConstructors(mockConstructors.items))
      .hasFinalState({
        Constructor: {
          ...mockConstructorsState,
          list: mockConstructors.items
        }
      })
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(4);
      });

    done();
  });

  it('should throw error when trying to get all Constructors without payload', async (done) => {
    expectSaga(handleConstructorsLoad, {
      payload: { ...mockConstructorsLoadPayload }
    })
      .provide([[call(getAllConstructors), mockConstructors]])
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(6);
      });
    done();
  });

  it('should update Constructor by input data', async (done) => {
    expectSaga(handleConstructorUpdate, { payload: mockInputConstructor })
      .withReducer(combineReducers({ Constructor }), {
        Constructor: mockConstructorsState
      })
      .put(setConstructorLoading(true))
      .provide([
        [call(updateConstructorById, mockInputConstructor)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/constructor-list'))
      .hasFinalState({
        Constructor: {
          ...mockConstructorsState
        }
      })
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(3);
      });
    done();
  });

  it('should throw error when trying to update Constructor by wrong id', async (done) => {
    expectSaga(handleConstructorUpdate, { payload: mockInputConstructor })
      .provide([[call(updateConstructorById)]])
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(6);
      });
    done();
  });

  it('should delete Constructor by id', async (done) => {
    expectSaga(handleConstructorDelete, { payload: mockId })
      .withReducer(combineReducers({ Constructor }), {
        Constructor: { ...mockConstructorsState, list: mockConstructors.items }
      })
      .put(setConstructorLoading(true))
      .provide([
        [call(deleteConstructor, mockId)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_DELETE_STATUS)]
      ])
      .put(removeConstructorFromStore(mockId))
      .put(updatePagination())
      .put(setConstructorLoading(false))
      .hasFinalState({
        Constructor: {
          ...mockConstructorsState
        }
      })
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(4);
      });
    done();
  });

  it('should throw error when deleting Constructor by wrong id', async (done) => {
    expectSaga(handleConstructorDelete, { payload: mockId })
      .provide([[call(deleteConstructor)]])
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(6);
      });
    done();
  });

  it('should add Constructor', async (done) => {
    expectSaga(handleConstructorAdd, { payload: mockInputConstructor })
      .withReducer(combineReducers({ Constructor }), {
        Constructor: mockConstructorsState
      })
      .put(setConstructorLoading(true))
      .provide([
        [call(createConstructor, mockInputConstructor)],
        [call(handleSuccessSnackbar, statuses.SUCCESS_ADD_STATUS)]
      ])
      .put(push('/constructor-list'))
      .put(setConstructorLoading(false))
      .hasFinalState({
        Constructor: {
          ...mockConstructorsState
        }
      })
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(3);
      });
    done();
  });

  it('should add Constructor', async (done) => {
    expectSaga(handleConstructorAdd, { payload: mockInputConstructor })
      .provide([[call(createConstructor)]])
      .run()
      .then((result) => {
        expect(countAnalysis(result)).toHaveLength(6);
      });
    done();
  });
});
