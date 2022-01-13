import '@testing-library/jest-dom/extend-expect';
import Enzyme, { shallow, render, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

window.shallow = shallow;
window.render = render;
window.mount = mount;
window.toJson = toJson;
