/**
 * Created by Adrian on 5/30/2016.
 */
'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();
var config = require('../../config/environments/test');

describe('Contact model', function() {
    var mongoose,
        contactData = require('../fixtures/contact'),
        Contact;

    before(function(done) {
        mongoose = require('../../config/mongoose').init();
        Contact = require('../../app/models/contact');
        done();
    });

    after(function(done) {
        Contact.remove({}).exec((err) => {
            if (err) throw err;

            mongoose.connection.close(() => {
                setTimeout(function() { done();}, 1000);
            })
        })
    });

    it('should create a contact', done => {
        Contact.create(contactData.newData, (err, contact) => {
            if (err) throw err;

            should.exist(contact);
            contact.email.should.equal(contactData.newData.email);
            contact.name.should.equal(contactData.newData.name);
            contact.city.should.equal(contactData.newData.city);
            contact.phone.should.equal(contactData.newData.phone);
            contact.company.should.equal(contactData.newData.company);
            contact.user.toString().should.equal(contactData.newData.user.toString());
            should.exist(contact.createdAt);
            should.exist(contact._id);

            done();
        })
    });

    it('should update a contact\'s data', done => {
        Contact.findOne(contactData.updateCriteria, (err, contact) => {
            if (err) throw err;

            for (var key in contactData.updateData) {
                contact[key] = contactData.updateData[key];
            }

            contact.save((err, cData) => {
                if (err) throw err;

                should.exist(contact);
                contact.name.should.equal(contactData.updateData.name);
                contact.company.should.equal(contactData.updateData.company);
                contact.email.should.equal(contact.email);
                contact.city.should.equal(contact.city);
                contact.phone.should.equal(contact.phone);
                contact.user.toString().should.equal(contact.user.toString());
                should.exist(contact.updatedAt);

                done();
            });
        });
    })
})