// App.js

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ProductListScreen from './src/ProductListScreen';
import ProductDetailScreen from './src/ProductDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="ProductList" component={ProductListScreen} options={{ title: 'Product List', headerShown: false }} />
        <Stack.Screen name="ProductDetail" component={ProductDetailScreen} options={{ title: 'Product Detail', headerShown: false  }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
