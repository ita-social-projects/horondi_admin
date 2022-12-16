import {
  handleCity,
  handleCityNovaPost,
  handleDistrict,
  handleRegion,
  handleStateOrProvince,
  handleWarehousesNovaPost,
  handleWorldWideCity,
  handleWorldWideCountry
} from '../handle-orders-page';
import { inputName } from '../order';
import {
  valuesNovaPostCity,
  valuesNovaPostWarehouses,
  valuesUkrPostCity,
  valuesUkrPostDistrict,
  valuesUkrPostRegion,
  valuesWorldWideCity,
  valuesWorldWideCountry,
  valuesWorldWideStateOrProvince
} from './handle-orders-page.variables';

const setFieldValue = jest.fn();
const setWarehouse = jest.fn();
const setSelectedCity = jest.fn();
const setRegion = jest.fn();
const setDistrict = jest.fn();
const setCity = jest.fn();
const setPostOffice = jest.fn();

describe('Handle for delivery section with data', () => {
  it('handleCityNovaPost should called with value', () => {
    handleCityNovaPost(
      valuesNovaPostCity,
      setSelectedCity,
      setWarehouse,
      setFieldValue
    );

    expect(setSelectedCity).toHaveBeenCalledWith(
      valuesNovaPostCity.description
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.city,
      valuesNovaPostCity.description
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.cityId,
      valuesNovaPostCity.cityID
    );
  });

  it('handleWarehousesNovaPost should called with value', () => {
    handleWarehousesNovaPost(
      valuesNovaPostWarehouses,
      setFieldValue,
      setWarehouse
    );

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.courierOffice,
      valuesNovaPostWarehouses.description
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.courierOfficeId,
      valuesNovaPostWarehouses.number
    );
    expect(setWarehouse).toHaveBeenCalledWith(
      valuesNovaPostWarehouses.description
    );
  });

  it('handleRegion should called with value', () => {
    handleRegion(valuesUkrPostRegion, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.region,
      valuesUkrPostRegion.REGION_UA
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.regionId,
      valuesUkrPostRegion.REGION_ID
    );
  });

  it('handleDistrict should called with value', () => {
    handleDistrict(valuesUkrPostDistrict, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.district,
      valuesUkrPostDistrict.DISTRICT_UA
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.districtId,
      valuesUkrPostDistrict.DISTRICT_ID
    );
  });

  it('handleCity should called with value', () => {
    handleCity(valuesUkrPostCity, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.city,
      valuesUkrPostCity.CITY_UA
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.cityId,
      valuesUkrPostCity.CITY_ID
    );
  });

  it('handleWorldWideCountry should called with value', () => {
    handleWorldWideCountry(valuesWorldWideCountry, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideCountry,
      valuesWorldWideCountry
    );
  });

  it('handleStateOrProvince should called with value', () => {
    handleStateOrProvince(valuesWorldWideStateOrProvince, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.stateOrProvince,
      valuesWorldWideStateOrProvince
    );
  });

  it('handleWorldWideCity should called with value', () => {
    handleWorldWideCity(valuesWorldWideCity, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideCity,
      valuesWorldWideCity
    );
  });
});

describe('Handle for delivery section without data', () => {
  const emptyValue = '';
  it('handleCityNovaPost should called without value', () => {
    handleCityNovaPost(
      emptyValue,
      setSelectedCity,
      setWarehouse,
      setFieldValue
    );

    expect(setSelectedCity).toHaveBeenCalledWith(emptyValue);
    expect(setWarehouse).toHaveBeenCalledWith(emptyValue);
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.city,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.cityId,
      emptyValue
    );
  });

  it('handleWarehousesNovaPost should called without value', () => {
    handleWarehousesNovaPost(emptyValue, setFieldValue, setWarehouse);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.courierOffice,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.novaPost.courierOfficeId,
      emptyValue
    );
    expect(setWarehouse).toHaveBeenCalledWith(emptyValue);
  });

  it('handleRegion should called without value', () => {
    handleRegion(
      emptyValue,
      setFieldValue,
      setRegion,
      setDistrict,
      setCity,
      setPostOffice
    );

    expect(setRegion).toHaveBeenCalledWith(emptyValue);
    expect(setDistrict).toHaveBeenCalledWith(emptyValue);
    expect(setCity).toHaveBeenCalledWith(emptyValue);
    expect(setPostOffice).toHaveBeenCalledWith(emptyValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.region,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.district,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.city,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.cityId,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.courierOffice,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.districtId,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.regionId,
      emptyValue
    );
  });

  it('handleDistrict should called without value', () => {
    handleDistrict(emptyValue, setFieldValue, setCity, setPostOffice);

    expect(setCity).toHaveBeenCalledWith(emptyValue);
    expect(setPostOffice).toHaveBeenCalledWith(emptyValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.district,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.districtId,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.city,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.courierOffice,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.cityId,
      emptyValue
    );
  });

  it('handleCity should called without value', () => {
    handleCity(emptyValue, setFieldValue, setPostOffice);

    expect(setPostOffice).toHaveBeenCalledWith(emptyValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.city,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.cityId,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.ukrPost.courierOffice,
      emptyValue
    );
  });

  it('handleWorldWideCountry should called without value', () => {
    handleWorldWideCountry(emptyValue, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideCountry,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.stateOrProvince,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.stateOrProvince,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideCity,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideStreet,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.cityCode,
      emptyValue
    );
  });

  it('handleStateOrProvince should called without value', () => {
    handleStateOrProvince(emptyValue, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.stateOrProvince,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideCity,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideStreet,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.cityCode,
      emptyValue
    );
  });

  it('handleWorldWideCity should called without value', () => {
    handleWorldWideCity(emptyValue, setFieldValue);

    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideCity,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.worldWideStreet,
      emptyValue
    );
    expect(setFieldValue).toHaveBeenCalledWith(
      inputName.worldWide.cityCode,
      emptyValue
    );
  });
});
