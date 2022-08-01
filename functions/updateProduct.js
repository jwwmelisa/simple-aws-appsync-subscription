"use strict";

const { updateProduct } = require("../lib/ddb");

module.exports.handler = async(event) => {
  try {
    const data = event.input;
    let newValue = {};
    let syntaxArr = [];
    for(let x in data){
      if(x !== 'id'){
        newValue[`:${x}`] = data[x];
        syntaxArr.push(`${x} = :${x}`)
      }
    }
    const syntax = syntaxArr.join(', ')
    const params = {
      TableName: 'tableProduct',
      Key: {
        id: data.id
      },
      UpdateExpression: `set ${syntax}`,
      ExpressionAttributeValues: newValue,
      ReturnValues: 'UPDATED_NEW'
    }
    const result = await updateProduct(params);
    result.Attributes.id = data.id;
    return {
      statusCode: 200,
      body: result.Attributes,
    };
  } catch(e) {
    return {
      statusCode: 400,
      body: JSON.stringify(
        {
          message: String(e),
        }
      ),
    };
  }
}