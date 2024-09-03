import React from 'react';
import { View, Text, Image, Button, StyleSheet } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { deleteProduct } from '../database/DatabaseHelper';

const ProductDetailScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { product } = route.params;

  const handleDelete = () => {
    deleteProduct(product.id);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {product.image ? (
        <Image source={{ uri: product.image }} style={styles.productImage} />
      ) : (
        <Text>No Image Available</Text>
      )}
      <Text style={styles.productTitle}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>
      <Button title="Edit Product" onPress={() => navigation.navigate('AddEditProduct', { product })} />
      <Button title="Delete Product" onPress={handleDelete} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  productImage: {
    width: '100%',
    height: 200,
    marginBottom: 16,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 20,
    color: '#888',
    marginBottom: 16,
  },
  productDescription: {
    fontSize: 16,
    marginBottom: 16,
  },
});

export default ProductDetailScreen;
