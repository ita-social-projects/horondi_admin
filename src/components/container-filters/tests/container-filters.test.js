import React from 'react';
import { mount } from 'enzyme';

import ContainerFilters from '../container-filters';

let wrapper;

describe('Testing containerFilters', () => {
  it('should render', () => {
    const testComponent = <h1 className='test'>Test</h1>;

    wrapper = mount(<ContainerFilters>{testComponent}</ContainerFilters>);

    expect(wrapper.find('.test')).toBeDefined();
  });
});
