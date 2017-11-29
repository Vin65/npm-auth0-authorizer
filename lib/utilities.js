'use strict';

const request = require('request-promise');

var utilities = {
	isString: function(obj) {
    return (typeof obj === 'string' || obj instanceof String);
  },
  parseJSON: function(string) {
    return this.isString(string) ? JSON.parse(string) : string;
  },
  httpRequest: function(options) {
    return request(options).then(response => {
      return response;
    }).catch(err => {
      console.error(err.body);
      return err;
    });
  }
}

module.exports = utilities;