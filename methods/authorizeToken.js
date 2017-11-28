'use strict';

import AuthPolicy from './../objects/AuthPolicy';

const authorizeToken = async (event, principalId) => {
  var tmp = event.methodArn.split(':'),
      apiGatewayArnTmp = tmp[5].split('/'),
      awsAccountId = tmp[4],
      apiOptions = {
        region: tmp[3],
        restApiId: apiGatewayArnTmp[0],
        stage: apiGatewayArnTmp[1]
      },
      method = apiGatewayArnTmp[2],
      resource = '/'; // root resource
  
  if (apiGatewayArnTmp[3]) {
    resource += apiGatewayArnTmp.slice(3, apiGatewayArnTmp.length).join('/');
  }
  
  var policy = new AuthPolicy(principalId, awsAccountId, apiOptions);
  
  if(event.authorizationToken.toString() === process.env.API_TOKEN.toString()){
    policy.allowAllMethods();
  } else {
    policy.denyAllMethods();
  }
  
  return policy.build();
};

module.exports = authorizeToken;