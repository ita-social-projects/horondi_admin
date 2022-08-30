import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as reactRedux from 'react-redux';
import * as operations from '../../../redux/material/material.operations';
import DialogWindow from '../../../components/dialog-window';
import configureStore from '../../../store/store';
import ConstructorFormContainer from '../constructor-form-container';
import {
  partItem,
  materialsByPurpose,
  partItemId,
  addPartItemDispatch
} from './constructor-form-container.variables';
import { config } from '../../../configs';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    block: jest.fn()
  })
}));

operations.getAllMaterialsByPurpose = jest
  .fn()
  .mockReturnValue(materialsByPurpose);

const { Provider } = reactRedux;
const store = configureStore();

const { pathToBottoms } = config.routes;
const { constructorItemsKeys } = config;
const partItemKey = constructorItemsKeys.bottom;
const materialSelectValue = materialsByPurpose.bottom[0].name[0].value;
const colorSelectValue = materialsByPurpose.bottom[0].colors[0].name[0].value;
const nameInputUaValue = partItem.name[0].value;
const nameInputEnValue = partItem.name[1].value;
const priceInputValue = partItem.relativePrice;

describe('Constructor-form-container editing test', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <ConstructorFormContainer
          id={partItemId}
          edit
          part={partItem}
          partItemKey={partItemKey}
          pathBack={pathToBottoms}
          dispatchAction={jest.fn()}
        />
        <DialogWindow />
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('Should render with correct data by editing partItem', () => {
    const availableCheckbox = screen.getByRole('checkbox');
    expect(availableCheckbox.checked).toBe(true);

    const materialLabel = screen.getByTestId('materialLabel');
    const materialSelect = materialLabel.querySelector('[role="button"]');
    expect(materialSelect).toHaveTextContent(materialSelectValue);

    const colorLabel = screen.getByTestId('colorLabel');
    const colorSelect = colorLabel.querySelector('[role="button"]');
    expect(colorSelect).toHaveTextContent(colorSelectValue);

    const nameInputWrapper = screen.getAllByTestId('title-edit-input');

    const nameInputUa = nameInputWrapper[0].querySelector('#uaName');
    expect(nameInputUa).toHaveTextContent(nameInputUaValue);

    const nameInputEn = nameInputWrapper[1].querySelector('#enName');
    expect(nameInputEn).toHaveTextContent(nameInputEnValue);

    const priceGroup = screen.getByRole('radiogroup');
    const priceBtn = priceGroup.querySelector('[value="RELATIVE"]');
    expect(priceBtn.checked).toBe(true);

    const priceInputGroup = screen.getByTestId('additionalPrice');
    const priceInput = priceInputGroup.querySelector('#additionalPrice');
    expect(+priceInput.value).toBe(priceInputValue);
  });

  test('Should change values and submit with correct params', async () => {
    const availableCheckbox = screen.getByRole('checkbox');
    act(() => {
      fireEvent.click(availableCheckbox);
    });

    const saveBtn = screen.getByTestId('save-btn');
    act(() => {
      fireEvent.click(saveBtn);
    });

    const dialogConfirmBtn = await screen.findByTestId('dialog-confirm');
    act(() => {
      fireEvent.click(dialogConfirmBtn);
    });
  });
});
