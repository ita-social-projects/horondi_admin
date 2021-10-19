import React from 'react';
import { Checkbox, FormControlLabel } from '@material-ui/core';
import ImagesPreviewContainer from '..';

describe('Product-form tests', () => {
  let component;
  const imageHandler = jest.fn();

  beforeEach(() => {
    component = mount(
      <ImagesPreviewContainer
        src={[
          {
            primary: true,
            src: {
              large: 'img'
            }
          },
          {
            primary: false,
            src: {
              large: 'img2'
            }
          }
        ]}
        labels={{}}
        imageHandler={imageHandler}
        multiple
      />
    );
  });

  afterEach(() => {
    component.unmount();
  });

  it('#1 Render the component', () => {
    expect(component).toBeDefined();
  });

  it('#2 Render component with empty src', () => {
    component = shallow(
      <ImagesPreviewContainer
        src={[]}
        labels={{}}
        imageHandler={imageHandler}
        multiple
      />
    );

    expect(component).toBeDefined();
  });

  it('#3 Should call handlers', () => {
    const formLabel = component.find(FormControlLabel);

    const deleteButton = formLabel.at(0).props();
    deleteButton.onClick();

    const checkbox = component.find(Checkbox);
    checkbox
      .at(0)
      .props()
      .onChange({
        target: {
          name: 1,
          checked: true
        }
      });

    checkbox.at(2).simulate('change');

    const primary = formLabel.at(1).props().control;
    primary.props.onChange();

    expect(imageHandler).toHaveBeenCalledTimes(2);
  });
});
