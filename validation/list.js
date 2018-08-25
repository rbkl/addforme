const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateListInput(data) {
  let errors = {};

  data.link = !isEmpty(data.link) ? data.link : '';
  data.instructions = !isEmpty(data.instructions) ? data.instructions : '';
  data.items = !isEmpty(data.items) ? data.items : [];

  if(!Validator.isLength(data.title, {min: 5, max: 300})) {
    errors.title = 'Title must between 5 and 300 characters.';
  }

  if(Validator.isEmpty(data.title)) {
    errors.title = 'Please add a title';
  }

  if(!Validator.isURL(data.link)) {
    errors.link = 'Not a valid URL';
  }




  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
