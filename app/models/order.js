/**
 * Created by Adrian on 6/1/2016.
 */
'use strict';

const mongoose = require('mongoose');
const Money = require('./money').schema;
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
const Mixed = Schema.Types.Mixed;

const OrderSchema = new Schema({
    identifier:   { type: String },
    user:         { type: ObjectId, ref: 'User' },
    status:       { type: String, default: 'active' },
    total:        { type: Money },
    details:      { type: Mixed },
    shipping:     { type: Mixed },
    items:        { type: [
        {
            sku:      { type: String },
            qty:      { type: Number, default: 1},
            title:    { type: String },
            price:    { type: Money },
            product:  { type: ObjectId, ref: 'Product' }
        }
    ]},
    expiresAt:    { type: Date, default: null },
    updatedAt:    { type: Date, default: Date.now },
    createdAt:    { type: Date, default: Date.now }
},  {
    toObject:     { virtuals: true },
    toJSON:       { virtuals: true }
});

module.exports = mongoose.model('Order', OrderSchema);