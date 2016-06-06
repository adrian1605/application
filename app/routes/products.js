/**
 * Created by Adrian on 6/1/2016.
 */
'use strict';

const express = require('express');
const router = express.Router();
const productCtrl = require('../controllers/product');
const auth = require('../middlewares/authentication');
const response = require('../helpers/response');

router.post('/products', auth.ensured, productCtrl.create, response.toJSON('product', 201));
router.get('/products', auth.ensured, productCtrl.getAll, response.toJSON('products'));
router.get('/products/:productId', auth.ensured, productCtrl.findById, response.toJSON('product'));
router.put('/products/:productId', auth.ensured, productCtrl.findById, productCtrl.update, response.toJSON('product'));
router.delete('/products/:productId', auth.ensured, productCtrl.findById, productCtrl.delete);

module.exports = router;