/**
 * Created by Adrian on 5/25/2016.
 */
'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ContactSchema = new Schema({
    name: {type: String},
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: {type: String},
    phone: {
        type: String
        //validate: {
        //    validator: function (v) {
        //        return /\d{3}-\d{3}-\d{4}/.test(v);
        //    },
        //    message: '{VALUE} is not a valid phone number!'
        //}
    },
    company: {type: String},
    user: {
        type: ObjectId,
        ref: "User"
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

ContactSchema.pre('save', function(next) {
    const now = new Date();
    if ( !this.createdAt ) {
        this.createdAt = now;
    }
    this.updatedAt = now;
    next();
});

module.exports = mongoose.model('Contact', ContactSchema);