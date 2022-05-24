import React from 'react';
import { render } from '@testing-library/react-native';

import { Profile } from '../../screens/Profile';

describe('Profile', () => {
  it('should have placeholder correctly input username ', () => {

    const { getByPlaceholderText } = render(<Profile />);
  
    const inputName = getByPlaceholderText('Nome');
    
    expect(inputName).toBeTruthy();
  
  
  });
  
  it('should be  loaded user data', () => {
     const { getByTestId } = render(<Profile />);
  
     const inputName = getByTestId('input-name');
     const inputSurname = getByTestId('input-surname');
  
     expect(inputName.props.value).toEqual('Rayanne');
     expect(inputSurname.props.value).toEqual('Silva');
  });
  
  it('should exist title correctly', () => {
    const { getByTestId } = render(<Profile />);
  
    const textTitle = getByTestId('text-title');
  
    expect(textTitle.props.children).toContain('Perfil');
  });
})

