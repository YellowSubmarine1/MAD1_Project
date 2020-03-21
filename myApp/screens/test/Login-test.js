import 'react-native';
import React from 'react';
import Login from '../screens/Login';
import renderer from 'react-test-renderer';

test('Login snapShot',()=>{
    const snap = renderer.create(

        <Login/>
    ).toJSON();
    expect(snap).toMatchSnapshot();
});