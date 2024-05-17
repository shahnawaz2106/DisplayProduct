
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import axios from 'axios';

const ProductListScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products');
      setProducts(response.data.products);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card} onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}>
      <Card.Cover source={{ uri: item.thumbnail }} />
      <Card.Content>
        <Title>{item.title}</Title>
        <Paragraph>{item.description}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#FBE5DF'
  },
  card: {
    marginBottom: 15,
    backgroundColor: '#FBEFEE'
  },
});

export default ProductListScreen;
