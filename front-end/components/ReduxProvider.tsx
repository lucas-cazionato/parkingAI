import { store } from '@/store/store';
import React from 'react';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Provider } from 'react-redux';

const ReduxProvider = ({children}: {children: React.ReactNode}) => {
  return (
    <Provider store={store}>
        <KeyboardAvoidingView
            style={{ flex: 1}}
        >
            {children}
        </KeyboardAvoidingView>
    </Provider>
  );
};

export default ReduxProvider;