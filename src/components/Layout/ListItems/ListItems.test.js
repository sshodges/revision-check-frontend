import React from 'react';
import ListItems from './ListItems';
import ListItem from '@material-ui/core/ListItem';

import { shallow } from 'enzyme';

describe('<ListItems />', () => {
  it('renders 3 x <ListItem /> components', () => {
    const wrapper = shallow(<ListItems />);
    expect(wrapper.find(ListItem)).toHaveLength(3);
  });
});
