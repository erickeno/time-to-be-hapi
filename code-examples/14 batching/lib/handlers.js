'use strict';
const Boom = require('boom');
const Places = require('./places.json');
const Users = require('./users.json');


// -- places handlers

const getPlace = function(request, reply) {

    let place = getItemByName( Places, request.params.id )
    if (!place) {
        reply(Boom.notFound('could not find place'));
    } else {
        reply(place).type('application/json').code(200)
    }
}


const getPlaces = function(request, reply) {
    reply(Places).type('application/json').code(200)
}


// -- user handlers

const getUser = function(request, reply) {

    let user = getItemByName( Users, request.params.id )
    if (!user) {
        reply(Boom.notFound('could not find user'));
    } else {
        reply(user).type('application/json').code(200)
    }
}

const getUsers = function(request, reply) {
    reply(Users).type('application/json').code(200)
}



const getItemByName = function(obj, id) {

    let i = obj.items.length;
    let item = null;
    while (i--) {
        if(obj.items[i].properties.id === id){
            item = obj.items[i].properties;
            break;
        }
    }
    return item;
}



exports.getPlaces = getPlaces;
exports.getPlace = getPlace;
exports.getUsers = getUsers;
exports.getUser = getUser;


