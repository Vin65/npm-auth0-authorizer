import auth0Authorizer from './../../methods/auth0Authorizer';
import authorization from './../support/authorization';

const expect = require('chai').expect;

describe("Test the authorizer", function(){
  let methodArn = 'arn:aws:execute-api:random-region:random-account-id:random-api-id/development/GET/test';
  
  it('should deny access when auth token is not valid', function(done){
    let event = { 
      type: 'TOKEN',
      authorizationToken: 'Bearer test',
      methodArn: methodArn
    }

    auth0Authorizer(event).then(successMessage => {
      throw new Error('succesful response');
    }).catch(err => {
      expect(err.message).to.equal('jwt malformed');
    }).then(done, done);
  });
  
  it('should deny access when audience within token is not valid', function(done){
    authorization.getAccessToken(process.env.BAD_AUDIENCE).then(accessTokenHeader => {
      let event = {
        type: 'TOKEN',
        authorizationToken: accessTokenHeader,
        methodArn: methodArn
      }
  
      auth0Authorizer(event).then(successMessage => {
        throw new Error('succesful response');
      }).catch(err => {
        expect(err.message).to.equal('jwt audience invalid. expected: https://test.npm-authorizer.com');
      }).then(done, done);
    });
  });
  
  it('should allow access when auth token is valid', function(done){
    authorization.getAccessToken().then(accessTokenHeader => {
      let event = {
        type: 'TOKEN',
        authorizationToken: accessTokenHeader,
        methodArn: methodArn
      }

      auth0Authorizer(event).then(successMessage => {
        expect(successMessage.policyDocument.Statement[0].Effect).to.equal('Allow');
      }).catch(err => {
        throw err;
      }).then(done, done);
    });
  });
});
