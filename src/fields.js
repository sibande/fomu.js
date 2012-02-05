/**
 * Fields
 */
function Field(validators, filters) {
    this.errors = [];
    this.data = null;
    this.raw_data = null;
    this.name = null;
    this.validators = validators;
    this.filters = filters;
    this.description = null;
    this.raw_data = null;
}

Field.prototype.bind = function(name) {
    this.name = name;
}
/**
 * Process field data
 */
Field.prototype.process = function(formdata) {

    this.process_errors = [];
    if (formdata) {
	try {
	    if (this.name in formdata) {
		// !!! get all values from fields with specified name
		this.raw_data = formdata[this.name];
	    } else {
		this.raw_data = null;
	    }

	    this.process_data(this.raw_data);
	} catch (error) {
	    this.process_errors.push(error.message)
	}
    }
}

Field.prototype.process_data = function(value) {
    this.data = value;
}

Field.prototype.process_formdata = function(valuelist) {
    if (valuelist) {
	this.data = valuelist[0];
    }
}
Field.prototype.pre_validate = function(form) {}

/**
 * Validate field
 */
Field.prototype.validate = function(form) {

    this.errors = this.process_errors;

    stop_validation = false;

    // preValidate
    try {
    	this.pre_validate(form);
    } catch (error) {
    	if (error instanceof StopValidation) {
    	    this.errors.push(error.message);
    	    stop_validation = true;
    	} else if (error instanceof ValidationError) {
    	    this.errors.push(error.message);
    	}
    }

    if ( ! stop_validation) {
    	for (validator in this.validators) {
    	    try {
		this.validators[validator].invoke(form, this);
    	    } catch (error) {
    		if (error instanceof StopValidation) {
    		    stop_validation = true;
    		    break;
    		} else if (error instanceof ValidationError) {
    		    this.errors.push(error.message);
    		}
    	    }
    	}
    }
    try {
    	this.post_validate(form, stop_validation);
    } catch (error) {
    	if (error instanceof ValueError) {
    	    this.errors.append(error.message);
    	}
    }

    // console.log(this.errors.length == 0);
    
    return (this.errors.length == 0)
}

Field.prototype.post_validate = function(form) {}

/**
 * Text field
 */
function TextField(validators) {
    this.widget = 'TextField Widget';
    Field.call(this, validators);
}
TextField.prototype = new Field();

