import React, { useState, useEffect, useCallback } from 'react';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { HighlightCard } from '../../components/HighlightCard';
import { TransactionCard, TransactionCardProps } from '../../components/TransactionCard';
import {
  Container,
  Header,
  UserWrapper,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  Icon,
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer
} from './styles';

import { useTheme } from 'styled-components';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const theme = useTheme();

  function getLastTransactionDate(
    collection: DataListProps[],
    type: 'positive' | 'negative'
  ) {
    const lastTransaction = new Date(
      Math.max.apply(Math, collection
        .filter(transaction => transaction.type === type)
        .map(transaction => new Date(transaction.date).getTime())
      ));

    return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString('pt-BR', {
      month: 'long'
    })}`;
  }

  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>({} as HighLightData);

  async function loadTransactions() {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactions = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transactionsFormated: DataListProps[] = transactions
      .map((item: DataListProps) => {

        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',

        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: "2-digit",
          month: "2-digit",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          type: item.type,
          category: item.category,
          amount,
          date,
        }
      });

    setTransactions(transactionsFormated);
    const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
    const lastTransactionsExpansives = getLastTransactionDate(transactions, 'negative');
    const totalInterval = `01 a ${lastTransactionsExpansives}`

    const total = entriesTotal - expensiveTotal;
    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última entrada dia ${lastTransactionsEntries}`,
      },
      expensives: {
        amount: expensiveTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: `Última saída dia ${lastTransactionsExpansives}`,
      },
      total: {
        amount: total.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }),
        lastTransaction: totalInterval,
      }
    });
    setIsLoading(false);
  }

  useEffect(() => {
    loadTransactions();

  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, []));

  return (
    <Container>

      {
        isLoading ?
          <LoadContainer>
            <ActivityIndicator
              size='large'
              color={theme.colors.primary} />
          </LoadContainer>
          :
          <>
            <Header>
              <UserWrapper>
                <UserInfo>
                  <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/69162451?v=4' }} />
                  <User>
                    <UserGreeting>Olá,</UserGreeting>
                    <UserName>Rayanne</UserName>
                  </User>
                </UserInfo>
                <LogoutButton onPress={() => { }}>
                  <Icon name='power' />
                </LogoutButton>
              </UserWrapper>
            </Header>

            <HighlightCards>
              <HighlightCard
                type='up'
                title="Entradas"
                amount={highLightData?.entries?.amount}
                lastTransaction={highLightData?.entries?.lastTransaction}
              />
              <HighlightCard
                type='down'
                title="Saídas"
                amount={highLightData?.expensives?.amount}
                lastTransaction={highLightData?.expensives?.lastTransaction}
              />
              <HighlightCard
                type='total'
                title='Total'
                amount={highLightData?.total?.amount}
                lastTransaction={highLightData?.total?.lastTransaction}
              />
            </HighlightCards>


            <Transactions>
              <Title>Listagem</Title>

              <TransactionsList
                data={transactions}
                keyExtractor={item => item.id}
                renderItem={({ item }) =>
                  <TransactionCard data={item}
                  />}

              />
            </Transactions>
          </>
      }
    </Container >
  );
}