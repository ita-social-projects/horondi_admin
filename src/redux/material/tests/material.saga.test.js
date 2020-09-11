import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { handleMaterialLoad,handleMaterialsLoad } from '../material.sagas'
import { setMaterials, setMaterialLoading, setMaterial, setMaterialError } from '../material.actions';

import { materials, materialToUpdateDeleteId, material,fakeId } from './material.variables';
import { getAllMaterials,getMaterialById,updateMaterial} from '../material.operations';

const materialId = materialToUpdateDeleteId

describe('pattern sagas test', () => {

  it('#1 should receive all materials and set to store', () => {
    const fakeMaterials = {
      data: {
        getAllMaterials: {
          ...materials
        }
      }
    };
    expectSaga(handleMaterialsLoad)
      .provide([[matchers.call.fn(getAllMaterials), fakeMaterials]])
      .put(setMaterialLoading(true))
      .put(setMaterials(fakeMaterials))
      .put(setMaterialLoading(false))
      .run();
  });
  it('#2 should receive one material and set to store', () => {
    const fakeMaterial = {
      data: {
        getMaterialById: {
          ...material
        }
      }
    };
    expectSaga(handleMaterialLoad, materialId)
      .provide([[matchers.call.fn(getMaterialById), fakeMaterial]])
      .put(setMaterialLoading(true))
      .put(setMaterial(fakeMaterial))
      .put(setMaterialLoading(false))
      .run();
  });
  it('#2 should throw error', () => {

    expectSaga(handleMaterialLoad, fakeId)
      .provide([[matchers.call.fn(getMaterialById),{statusCode:404,message:'MATERIAL_NOT_FOUND'}]])
      .put(setMaterialLoading(true))
      .put(setMaterialError(true))
      .put(setMaterialLoading(false))
      .run();
  });
  it('#3 should update one material', () => {
    const fakeMaterial = {
      data: {
        getMaterialById: {
          ...material,available:false
        }
      }
    };
    expectSaga(handleMaterialLoad,{id:materialId,material:{available:true}})
      .provide([[matchers.call.fn(updateMaterial), fakeMaterial]])
      .put(setMaterialLoading(true))
      .put(setMaterial(fakeMaterial))
      .put(setMaterialLoading(false))
      .run();
  });
});
