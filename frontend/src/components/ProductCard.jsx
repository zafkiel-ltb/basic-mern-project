import React, {useState} from 'react';
import { Box, Heading, Image, Text, VStack, Input, HStack, IconButton, useColorModeValue, Button, ModalOverlay, useToast, Modal, useDisclosure, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useProductStore } from '../store/product.js';

const ProductCard = ({product}) => {
  const toast = useToast();
  const [updatedProduct, setUpdatedProduct] = useState(product);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const textColor = useColorModeValue('gray.600', 'gray.200');
  const bg = useColorModeValue('white', 'gray.800');
  const {deleteProduct, updateProduct} = useProductStore();

  const handleUpdateProduct = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    if (!success) {
        toast({
          title: "Update error",
          description: "Updated error for the product", 
          status: "error",
          duration: 3000,
          isClosable: true,
        });
    } else {
        toast({
          title: "Update successfully",
          description: "Product updated successfully", 
          status: "success",
          duration: 3000,
          isClosable: true,
        });
    }
    onClose();
  }

  const handleDeleteProduct = async (pid) => {
    const {success, message} = await deleteProduct(pid);
    if(!success){
        toast({
          title: "Delete error",
          description: message,
          status: "error",
          isClosable: true
        })
      }
      else{
        toast({
          title: "Delete successfully",
          description: message,
          status: "success",
          isClosable: true
        })
      }
  }
  return (
    <Box
    shadow='lg'
    rounded='lg'
    overflow='hidden'
    transition='all 0.3s'
    _hover={{ transform: 'translateY(-5px)', shadow: 'xl'}}
    bg = {bg}
    >
        <Image src= {product.image} alt={product.name} h={48} w='full' objectFit='cover'/>
        <Box p={4}>
          <Heading as='h3' size='md' mb={2}>
            {product.name}
          </Heading>
          <Text fontWeight='bold' fontSize='xl' color={textColor} mb={4}>
            ${product.price}
          </Text>
          <HStack spacing = {2}>
            <IconButton icon={<EditIcon/>} onClick = {onOpen} colorScheme='blue'/>
            <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product._id)} colorScheme='red'/>
          </HStack>
        </Box>

        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <VStack spacing = {4}>
                        <Input
                            placeholder = "Product name"
                            name = "name"
                            value = {updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value})}
                        />
                        <Input
                            placeholder = "Price"
                            name = "price"
                            type = "number"
                            value = {updatedProduct.price}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value})}
                        />
                        <Input
                            placeholder = "Image URL"
                            name = "image"
                            value = {updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value})}
                        />
                        </VStack>
                    </ModalBody>
                <ModalFooter>
                    <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>Update</Button>
                    <Button varient='ghost' onClick={onClose}>Cancel</Button>
                </ModalFooter>
                </ModalContent>
        </Modal>
    </Box>
  );
};

export default ProductCard;