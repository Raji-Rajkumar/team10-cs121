import React from 'react';
import renderer from 'react-test-renderer';

import { MenloText } from '../StyledText';

it(`renders correctly`, () => {
  const tree = renderer.create(<MenloText>Snapshot test!</MenloText>).toJSON();

  expect(tree).toMatchSnapshot();
});
