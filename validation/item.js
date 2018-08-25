const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateItemInput(data) {
  let errors = {};

  data.order = !isEmpty(data.order) ? data.order : '';
  data.notes = !isEmpty(data.notes) ? data.notes : '';


  if(Validator.isEmpty(data.name)) {
    errors.name = 'Please add a name';
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  }
}
