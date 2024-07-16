// App.js
import React from 'react';
import { SafeAreaView } from 'react-native';
import Todo from './component/Todo';

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Todo />
    </SafeAreaView>
  );
};

export default App;
