/**
 * Created by Adrian on 5/25/2016.
 */
'use strict';

/**
 * /auth/register
 *  { email
 *    password
 *  }
 *
 * /auth/signin
 *  { email
 *    password
 *  }
 *
 *  -------------------------------------------------
 *  Model for contacts + CRUD on contacts
 *  MODEL:
 *      - name
 *      - email
 *      - city
 *      - phone
 *      - company
 *      - createdAt
 *      - user -> Ref "User"
 *
 *  - post   /api/contacts {}     -> 201 contactObj
 *  - get    /api/contacts        -> 200 [{},{}]
 *  - get    /api/contacts/:id    -> 200 {}
 *  - put    /api/contacts/:id {} -> 200 {}
 *  - delete /api/contacts/:id    -> ghivsajbln;
 *
 *
 *  --------------------------------------------------
 *  router.get('/contacts', auth_ensured(), ... )
 */