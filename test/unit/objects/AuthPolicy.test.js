'use strict';

const expect = require('chai').expect;
import AuthPolicy from './../../../objects/AuthPolicy';

context("AuthPolicy", function(){
	describe("policyResources", function(){
		it("return an object containing authorization resource values", function() {
			let event = { 
				type: 'TOKEN',
				authorizationToken: '1234',
				methodArn: 'arn:aws:execute-api:random-region:random-account-id:random-api-id/test/POST/foo/bar'
			}
			
			let parsedEvent = {
				apiGatewayArnTmp: [ 'random-api-id', 'test', 'POST', 'foo', 'bar' ],
				awsAccountId: 'random-account-id',
				apiOptions:
				 { region: 'random-region',
				   restApiId: 'random-api-id',
				   stage: 'test' },
				method: 'POST',
				resource: '/foo/bar'
			}
			expect(AuthPolicy.policyResources(event)).to.deep.equal(parsedEvent)
		})
	})
})