const AWS = require('aws-sdk');
const dynamoDB = new AWS.DynamoDB.DocumentClient();

const createProduct = async(props) => {
  try {
    return await dynamoDB.put(props).promise();
  }catch(err){
    throw Error(err);
  }
};

const getAllProduct = async(props) => {
  try{
    const data = await scanDynamoRecords(props, []);
    return data;
  }catch(err){
    throw Error(err);
  }
};

const getProduct = async(props) => {
  try{
    return await dynamoDB.get(props).promise();
  }catch(err){
    return err;
  }
}

const updateProduct = async(props) => {
  try{
    return await dynamoDB.update(props).promise();
  }catch(err){
    throw Error(err);
  }
};

const deleteProduct = async(props) => {
  try {
    return await dynamoDB.delete(props).promise();
  }catch(err){
    throw Error(err);
  }
}

const scanDynamoRecords = async(scanParams, itemArray) => {
  try {
    const dynamoData = await dynamoDB.scan(scanParams).promise();
    itemArray = itemArray.concat(dynamoData.Items);
    if (dynamoData.LastEvaluatedKey) {
      scanParams.ExclusiveStartkey = dynamoData.LastEvaluatedKey;
      return await scanDynamoRecords(scanParams, itemArray);
    }
    return itemArray;
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

module.exports= {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  deleteProduct
};