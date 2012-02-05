/**
 * Fomu - Good JavaScript Forms
 */

/**
 * Validation error
 */
function ValidationError(message) {
    this.name = 'ValidationError';
    this.message = message;
}
ValidationError.prototype = new Error();

function StopValidation(message) {
    this.name = 'StopValidation';
    this.message = message;
}
StopValidation.prototype = new Error();

function ValueError(message) {
    this.name = 'StopValidation';
    this.message = message;
}
ValueError.prototype = new Error();

/**
 * Fomu
 */
function Fomu(formdata) {

    this.fields = {};
    this.formdata = formdata;

    for (property in this) {
	if (this[property] instanceof Field) {
	    this.fields[property] = this[property];
	    this.fields[property].bind(property);
	    this.fields[property].process(formdata);
	}
    }

    this.validates = function() {
	var success = true;
	for (field in this.fields) {
	    if ( ! this.fields[field].validate(this)) {
		success = false;
	    }
	}
	return success;
    }

    this.errors = function() {
	var _errors = {}

	for (field in this.fields) {
	    if (this.fields[field].errors) {
		_errors[field] = this.fields[field].errors;
	    }
	}
	return _errors
    }
}
