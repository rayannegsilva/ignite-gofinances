import React from 'react';
import {
  View,
  Text,
  TextInput,
  Button
} from 'react-native';

//import {Container} from '.styles';

export function Profile(){
  return (
    <View>
      <Text testID='text-title'>Perfil</Text>
      <TextInput
        testID='input-name'
        placeholder="Nome"
        autoCorrect={false}
        value='Rayanne'
      />
      <TextInput
        testID='input-surname'
        placeholder="Sobrenome"
        autoCorrect={false}
        value='Silva'
      />

      <Button 
        title="Salvar"
        onPress={() =>{}}
      />
    </View>
  )
}