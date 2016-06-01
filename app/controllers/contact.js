/**
 * Created by Adrian on 5/25/2016.
 */
'use strict';

/**
 *  Module dependencies
 */
const _ = require('lodash');
const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const ObjectId = mongoose.Types.ObjectId;

/**
 *  Module exports
 */
module.exports.findById = findContactById;
module.exports.getAll = getAllContacts;
module.exports.create = createContact;
module.exports.update = updateContact;
module.exports.delete = deleteContact;


function findContactById(req, res, next) {
    if (!ObjectId.isValid(req.params.contactId)) {
        return res.status(404).json({message: '404 not found'});
    }

    Contact.findById(req.params.contactId, (err, contact) => {
        if (err) {
            next(err);
        } else if (contact) {
            req.resources.contact = contact;
            next();
        } else {
            next(new Error('failed to find contact'));
        }
    })
}

function getAllContacts(req, res, next) {
    Contact.find((err, contacts) => {
        if (err) {
            return next(err);
        }

        req.resources.contacts = contacts;
        next();
    });
}

function createContact(req, res, next) {
    let userId = req.user._id;
    let contact = new Contact(Object.assign({user: userId}, req.body));

    contact.save((err, newContact) => {
        if (err) {
            return next(err);
        }

        req.resources.contact = newContact;
        next();
    })
}

function updateContact(req, res, next) {
    let contact = req.resources.contact;
    _.assign(contact, req.body);

    contact.save((err, updatedContact) => {
        if (err) {
            return next(err);
        }

        req.resources.contact = updatedContact;
        next();
    })
}

function deleteContact(req, res, next) {
    req.resources.contact.remove(err => {
        if (err) {
            return next(err);
        }

        res.status(204).json();
    });
}