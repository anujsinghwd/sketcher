const isEmpty = require('./is_empty');
const validator = require('validator');

module.exports = function validateAddProductInput(data){
    let errors = {};
    
    data.desc = !isEmpty(data.desc) ? data.desc : '';
    data.name = !isEmpty(data.name) ? data.name : '';
    data.lname = !isEmpty(data.lname) ? data.lname : '';
    data.brandId = !isEmpty(data.brandId) ? data.brandId : '';
    data.brandName = !isEmpty(data.brandName) ? data.brandName : '';
    
    if(validator.isEmpty(data.desc)){
        errors.desc = 'Description field is required';
    }

    if(validator.isEmpty(data.name)){
        errors.name = 'Name field is required';
    }

    if(validator.isEmpty(data.lname)){
        errors.lname = 'LName field is required';
    }

    if(validator.isEmpty(data.brandId)){
        errors.brandId = 'Brand Id field is required';
    }

    if(validator.isEmpty(data.brandName)){
        errors.brandName = 'Brand Name field is required';
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }
};