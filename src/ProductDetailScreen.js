// ProductDetailScreen.js
import Swiper from 'react-native-swiper';
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';

const ProductDetailScreen = ({route, navigation}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetchProductDetails(productId);
  }, []);

  const fetchProductDetails = async id => {
    try {
      const response = await axios.get(`https://dummyjson.com/products/${id}`);
      setProduct(response.data);
      
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backBtn}
          onPress={() => navigation.goBack()}>
          <Text style={styles.backBtnTxt}>⬅</Text>
        </TouchableOpacity>
        <Swiper showsButtons={false} style={styles.swiper}>
          {product.images.map(user => (
            <View style={styles.swiperView}>
              <Image
                resizeMode="contain"
                style={{width: '100%', height: '100%'}}
                source={{uri: user}}
              />
            </View>
          ))}
        </Swiper>
        <View style={{paddingLeft: 15, paddingRight: 15}}>
          <Text style={styles.name}>{product.title}</Text>
          <Text style={styles.brand}>Manufactured by {product.brand}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.description}>⭐ {product.rating}</Text>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <Text style={styles.price}>
              ⬇{product.discountPercentage}% Off{' '}
            </Text>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <Text
            style={[
              styles.price,
              {color: '#000', fontSize: 15, marginBottom: 20},
            ]}>
            Only {product.stock} left in stock
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FBE5DF',
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#000',
  },
  brand: {
    marginBottom: 5,
    fontSize: 14,
    fontWeight: '400',
    color: 'black'
  },
  description: {
    marginBottom: 5,
    fontSize: 15,
    fontWeight: '500',
    color: '#000',
  },
  price: {
    fontWeight: 'bold',
    color: 'green',
    fontSize: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    width: '100%',
    marginVertical: 10,
  },
  backBtn: {
    position: 'absolute',
    top: 0,
    left: 5,
    zIndex: 1,
  },
  backBtnTxt: {
    fontSize: 35,
    fontWeight: 'bold',
    paddingLeft: 5,
    color: 'black'
  },
  swiper: {
    marginTop: 0,
    marginBottom: 0,
    height: '100%',
  },
  swiperView: {
    width: '95%',
    alignSelf: 'center',
    backgroundColor: '#FBEFEE',
    borderRadius: 8,
    paddingVertical: 45,
    paddingHorizontal: 25,
    marginVertical: 10,
  },
});

export default ProductDetailScreen;
