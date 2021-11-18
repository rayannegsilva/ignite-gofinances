import styled, { css } from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';

interface TransactionProps {
  type: 'positive' | 'negative';
}

export const Container = styled.View`
 background-color: ${({ theme }) => theme.colors.shape};
 border-radius: 5px;
 padding: 17px 24px;

 margin-bottom: ${RFValue(16)}px;

`;

export const Title = styled.Text`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(14)}px;
`
export const Amount = styled.Text<TransactionProps>`
font-family: ${({ theme }) => theme.fonts.regular};
font-size: ${RFValue(20)}px;
margin-top: 2px;

color: ${({ theme, type }) =>

    type === 'positive' ? theme.colors.success : theme.colors.attention};
`

export const Footer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  margin-top: 19px;
  
`
export const Category = styled.View`
  flex-direction: row;
  align-items: center;
  
  
`
export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
 
`

export const CategoryName = styled.Text`
  font-family: ${({ theme }) => theme.fonts.regular};
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(14)}px;

  margin-left: 17px;
`
export const Date = styled.Text`
color: ${({ theme }) => theme.colors.text};
`
