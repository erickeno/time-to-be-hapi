'use strict';
// a simple user object with getById method

const getById = function(id, callback) {

    if (id === 1) {
        callback(null, { name: 'Glenn Jones' });
    }else{
        callback('User not found please check id', null);
    }
}


exports.getById = getById;