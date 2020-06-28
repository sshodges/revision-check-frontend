import React from 'react';
import Loading from './Loading';
import { shallow } from 'enzyme';

describe('<Loading />', () => {
  it('should not show when loading is false', () => {
    const props = {
      loading: false,
    };
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper.text()).toEqual('');
  });

  it('should show when loading is true', () => {
    const props = {
      loading: true,
    };
    const wrapper = shallow(<Loading {...props} />);
    expect(wrapper.debug()).toContain('LinearProgress');
  });
});
