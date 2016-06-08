/**
 * Created by Adrian on 6/6/2016.
 */
'use strict';

process.env.NODE_ENV = 'test';

var http = require('http');
var chai = require('chai');
var should = chai.should();
var expect = chai.expect;
var config = require('../../config/environments/test');
var productFixture = require('../fixtures/product');
var ProductService = require('../../app/services/product.service');

describe('Product Service', function() {
    var mongoose;
    var app;
    var appServer;
    var config;
    var Product;
    var ProductModel;

    before(function (done) {
        mongoose = require('../../config/mongoose').init();
        ProductModel = require('../../app/models/product');

        done();
    });

    after(function (done) {
        ProductModel.remove({}).exec(function (err) {
            if (err) throw err;

            mongoose.connection.close(function () {
                setTimeout(function() { done(); }, 1000)
            });
        });
    });

    it('should create a product', done => {
        var prodData = productFixture.newData;
        Product = new ProductService();


        Product.addProduct(prodData, (err, prod) => {
            if (err) throw err;

            should.exist(prod);
            should.exist(prod.sku);
            should.exist(prod._id);

            prod.category.should.equal(prodData.category);
            prod.active.should.equal(prodData.active);
            prod.price.should.be.an('object');
            expect(prod.price).to.have.a.property('amount');
            expect(prod.price).to.have.a.property('currency');
            expect(prod.price).to.have.a.property('factor');
            prod.details.should.be.an('object');

            done();
        });
    });

    it('should find a product by sku', done => {
        Product = new ProductService();

        Product.findProductBySku('asus-f550j', (err, prod) => {
            if (err) throw err;

            should.exist(prod);

            done();
        });
    });

    it('should update a product', done => {
        var prodData = productFixture.updateData;
        Product = new ProductService();

        Product.updateProduct('asus-f550j', prodData, (err, prod) => {
            if (err) throw err;

            should.exist(prod);

            /**
             * TODO: check chai docs for deep inclusion of something
             * NOT SURE IF DEEP EQUALS <- returned product may have more properties
             * for money and details
             */
            prod.active.should.equal(prodData.active);
            prod.price.should.have.property('amount').equal(prodData.price.amount);
            prod.price.should.have.property('factor').equal(prodData.price.factor);

            done();
        });
    });

    it('should find updated product by sku', data => {
        var prodData = productFixture.updateData;
        Product = new ProductService();

        Product.findProductBySku('asus-f550j', prodData, (err, prod) => {
            if (err) throw err;

            should.exist(prod);

            /**
             * TODO: check chai docs for deep inclusion of something
             * NOT SURE IF DEEP EQUALS <- returned product may have more properties
             * for money and details
             */
            prod.category.should.equal(prodData.category);
            prod.active.should.equal(prodData.active);
            expect(prod.price).to.deep.equal(prodData.price);
            expect(prod.details).to.deep.equal(prodData.details);

            done();
        });
    });


    it('should find a limited no. of products', done => {
        var limit = 3;
        Product = new ProductService();

        Product.getAllProducts({sku: 'asus-f550j'}, limit, 0, (err, data) => {
            if (err) throw err;

            should.exist(data);
            data.should.be.an('array');
            expect(data).to.have.length.below(limit);
            done();
        });
    });

    it('should find all products', done => {
        Product = new ProductService();

        Product.getAllProducts((err, data) => {
            if (err) throw err;

            should.exist(data);
            data.should.be.an('array');
            done();
        });
    });

    it('should delete a product', done => {
        Product = new ProductService();

        Product.deleteProduct('asus-f550j', (err, data) => {
            if (err) throw err;

            done();
        });
    });

    it ('should not find anything after deletion', done => {
        Product = new ProductService();

        Product.findProductBySku('asus-f550j', (err, prod) => {
            if (err) throw err;

            should.not.exist(prod);
            done();
        });
    });
});