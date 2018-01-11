# Installation
1. `npm install --save npm-auth0-authorizer`

2. Ensure the following environment variables are defined within your project:
- AUTH0_DOMAIN (example: https://yourwebsite.auth0.com/)
- AUTH0_AUDIENCE (The unique identifier of the target API you want to access.)
- AUTH0_ALGORITHM (default: RS256)

# Usage

- handler.js

```javascript
import auth0Authorizer from 'npm-auth0-authorizer/methods/auth0Authorizer';

module.exports.auth0Authorizer = function(event, context, callback){
  auth0Authorizer(event).then(success => {
    return callback(null, success);
  }).catch(err => {
    return callback(err);
  });
};
```

- serverless.yml

```yaml
functions:
  auth0Authorizer:
    handler: handler.auth0Authorizer
  lambdaYouWishToProtect:
    handler: handler.test
    events:
      - http:
          path: protect-me
          method: get
          integration: lambda
          authorizer:
            name: auth0Authorizer
            resultTtlInSeconds: 0
            identitySource: method.request.header.Authorization
```