/**
 * Created by Adrian on 6/1/2016.
 */
'use strict';

process.env.NODE_ENV = 'test';

var http = require('http');
var request = require('request');
var chai = require('chai');
var should = chai.should();
var config = require('../../config/environments/test');
var userFixture = require('../fixtures/user');
var productFixture = require('../fixtures/product');

describe('Product API', function() {
    var mongoose;
    var app;
    var appServer;
    var config;
    var baseUrl;
    var Product;
    var User;


    before(function(done) {
        app = require('../../server');
        config = app.get('config');
        baseUrl = config.baseUrl;
        appServer = http.createServer(app);

        appServer.on('listening', function() {
            mongoose = app.get('mongoose');
            User = mongoose.model('User');
            User.create(userFixture, function(err, user) {
                if (err) throw err;
                done();
            });
        });
        appServer.listen(config.port);
    });

    after(function(done) {
        appServer.on('close', function() {
            setTimeout(function() { done(); }, 1000);
        });

        User.remove({}).exec(function(err) {
            if (err) throw err;

            mongoose.connection.close(function() {
                appServer.close();
            });
        });
    });

    beforeEach(function(done) {
        request({
            method: 'POST',
            url: baseUrl + '/auth/signin',
            form: {
                'email': userFixture.email,
                'password': 'user_password'
            },
            json:true,
            jar: true
        }, function(err, res, body) {
            if (err) throw err;
        });

        done();
    });

    it('should create a product', function(done){
        request({
            method: 'POST',
            url: baseUrl + '/api/products',
            form: productFixture.newData,
            json:true,
            jar: true
        }, function(err, res, body) {
            if (err) throw err;

            res.statusCode.should.equal(200);

            should.exist(body.user);
            done();
        });
    });
});