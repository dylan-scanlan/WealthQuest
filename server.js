// server.js

/**
 * States:
 * 0: waiting for child to complete
 * 1: Completed awating approval
 * 
 **/



// BASE SETUP
// =============================================================================
var mongoose   = require('mongoose');
var Chore     = require('./models/chore.js');
var Routine = require('./models/routine.js');
var cors = require('cors');
var express    = require('express');        // call express
var app        = express();   // define our app using express
var bodyParser = require('body-parser');

// call the packages we need

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/App'));
app.use(cors());

var port = 8081;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router
// middleware to use for all requests

router.use(function(req, res, next) {
    // do logging
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/chore')

    // create a bear (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        var chore = new Chore();  
        chore.name = req.body.name;  
        chore.description = req.body.description;
        chore.value = req.body.value;
        chore.state = 0;
        // save the description and check for errors
        chore.save(function(err) {
            if (err)
                res.send(err);
            res.json({message: 'Successfully added'});
        });
    })
    
    .get(function(req, res) {
        Chore.find(function(err, chores) {
            if (err)
                res.send(err);
            res.json(chores);
        });
    })
    
    .delete(function(req, res) {
        console.log("Removing " + req.body.name);
        Chore.remove({
            name: req.body.name
        }, function(err, chore) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    })
    .put(function(req, res) {
        console.log("here")
        Chore.update({ name: req.body.name }, { $set: { state: req.body.state }}, function (err, newChore) {
            if (err) return handleError(err);
            res.json({message: "Updated"});
          });
    });
    
router.route('/routine')

    // create a bear (accessed at POST http://localhost:8080/api/messages)
    .post(function(req, res) {
        var routine = new Routine();  
        routine.name = req.body.name;  
        routine.description = req.body.description;
        //chore.value = req.body.value;
        // save the description and check for errors
        routine.save(function(err) {
            if (err)
                res.send(err);
            console.log(res);
            res.json({ message: 'Routine added!' });
        });
    })
    .get(function(req, res) {
        Routine.find(function(err, routines) {
            if (err)
                res.send(err);

            res.json(routines);
        });
    }).delete(function(req, res) {
        Routine.remove({
            name: req.body.name
        }, function(err, routine) {
            if (err)
                res.send(err);

            res.json({ message: 'Successfully deleted' });
        });
    });

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Server up on port: ' + port);