import React from 'react';
import ErrorMessage from './ErrorMessage';
import { shallow } from 'enzyme';

const props = {
  message: 'Error',
  clearError: () => {},
};

describe('<ErrorMessage />', () => {
  it('should show error message', () => {
    const wrapper = shallow(<ErrorMessage {...props} />);

    expect(wrapper.find('WithStyles(ForwardRef(Alert))').text()).toEqual(
      props.message
    );
  });
});
