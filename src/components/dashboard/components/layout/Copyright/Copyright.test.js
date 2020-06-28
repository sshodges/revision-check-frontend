import React from 'react';
import Copyright from './Copyright';
import { shallow } from 'enzyme';

describe('<Copyright />', () => {
  it('shows the current year', () => {
    const wrapper = shallow(<Copyright />);
    const currentYear = new Date().getFullYear();
    expect(wrapper.text()).toContain(currentYear);
  });
});
