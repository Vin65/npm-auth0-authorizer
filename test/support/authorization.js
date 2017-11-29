'use strict';

import utilities from './../../lib/utilities';

var authorization = {
	getAccessToken: function () {
		let options = {
			method: 'POST',
			url: `${process.env.AUTH0_DOMAIN}oauth/token`,
			headers: { 'content-type': 'application/json' },
			body: `{
				"client_id": "${process.env.AUTH0_CLIENT_ID}",
				"client_secret": "${process.env.AUTH0_CLIENT_SECRET}",
				"audience": "${process.env.AUTH0_AUDIENCE}",
				"grant_type":"client_credentials"
			}`
		};
		
		return utilities.httpRequest(options).then(response => {
			let parsedResponse = utilities.parseJSON(response);
			return `Bearer ${parsedResponse.access_token}`;
		});
	}
};

module.exports = authorization;