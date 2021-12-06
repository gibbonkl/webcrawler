const axios = require('axios');

const api = axios.create({
  baseURL: 'http://localhost:3000', 
  headers: {
    authorization: '5fe5d072-67e1-46e0-bfbe-53b71cc71712'
  }
});

exports.InsertProduct = async (product) => {

  const response = await api.post('/products', product);
  console.log('Inserting/updating success:', response.data[1], response.data[0].url);

}

exports.SelectProducts = async (store) => {

  const response = await api.get('/products',store=store);
  console.log('Selecting... Code:', response.status);
  return (response.data.content);

}
