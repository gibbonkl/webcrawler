const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    authorization: '5fe5d072-67e1-46e0-bfbe-53b71cc71712'
  }
});


const InsertProduct = async (product) => {

  const response = await api.post('/products', product);
  console.log('Inserting...');
  console.log(response.status);
  console.log(response.data);

}
/*
const DeleteProduct = async (product) => {

  const response = await api.delete("/products/:url", product);
  console.log('Deleting...');
  console.log(response.status);
  console.log(response.data);

}

const UpdateProduct = async (product) => {

  const response = await api.put("/products/:url", product);
  console.log('Updating...');
  console.log(response.status);
  console.log(response.data);

}
*/
module.exports = InsertProduct;
