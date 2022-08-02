"use strict";
const {v4} = require('uuid');
const { createProduct } = require('../lib/ddb');

module.exports.handler = async (event) => {
  const id = v4();
  const params = {
    TableName: 'tableProduct',
    Item: {
      id,
      product: event.input.product,
      price: event.input.price
    }
  };
  try {
    await createProduct(params);
    return {
      statusCode: 200,
      body: params.Item
    }
  } catch(err){
    console.log("ERROR: ", err);
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
};
