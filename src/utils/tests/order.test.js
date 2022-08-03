import {
  handleOrderItem,
  address,
  setFormValues,
  calculateItemsPriceWithDiscount,
  calculateDiscountsForProducts,
  mergeProducts
} from '../order';
import {
  deliveryMock,
  setFormMock,
  courierMock,
  ukrPostMock,
  promoCodeMock,
  categoryMock,
  selectedProductMock,
  sizeMock,
  orderItemsMock,
  productsMock,
  mockItemsDiscount,
  mockItemsPriceWithDiscount,
  modelMock
} from './order.variables';

const setFieldValue = jest.fn();
const quantity = 3;
const price = 171;

describe('[utils:order]', () => {
  it('handleOrderItem function should return correct value', () => {
    const result = handleOrderItem('test');

    expect(result).toBe('test');
  });

  it('address function - delivery type novaPost', () => {
    const result = address(deliveryMock);

    expect(result.city).toBe('Lviv');
    expect(result.courierOffice).toBe('office 42');
  });

  it('setFormValues function - novaPost type', () => {
    const { delivery, paymentMethod } = setFormValues(setFormMock);

    expect(paymentMethod).toBe('CARD');
    expect(delivery.courier).toEqual(courierMock);
    expect(delivery.ukrPost).toEqual(ukrPostMock);
  });

  it('calculateItemsPriceWithDiscount function', () => {
    const result = calculateItemsPriceWithDiscount(
      promoCodeMock,
      quantity,
      categoryMock,
      price
    );

    expect(result).toBe(462);
  });

  it('calculateDiscountsForProducts function', () => {
    const result = calculateDiscountsForProducts(promoCodeMock, categoryMock);

    expect(result).toBe(10);
  });

  it('mergeProducts function', () => {
    const result = mergeProducts(
      selectedProductMock,
      sizeMock,
      quantity,
      orderItemsMock,
      categoryMock,
      modelMock,
      promoCodeMock,
      setFieldValue,
      mockItemsDiscount,
      mockItemsPriceWithDiscount
    );

    expect(result).toEqual(productsMock);
  });
});
