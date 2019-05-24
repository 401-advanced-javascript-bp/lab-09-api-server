'use strict';

/**
 * @vi.js these our routes and they're corresponding functions.
 * @author Nicholas Carignon
 * @Becky Peterson
 * 
 * requires cors
 * requires dotenv
 * requires express
 * requires jest
 * requires mongodb-memory-server
 * requires mongoose
 * requires mongoose-schema-jsonschema
 * requires morgan
 * requires require-directory
 * requires supertest
 * requires swagger-ui-express
 * requires uuid

 */

/**
 * API Router Module (V1)
 * Integrates with various models through a common Interface (.get(), .post(), .put(), .delete())
 * @module src/api/v1
 */

const cwd = process.cwd();

const express = require('express');

const modelFinder = require(`${cwd}/src/middleware/model-finder.js`);

const router = express.Router();


// Evaluate the model, dynamically
router.param('model', modelFinder);



// API Routes 
/**
 * These are our 5 app routes.
 */
router.get('/api/v1/:model', handleGetAll);
router.post('/api/v1/:model', handlePost);

router.get('/api/v1/:model/:id', handleGetOne);
router.put('/api/v1/:model/:id', handlePut);
router.delete('/api/v1/:model/:id', handleDelete);

// Route Handlers
/**
 * 
 * @param {object} request the query object
 * @param {object} response the response
 * @param {function} next is a function
 */
function handleGetAll(request,response,next) {
  request.model.get()
    .then( data => {
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch( next );
}

function handleGetOne(request,response,next) {
  request.model.get(request.params.id)
    .then( result => response.status(200).json(result[0]) )
    .catch( next );
}


function handlePost(request,response,next) {
  request.model.post(request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}


function handlePut(request,response,next) {
  request.model.put(request.params.id, request.body)
    .then( result => response.status(200).json(result) )
    .catch( next );
}

function handleDelete(request,response,next) {
  request.model.delete(request.params.id)
    .then( result => response.status(200).json(result) )
    .catch( next );
}
/**
 * This exports our router module.
 */
module.exports = router;
