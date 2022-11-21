// a snapshot test of the UI
import React from 'react';
import Main from '../components/Main';
import renderer from 'react-test-renderer';

test('renders correctly', () => {
    const tree = renderer
    .create(<Main/>)
    .toJSON();
    expect(tree).toMatchSnapshot();
    });