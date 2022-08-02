"use strict"

const { getAllProduct } = require("../lib/ddb")

module.exports.handler = async(event) => {
  const params = {
    TableName: "tableProduct"
  }
  try{
    const resData = await getAllProduct(params);
    console.log('ini atas Items', resData)
    const result = resData.map(item => item)
    console.log('ini result', result);
    return {
      statusCode: 200
    }, result
  }catch(err){
    return {
      statusCode: 500,
      body: {message: err}
    }
  }
}