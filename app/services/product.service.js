/**
 * Created by Adrian on 6/6/2016.
 */
'use strict';
const DEFAULT_LIMIT = 50;
const DEFAULT_SKIP = 0;

const _ = require('lodash');
const ProductModel = require('../models/product');

class Product {
    constructor(opts) {

    }

    addProduct(data, callback) {
        let product = new ProductModel(data);

        product.save((err, prod) => {
            callback(err, prod);
        });

    }

    updateProduct(sku, data, callback) {
        this.findProductBySku(sku, (err, product) => {
            if (err) {
                callback(err);
            } else if (product) {
                if (data.details) {
                    _.merge(product.details, data.details);
                }
                if (data.price) {
                    _.merge(product.price, data.price);
                }
                _.merge(product, data);
                product.save((err, product) => callback(err, product));
            } else {
                callback(new Error('failed to find product'));
            }
        });
    }

    findProductBySku(sku, callback) {
        ProductModel.findOne({sku: sku}, (err, product) => {
            callback(err, product);
        });
    }


    /**
     * 1. get(callbck)
     * 2. get(query, callback)
     * 3. get(query, limit || 50, skip || 0, callback)
     */
    getAllProducts(query, limit, skip, callback) {
        if ([1,2,4].indexOf(arguments.length) < 0) {
            callback(new Error('Invalid number of arguments supplied.'))
        }

        if (typeof query == 'function') {
            callback = query;
            query = {};
        }

        if (typeof limit == 'function') {
            callback = limit;
            limit = DEFAULT_LIMIT;
            skip = DEFAULT_SKIP;
        }

        ProductModel.find(query).skip(skip).limit(limit).exec(callback);
    }

    deleteProduct(sku, callback) {
        this.findProductBySku(sku, (err, product) => {
            if (err) {
                callback(err);
            } else if (product) {
                product.remove((err, product) => callback(err, product));
            } else {
                callback(new Error('failed to find product'));
            }
        });
    }
}

module.exports = Product;