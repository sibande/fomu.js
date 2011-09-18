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


/**
 * Required
 */
function Required(message) {
    this.message = message;
}
Required.prototype.invoke = function(form, field) {
    if ( ! field.data) {
	if (this.message == null) {
	    this.message = 'This field is required.';
	}
	throw new ValidationError(this.message);
    }
}

/**
 * Length validation
 */
function Length(min, max, message) {
    if (min == null) { min = -1; }
    if (max == null) { max = -1; }
    this.min = min;
    this.max = max;
    this.message = message;
}

Length.prototype.invoke = function(form, field) {
    var l = field.data ? field.data.length : 0;
    console.log(l);
    console.log(this.min);
    if ((l < this.min) || ((this.max != -1) && (l > this.max))) {
	if (this.message == null) {
	    if (this.max == -1) {
		this.message = 'Field must be at least ' + this.min + 
		    ' characters long.';
	    } else if (this.min == -1) {
		this.message = 'Field cannot be longer than ' + this.max + 
		    ' characters.';
	    } else {
		this.message = 'Field must be between ' + this.min + 
		    ' and ' + this.max + ' characters long.';
	    }
	}
	throw new ValidationError(this.message);
    }
}

/**
 * Number range validation
 */
function NumberRange(min, max, message) {
    this.min = min;
    this.max = max;
    this.message = message;
}

NumberRange.prototype.invoke = function(form, field) {
    data = field.data
}


/**
 * Fields
 */
function Field(validators) {
    this.errors = [];
    this.data = null;
    this.raw_data = null;
    this.name = null;
    this.validators = validators;
}
/**
 * Process field data
 */
Field.prototype.process = function(formdata) {
    try {
	if (this.name in formdata) {
	    alert(formdata[this.name]);
	}
    } catch (error) {
	
    }
}
/**
 * Validate field
 */
Field.prototype.validate = function(form) {
    for (validator in this.validators) {
	try {
	    this.validators[validator].invoke(form, this);
	} catch (error) {
	    console.log(error);
	    this.errors.push(error.message);
	}
    }
}


/**
 * Text field
 */
function TextField(validators) {
    this.widget = 'TextField Widget';
    Field.call(this, validators);
}
TextField.prototype = new Field();


/**
 * Fomu
 */
function Fomu() {
    /**
     * Fields list
     */
    this.fields = [];
    /**
     * Error list
     */
    this.errors = [];
    // Creating a list of defined "Fields"
    for (property in this) {
	if (this[property] instanceof Field) {
	    this.fields[property] = this[property];
	    this.fields[property].process(property);
	    console.log(this);
	}
    }
    /**
     * Validate defined fields
     */
    this.validate = function() {
	for (field in this.fields) {
	    this.fields[field].validate(this);
	}
    }
}
