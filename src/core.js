/**
 * Fomu - Good JavaScript Forms
 */

var Fomu = Fomu || {}


/**
 * Validation error
 */
Fomu.ValidationError =  function (message) {
    this.name = 'ValidationError';
    this.message = message;
}
Fomu.ValidationError.prototype = new Error();

Fomu.StopValidation = function (message) {
    this.name = 'StopValidation';
    this.message = message;
}
Fomu.StopValidation.prototype = new Error();

Fomu.ValueError = function (message) {
    this.name = 'StopValidation';
    this.message = message;
}
Fomu.ValueError.prototype = new Error();

/**
 * Fomu
 */
Fomu.Fomu = function (formdata) {

    this.fields = {};
    this.formdata = formdata;

    for (property in this) {
	if (this[property] instanceof Fomu.Field) {
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

