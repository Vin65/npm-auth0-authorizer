'use strict';

import utilities from './../../lib/utilities';

var authorization = {
  getAccessToken: function (audience) {
    let auth0Audience = process.env.AUTH0_AUDIENCE;
    if(typeof audience !== 'undefined'){
      auth0Audience = audience;
    }
    let options = {
      method: 'POST',
      url: `${process.env.AUTH0_DOMAIN}oauth/token`,
      headers: { 'content-type': 'application/json' },
      body: `{
        "client_id": "${process.env.AUTH0_CLIENT_ID}",
        "client_secret": "${process.env.AUTH0_CLIENT_SECRET}",
        "audience": "${auth0Audience}",
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