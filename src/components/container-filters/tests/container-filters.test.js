import React, { useEffect } from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import * as reactRedux from 'react-redux';

import ContainerFilters from '../container-filters';

Enzyme.configure({ adapter: new Adapter() });

let wrapper;

describe('Testing containerFilters', () => {
  it('should render', () => {
    const testComponent = <h1 className='test'>Test</h1>;

    wrapper = mount(<ContainerFilters>{testComponent}</ContainerFilters>);

    expect(wrapper.find('.test')).toBeDefined();
  });
});
