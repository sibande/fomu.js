/**
 * Fields
 */
Fomu.Field = function (validators, filters) {
    this.errors = [];
    this.data = null;
    this.raw_data = null;
    this.name = null;
    this.validators = validators;
    this.filters = filters;
    this.description = null;
    this.raw_data = null;
}

Fomu.Field.prototype.bind = function(name) {
    this.name = name;
}
/**
 * Process field data
 */
Fomu.Field.prototype.process = function(formdata) {

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

Fomu.Field.prototype.process_data = function(value) {
    this.data = value;
}

Fomu.Field.prototype.process_formdata = function(valuelist) {
    if (valuelist) {
	this.data = valuelist[0];
    }
}
Fomu.Field.prototype.pre_validate = function(form) {}

/**
 * Validate field
 */
Fomu.Field.prototype.validate = function(form) {

    this.errors = this.process_errors;

    stop_validation = false;

    // preValidate
    try {
    	this.pre_validate(form);
    } catch (error) {
    	if (error instanceof Fomu.StopValidation) {
    	    this.errors.push(error.message);
    	    stop_validation = true;
    	} else if (error instanceof Fomu.ValidationError) {
    	    this.errors.push(error.message);
    	}
    }

    if ( ! stop_validation) {
    	for (validator in this.validators) {
    	    try {
		this.validators[validator].invoke(form, this);
    	    } catch (error) {
    		if (error instanceof Fomu.StopValidation) {
    		    stop_validation = true;
    		    break;
    		} else if (error instanceof Fomu.ValidationError) {
    		    this.errors.push(error.message);
    		}
    	    }
    	}
    }
    try {
    	this.post_validate(form, stop_validation);
    } catch (error) {
    	if (error instanceof Fomu.ValueError) {
    	    this.errors.append(error.message);
    	}
    }

    // console.log(this.errors.length == 0);
    
    return (this.errors.length == 0)
}

Fomu.Field.prototype.post_validate = function(form) {}

/**
 * Text field
 */
Fomu.TextField = function (validators) {
    this.widget = 'TextField Widget';
    Fomu.Field.call(this, validators);
}
Fomu.TextField.prototype = new Fomu.Field();

