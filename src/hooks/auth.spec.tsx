import AsyncStorage from '@react-native-async-storage/async-storage';
import { renderHook, act } from '@testing-library/react-hooks';
import fetchMock from 'jest-fetch-mock';
import { mocked } from 'jest-mock';
import { startAsync }from 'expo-auth-session';

import { AuthProvider, useAuth } from './auth';

fetchMock.enableMocks();

jest.mock('expo-auth-session')

// const userTest = {
//   id: 'any_id',
//   email: 'john.doe@email.com',
//   name: 'John Doe',
//   photo: 'any_photo.png'
// };

// jest.mock('expo-auth-session', () => {
//   return {
//     startAsync: () => ({
//       type: 'success',
//       params: {
//         access_token: 'any_token',
//       }
//     }),
//   }
// })

describe('Auth Hook', () => {

  beforeEach(async () => {
    const userCollectionKey = '@gofinances:user'
    await AsyncStorage.removeItem(userCollectionKey)
 })

  it('should be able to sign in with Google account existing', async () => {
    const userTest = {
      id: 'any_id',
      email: 'john.doe@email.com',
      name: 'John Doe',
      photo: 'any_photo.png'
    };

    const googleMocked =  mocked(startAsync as any);

    googleMocked.mockReturnValueOnce({
      type: 'success',
      params: {
        access_token: 'any_token',
      }
    });


    fetchMock.mockResponseOnce(JSON.stringify(userTest));
    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    await act(() => result.current.signInWithGoogle());

    expect(result.current.user.email)
      .toBe(userTest.email);
  });

  it('user should not connect if cancel authentication with google is terminated', async () => {
    const userTest = {
      id: 'any_id',
      email: 'john.doe@email.com',
      name: 'John Doe',
      photo: 'any_photo.png'
    };

    const googleMocked =  mocked(startAsync as any);
    googleMocked.mockReturnValueOnce({
      type: 'cancel',
    })


    //fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      await act(() => result.current.signInWithGoogle());
    }catch {
      expect(result.current.user)
      .toEqual({});
    }
  });

  it('should be error sign in with incorrectly google parameters', async () => {

    //fetchMock.mockResponseOnce(JSON.stringify(userTest));

    const { result } = renderHook(() => useAuth(), {
      wrapper: AuthProvider
    });

    try {
      await act(() => result.current.signInWithGoogle());
    }catch {
      expect(result.current.user)
      .toEqual({});
    }
  });

});



