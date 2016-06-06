/**
 * Created by Adrian on 6/1/2016.
 */
'use strict';

module.exports.createSlug = createSlug;


function createSlug(title) {
    return title
        .toLowerCase()
        .replace(/[^\w ]+/g,'')
        .replace(/ +/g,'-');
}