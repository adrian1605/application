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

/**
 *  Module exports
 */
module.exports.findById = findProductById;
module.exports.getAll = getAllProducts;
module.exports.create = createProduct;
module.exports.update = updateProduct;
module.exports.delete = deleteProduct;


function findProductById(req, res, next) {
    if (!ObjectId.isValid(req.params.productId)) {
        return res.status(404).json({message: '404 not found'});
    }

    Product.findById(req.params.productId, (err, product) => {
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
    Product.find((err, products) => {
        if (err) {
            return next(err);
        }

        req.resources.products = products;
        next();
    });
}

function createProduct(req, res, next) {
    let userId = req.user._id;
    let product = new Product(Object.assign({user: userId}, req.body));

    product.save((err, newProduct) => {
        if (err) {
            return next(err);
        }

        req.resources.product = newProduct;
        next();
    })
}

function updateProduct(req, res, next) {
    let product = req.resources.product;

    console.log('PROD: ', product);

    _.merge(product, req.body);

    console.log('PROD AFTER ASSIGN', product);

    product.save((err, updatedProduct) => {
        if (err) {
            return next(err);
        }

        req.resources.product = updatedProduct;
        next();
    })
}

function deleteProduct(req, res, next) {
    req.resources.product.remove(err => {
        if (err) {
            return next(err);
        }

        res.status(204).json();
    });
}