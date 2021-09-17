import { expectSaga } from 'redux-saga-test-plan';
import { call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { combineReducers } from 'redux';

import {
  handleMaterialLoad,
  handleMaterialsLoad,
  handleMaterialUpdate,
  handleMaterialDelete,
  handleAddMaterial,
  handleMaterialError
} from '../material.sagas';

import {
  setMaterials,
  setMaterial,
  setMaterialError,
  setMaterialLoading,
  removeMaterialFromStore
} from '../material.actions';

import {
  mockId,
  mockMaterial,
  mockMaterials,
  mockMaterialState,
  mockMaterialsLoadPayload,
  statuses,
  mockPayloadToUpdateMaterial,
  mockError,
  mockTableState
} from './material.variables';

import {
  getAllMaterials,
  getMaterialById,
  createMaterial,
  updateMaterial,
  deleteMaterial
} from '../material.operations';
import { setItemsCount, updatePagination } from '../../table/table.actions';

import Material from '../material.reducer';
import Table from '../../table/table.reducer';

import { handleSuccessSnackbar } from '../../snackbar/snackbar.sagas';

const { SUCCESS_ADD_STATUS, SUCCESS_DELETE_STATUS, SUCCESS_UPDATE_STATUS } =
  statuses;

describe('Test material sagas', () => {
  it('should load all materials', async (done) => {
    expectSaga(handleMaterialsLoad, { payload: mockMaterialsLoadPayload })
      .withReducer(combineReducers({ Material, Table }), {
        Material: mockMaterialState,
        Table: mockTableState
      })
      .put(setMaterialLoading(true))
      .provide([
        [
          await call(
            getAllMaterials,
            mockMaterialsLoadPayload.filter,
            mockMaterialsLoadPayload.skip,
            mockMaterialsLoadPayload.limit
          ),
          mockMaterials
        ]
      ])
      .put(setItemsCount(mockMaterials.count))
      .put(setMaterials(mockMaterials.items))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          list: mockMaterials.items
        },
        Table: {
          ...mockTableState,
          itemsCount: mockMaterials.count
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(1);
      });
    done();
  });

  it('should load material by id', async (done) => {
    expectSaga(handleMaterialLoad, { payload: mockId })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([[call(getMaterialById, mockId), mockMaterial]])
      .put(setMaterial(mockMaterial))
      .put(setMaterialLoading(false))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          material: mockMaterial
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(3);
        expect(analysisCall).toHaveLength(1);
      });
    done();
  });

  it('should add metarial', async (done) => {
    expectSaga(handleAddMaterial, { payload: mockMaterial })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([
        [call(createMaterial, mockMaterial)],
        [call(handleSuccessSnackbar, SUCCESS_ADD_STATUS)]
      ])
      .put(push('/materials'))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('should delete material by id', async (done) => {
    expectSaga(handleMaterialDelete, { payload: mockId })
      .withReducer(combineReducers({ Material }), {
        Material: {
          ...mockMaterialState,
          list: mockMaterials.items
        }
      })
      .put(setMaterialLoading(true))
      .provide([
        [call(deleteMaterial, mockId)],
        [call(handleSuccessSnackbar, SUCCESS_DELETE_STATUS)]
      ])
      .put(setMaterialLoading(false))
      .put(removeMaterialFromStore(mockId))
      .put(updatePagination())
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          list: []
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(4);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('should update material', async (done) => {
    expectSaga(handleMaterialUpdate, { payload: mockPayloadToUpdateMaterial })
      .withReducer(combineReducers({ Material }), {
        Material: mockMaterialState
      })
      .put(setMaterialLoading(true))
      .provide([
        [
          call(
            updateMaterial,
            mockPayloadToUpdateMaterial.id,
            mockPayloadToUpdateMaterial.material,
            mockPayloadToUpdateMaterial.images
          )
        ],
        [call(handleSuccessSnackbar, SUCCESS_UPDATE_STATUS)]
      ])
      .put(push('/materials'))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialLoading: true
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        const analysisCall = analysis.filter((e) => e.type === 'CALL');
        expect(analysisPut).toHaveLength(2);
        expect(analysisCall).toHaveLength(2);
      });
    done();
  });

  it('should handle material error', async (done) => {
    expectSaga(handleMaterialError, mockError)
      .withReducer(combineReducers({ Material }), {
        Material: {
          ...mockMaterialState,
          materialLoading: true
        }
      })
      .put(setMaterialLoading(false))
      .put(setMaterialError({ e: mockError }))
      .hasFinalState({
        Material: {
          ...mockMaterialState,
          materialLoading: false,
          materialError: { e: mockError }
        }
      })
      .run()
      .then((result) => {
        const { allEffects: analysis } = result;
        const analysisPut = analysis.filter((e) => e.type === 'PUT');
        expect(analysisPut).toHaveLength(5);
      });
    done();
  });
});
