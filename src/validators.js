/**
 * fomu.js validations
 */


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
    data = field.data;
    if ((data == null) || ((this.min != null) && data < this.min) || ((this.max != null) && data > this.max)) {
	if (this.message != null) {
	    if (this.max == null) {
                this.message = 'Number must be greater than '+this.min+'.';
	    } else if (this.min == null) {
		this.message = 'Number must be less than '+this.max+'.';
	    } else {
		this.message = 'Number must be between '+this.min+' and '+this.max+'.';
	    }
	}
	throw new ValidationError(this.message);
    }
}


function Optional() {
    field_flags = ['optional'];
}

Optional.prototype.invoke = function(form, field) {
    if ( ! field.data) {
	throw new StopValidation();
    }
}

