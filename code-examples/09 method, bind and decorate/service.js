'use strict';

let service = function(options) {
  this.url = options.url;
  this.password = options.password;
  this.username = options.username;
  this.state = 'disconnected';
  this.connection();
}

service.prototype.connection = function(){
    // use object properties to get connection
    this.state = 'connected';
    return {state: this.state}
}


module.exports = service;