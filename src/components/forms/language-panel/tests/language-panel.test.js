import React from 'react';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Paper, TextField } from '@material-ui/core';
import LanguagePanel from '../index';
import { mockLang, mockInputOptions } from './language-panel.variables';

configure({ adapter: new Adapter() });

const mockOnEditorChange = jest.fn();

jest.mock('../../../editor', () => ({
  __esModule: true,
  default: function FuncEditor() {
    return <div className='editor' onEditorChange={mockOnEditorChange} />;
  }
}));

describe('LanguagePanel tests', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(
      <LanguagePanel lang={mockLang} inputOptions={mockInputOptions} />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Should render Typography component', () => {
    expect(wrapper.find('h1.MuiTypography-h5')).toHaveLength(1);
  });

  it('Should render Paper component', () => {
    expect(wrapper.exists(Paper)).toBe(true);
    expect(wrapper.find(Paper).children()).toHaveLength(1);
  });

  it('Should render one input in Editor component', () => {
    expect(wrapper.find('div.editor')).toHaveLength(1);
  });

  it('Should render two inputs in Editor component', () => {
    wrapper = mount(
      <LanguagePanel
        lang={mockLang}
        inputOptions={{
          ...mockInputOptions,
          inputs: [
            ...mockInputOptions.inputs,
            {
              label: {
                ua: 'Назва матеріалу',
                en: 'Material name'
              },
              name: 'Защіпка',
              required: false,
              isEditor: true
            }
          ]
        }}
      />
    );
    expect(wrapper.find('div.editor')).toHaveLength(2);
  });

  it('Should render error', () => {
    expect(wrapper.find(TextField).props().error).toBe(true);
  });

  it('Should render mockOnEditorChange ', () => {
    wrapper.find('div.editor').props().onEditorChange();
    expect(mockOnEditorChange).toHaveBeenCalled();
  });
});
