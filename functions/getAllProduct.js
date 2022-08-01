"use strict"

const { getAllProduct } = require("../lib/ddb")

module.exports.handler = async(event) => {
  const params = {
    TableName: "tableProduct"
  }
  try{
    const result = await getAllProduct(params);
    return{
      statusCode: 200,
      body: result
    }
  }catch(err){
    return {
      statusCode: 500,
      body: {message: err}
    }
  }
}