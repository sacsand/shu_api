var validator = require('node-validator');

module.exports = {

  
  validateUser: function(){

      var checkUser = validator.isObject()
        .withRequired('name', validator.isString())
        .withRequired('password', validator.isString())
        .withOptional('admin', validator.isString());


      return checkUser;
  }





}
