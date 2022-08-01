"use strict";

const { getProduct } = require("../lib/ddb");

module.exports.handler = async(event) => {
  const params = {
    TableName: "tableProduct",
    Key: {
      id: event.id
    }
  }

  try {
    const data = await getProduct(params);
    if(!data.Item){
      return {
        statusCode: 404,
        body: "Product not found"
      }
    }
    console.log(data.Item);
    return {
      statusCode: 200,
      body: data.Item
    }
  }catch(err){
    return {
      statusCode: 500,
      body: JSON.stringify(err)
    }
  }
}