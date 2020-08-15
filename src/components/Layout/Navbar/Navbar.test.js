import React from 'react';
import { Navbar } from './Navbar';
import { mount } from 'enzyme';
let props = {
  layout: { preferredTheme: 'light' },
  updateColorPreference: jest.fn(),
};
describe('<Navbar />', () => {
  it('should load with light theme', () => {
    const wrapper = mount(<Navbar {...props} />);

    wrapper.find('button.toggle-theme').simulate('click');

    expect(props.updateColorPreference).toHaveBeenCalledWith('dark');
  });

  it('should change theme on toggle click', () => {
    const wrapper = mount(<Navbar {...props} />);
    wrapper.find('button.toggle-theme').simulate('click');
    wrapper.update();
    console.log(wrapper.debug());
    expect(props.updateColorPreference).toHaveBeenCalledWith('dark');
  });
});
