/**
 * Created by Adrian on 6/1/2016.
 */
'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const ObjectId = mongoose.Types.ObjectId;
const productService = require('../services/product.service');

/**
 *  Module exports
 */
module.exports.findBySku = findProductBySku;
module.exports.getAll = getAllProducts;
module.exports.create = createProduct;
module.exports.update = updateProduct;
module.exports.delete = deleteProduct;


function findProductBySku(req, res, next) {
    productService.findProductBySku(req.params.productSku, (err, product) => {
        if (err) {
            next(err);
        } else if (product) {
            req.resources.product = product;
            next();
        } else {
            next(new Error('failed to find product'));
        }
    })
}

function getAllProducts(req, res, next) {
    productService.getAllProducts((err, products) => {
        if (err) {
            return next(err);
        }

        req.resources.products = products;
        next();
    });
}

function createProduct(req, res, next) {
    let userId = req.user._id;
    let productData = Object.assign({user: userId}, req.body);

    productService.addProduct(productData, (err, newProduct) => {
        if (err) {
            return next(err);
        }

        req.resources.product = newProduct;
        next();
    })
}

function updateProduct(req, res, next) {
    productService.updateProduct(req.params.productSku, (err, updatedProduct) => {
        if (err) {
            return next(err);
        }

        req.resources.product = updatedProduct;
        next();
    })
}

function deleteProduct(req, res, next) {
    productService.deleteProduct(req.params.productSku, err => {
        if (err) {
            return next(err);
        }

        res.status(204).json();
    });
}