const config = require('config');

module.exports = function () {
    if(!config.get('jwtKey')){
        throw new Error('FATAL ERROR: jwt p key not defined');
      }  
};