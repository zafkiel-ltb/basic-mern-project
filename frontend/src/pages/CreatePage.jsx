import { Container, useColorMode, useColorModeValue, Button, VStack, Heading, Box, Input, useToast } from '@chakra-ui/react';
import React, {useState} from 'react'
import { useProductStore } from '../store/product';

const CreatePage = () => {

  const toast = useToast();
  const [newProduct, setNewProduct] = useState({
      name: "",
      price: "",
      image: "",
  });

  const {createProduct} = useProductStore() // Khai báo

  const handleAddProduct = async () => {
      const {success, message} = await createProduct(newProduct); //Ở đây sử dụng hàm này được code bên product.js
      if(!success){
        toast({
          title: "Error",
          desciption: message,
          status: "error",
          isClosable: true
        })
      }
      else{
        toast({
          title: "Success",
          desciption: message,
          status: "success",
          isClosable: true
        })
      }
      setNewProduct({name:"", price: "", image: ""});
  };

  return (
    <Container maxW ={"container.sm"}>
      <VStack
        spacing ={8}
      >
        <Heading as = {"h1"} size = {"2xl"} textAlign = {"center"} mb = {8}>
          Create new Product
        </Heading>

        <Box
          w = {"full"} bg={useColorModeValue("white", "gray.800")} p ={6} rounded = {"lg"} shadow = {"md"}
        >
          <VStack spacing = {4}>
          <Input
            placeholder = "Product name"
            name = "name"
            value = {newProduct.name}
            onChange = {(e) => setNewProduct({...newProduct, name: e.target.value})}
          />
          <Input
            placeholder = "Price"
            name = "price"
            value = {newProduct.price}
            onChange = {(e) => setNewProduct({...newProduct, price: e.target.value})}
          />
          <Input
            placeholder = "Image URL"
            name = "image"
            value = {newProduct.image}
            onChange = {(e) => setNewProduct({...newProduct, image: e.target.value})}
          />
          <Button colorScheme='blue' onClick = {handleAddProduct} w = "full">
            Add product
          </Button>
          </VStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default CreatePage