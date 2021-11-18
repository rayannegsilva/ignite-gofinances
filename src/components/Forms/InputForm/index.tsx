import React from 'react';
import { Control, Controller } from 'react-hook-form';
import { FormDataProps } from '../../../screens/Register';
import {
  Container,
} from './styles';

import { Input } from '../Input';
import { TextInputProps } from 'react-native';

interface Props extends TextInputProps {
  control: Control;
  name: string;
}

export function InputForm({
  control,
  name,
  ...rest
}: Props) {
  return (
    <Container>
      <Controller
        control={control}
        render={({ field: { onChange, value } }) => (
          <Input
            onChange={onChange}
            value={value}
            {...rest} />
        )}
        name={name}
      />
    </Container>

  )
}