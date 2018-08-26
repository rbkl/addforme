const express = require ('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const Pusher = require('pusher');

// Get keys
require('npm/node_modules/dotenv').config();

// New Pusher
const pusher = new Pusher({
   appId: '585064',
   key: '42885eae3e686bd9dac2',
   secret: process.env.APP_SECRET,
   cluster: 'us2',
   encrypted: true
 });

// Get Post Schema
const List = require('../../models/List');

// Get Profile Schema
// const Profile = require('../../models/Profile');

// Load validations
const validateListInput = require('../../validation/list')
const validateItemInput = require('../../validation/item')

// @route   GET api/list/test
// @desc    Tests posts routes
// @access  Public
router.get('/test', (req, res) => res.json({msg: "Lists Works"}));

// @route   GET api/list
// @desc    Get all lists
// @access  Public
router.get('/all', (req, res) => {
  List.find()
  .sort({ date: -1})
  .then(lists => res.json(lists))
  .catch(err => res.status(404).json({nolistfound: 'No lists found'}));
});

// @route   GET api/lists/:id
// @desc    Get list by id
// @access  Public
router.get('/:list_id', (req, res) => {
  List.findById(req.params.list_id)
  .then(list => res.json(list))
  .catch(err => res.status(404).json({nolistfound: 'No list found with that id.'}));
});


// @route   POST api/lists
// @desc    Create list
// @access  Public
router.post('/', (req, res) => {
  const { errors, isValid } = validateListInput(req.body);

  // Check validation
  if(!isValid) {
    // If any errors, send 400 with errors
    return res.status(400).json(errors);
  }

  // Get fields
  const listFields = {};
  if(req.body.title) listFields.title = req.body.title;
  if(req.body.link) listFields.link = req.body.link;
  if(req.body.instructions) listFields.instructions = req.body.instructions;
  if(req.body.items) listFields.items = req.body.items;

  // Save list
  new List(listFields).save().then(list => res.json(list));
});



// @route   POST api/lists/:list_id
// @desc    Edit list by list ID
// @access  Public

router.post('/:list_id', (req, res) => {

  const { errors, isValid } = validateListInput(req.body);

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 Status
    return res.status(400).json(errors)
  }

  // Get fields
  const listFields = {
  };

  const unsetFields = {
  };

  if(req.body.title) {
    listFields.title = req.body.title;
  } else {
    unsetFields.title = req.body.title;
  }

  if(req.body.link) {
    listFields.link = req.body.link;
  } else {
    unsetFields.link = req.body.link;
  }

  if(req.body.instructions) {
    listFields.instructions = req.body.instructions;
  } else {
    unsetFields.instructions = req.body.instructions;
  }


  // Update the list with the fields

  List.findById(req.params.list_id)
  .then(list => {
    if(list && Object.keys(unsetFields).length === 0) {
      // Update
      List.findOneAndUpdate(
        { _id: list.id },
        { $set: listFields },
        { new: true }
      )
      .then(list => res.json(list));
    } else if (list && Object.keys(unsetFields).length > 0) {
      // Update
      List.findOneAndUpdate(
        { _id: list.id },
        {
          $set: listFields,
          $unset: unsetFields,
         },
        { new: true }
      )
      .then(list => res.json(list));
    }
  })
  .catch(err => res.status(404).json({nolistfound: 'No list found with that id.'}));
});




// @route   DELETE api/list/:list_id
// @desc    Delete list by id
// @access  Private
router.delete('/:list_id', passport.authenticate('jwt', { session: false }), (req, res) => {
  List.findById(req.params.list_id)
  .then(list => {
    if (list.user.toString() !== req.user.id) {
      return res.status(401).json({notauthorized: 'User not authorized'});
    } else {
      list.remove().then(() => res.json({success: true}));
    }
  })
  .catch(err => res.status(404).json({nolistfound: 'No list found'}));
});


// @route   POST api/lists/:list_id/add
// @desc    Add item to list
// @access  Public
router.post('/:list_id/add', (req, res) => {

  const list_id = req.params.list_id;

  const newItem = {
    name: req.body.name,
    order: req.body.order,
    notes: req.body.notes,
  }

  const { errors, isValid } = validateItemInput(req.body);

  // Check Validation
  if(!isValid) {
    // Return any errors with 400 Status
    return res.status(400).json(errors)
  }

  List.findById(req.params.list_id)
  .then(list => {
    // Add to exp array
    list.items.push(newItem);

    // Pusher triggers
    pusher.trigger(list_id, 'added-item', newItem);

    list.save().then(list => res.json(list))
    .catch(err => res.status(404).json({addlist: 'Issue adding to the list'}));
  })
  .catch(err => res.status(404).json({nolistfound: 'No list found'}));
});

// @route   POST api/lists/:list_id
// @desc    Update list headers
// @access  Public
// router.post('/:list_id', (req, res) => {
//
//
//   List.findOne({ list: req.params.list_id })
//     .then(list => {
//       if(list) {
//         const listFields = {
//         };
//         listFields.title = (req.body.title ? req.body.title : null);
//         listFields.link = (req.body.link ? req.body.link : null);
//         listFields.instructions = (req.body.instructions ? req.body.instructions : null);
//         listFields.items = (req.body.items ? req.body.items : list.items);
//
//
//         // Update
//         List.findByIdAndUpdate(req.params.list_id,
//           { $set: listFields },
//           { new: true },
//         )
//         .then(list => res.json(list))
//       }
//     })
//     .catch(err => res.status(404).json({nolistfound: 'No list found'}));
// });


// @route   POST api/lists/:list_id/:item_id
// @desc    Edit or update item in list
// @access  Public
router.post('/:list_id/:item_id', (req, res) => {

  const itemData = {
  };

  if(req.body.name) itemData.name = req.body.name;
  if(req.body.order) itemData.order = req.body.order;
  if(req.body.notes) itemData.notes = req.body.notes;



  List.findById(req.params.list_id)
  .then(list => {

    // Find the item
    const removeIndex =
    list.items
    .map(item => item.id)
    .indexOf(req.params.item_id)

    // Splice item out of array
    list.items.splice(removeIndex, 1, itemData);

    // Save
    list.save()
    .then(list => res.json(list))
    .catch(err => res.status(404).json({addlist: 'Issue adding to the list'}));
  })
  .catch(err => res.status(404).json({nolistfound: 'No list found'}));
});


// @route   DELETE api/lists/:list_id/:item_id
// @desc    Delete item in list
// @access  Public
router.delete('/:list_id/:item_id', (req, res) => {

  List.findById(req.params.list_id)
  .then(list => {

    // Find the item
    const removeIndex =
    list.items
    .map(item => item.id)
    .indexOf(req.params.item_id)

    // Splice item out of array
    list.items.splice(removeIndex, 1);

    // Save
    list.save()
    .then(list => res.json(list));
  })
  .catch(err => res.status(404).json({nolistfound: 'No list found'}));
});


module.exports = router;
