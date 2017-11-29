'use strict';

import AuthPolicy from './../objects/AuthPolicy';

const jwksClient = require('jwks-rsa');
const jwt = require('jsonwebtoken');

const auth0Authorizer = async (event) => {
  let client = jwksClient({
    strictSsl: true, // Default value
    jwksUri : process.env.AUTH0_DOMAIN + '.well-known/jwks.json'
  });

  let policyResources = AuthPolicy.policyResources(event);
  client.getKeys((err, key) => {
    client.getSigningKey(key[0].kid, (err, key) => {
      const signingKey = key.publicKey || key.rsaPublicKey;
      const token = event.authorizationToken.substring(7);
      
      jwt.verify(token, signingKey, { algorithms: [process.env.AUTH0_ALGORITHM] }, (err, payload) => {
        let principalId = payload ? payload.sub : 'invalidJWT';
        const policy = new AuthPolicy(principalId, policyResources.awsAccountId, policyResources.apiOptions);
        payload ? policy.allowAllMethods() : policy.denyAllMethods();
        let authResponse = policy.build();
        return authResponse;
      });
    });
  });
};

module.exports = auth0Authorizer;