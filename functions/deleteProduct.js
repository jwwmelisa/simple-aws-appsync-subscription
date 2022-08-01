"use strict";

const { deleteProduct } = require("../lib/ddb");

module.exports.handler = async(event) => {
  const params = {
    TableName: "tableProduct",
    Key: {
      id: event.id
    }
  }
  try{
    console.log('Wait')
    const data = await deleteProduct(params);
    return{
      statusCode: 200,
      body: {message: "Success"}
    }
  }catch(err){
    console.log(err)
    return {
      statusCode: 500,
      body: String(err)
    }
  }

}