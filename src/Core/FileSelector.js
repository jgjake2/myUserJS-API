// +@display_name  File Selector


/**
 * Arguments for creating a new FileSelector Instance
 * @typedef {Object} jMod.FileSelector.FileSelectorArgs
 * @property {boolean} [multiple] - Allow multiple file selections
 * @property {boolean} [accept] - Sets the "accept" attribute for the input element
 * @property {boolean} [defaultValue] - Sets the "defaultValue" attribute for the input element
 * @property {jMod.Element.NewElementData} [button] - Options for button element. Cannot contain <i>object</i>.<b>type</b> or <i>object</i>.<b>EventListeners.click</b> - These options will be ignored
 * @property {function} [onChange] - Callback function to be fired when file selection changes
 */
 
/**
 * Creates a file selector button for reading/uploading local user files.<br>
 * This can be used for reading in a configuration file, or allowing users to
 * customize their experience with a local image which can be read as a URL,
 * and saved using GM_storage or localStorage
 * @class
 * @name FileSelector
 * @memberof jMod
 * @param {jMod.FileSelector.FileSelectorArgs} data - data
 */
jMod.FileSelector = function(data){
	var _this = this;
	_this.events = {
		change: []
	};
	
	// Add Events
	if(data.onChange)
		_this.events.change.push(data.onChange);
	
	// On Change handler
	_this.onChange = function(e){
		for(var i = 0; i < _this.events.change.length; i++)
			_this.events.change[i].call(this || _this || jMod, e, _this.files(), _this.value());
	};
	
	/**
	 * Trigger a click event
	 * @function click
	 * @memberof jMod.FileSelector#
	 * @param {boolean} [bubbles]
	 * @param {boolean} [cancelable]
	 */
	_this.click = function(bubbles, cancelable){
		return fireClick(_this.buttonTriggerElement, _undefined!==typeof bubbles ? bubbles : true, _undefined!==typeof cancelable ? cancelable : true);
	};
	
	/**
	 * Get the selected files
	 * @function files
	 * @memberof jMod.FileSelector#
	 */
	_this.files = function(){
		return _this.inputElement.files;
	};
	
	/**
	 * Get the current value of the input element
	 * @function value
	 * @memberof jMod.FileSelector#
	 */
	_this.value = function(){
		return _this.inputElement.value;
	};
	
	// Input Element
	var inputElementOpts = {
		type: 'input',
		attributes: {
			type: 'file',
			multiple: data.multiple ? true : false
		},
		style: {
			position: 'absolute',
			opacity: '0',
			'-ms-filter': 'progid:DXImageTransform.Microsoft.Alpha(Opacity=0)',
			filter: 'alpha(opacity=0)',
			width: '0'
		},
		EventListeners: {
			change: _this.onChange
		}
	};
	
	if(data.defaultValue)
		inputElementOpts.defaultValue = data.defaultValue;
		
	if(data.accept)
		inputElementOpts.attributes.accept = data.accept;
	
	/**
	 * The input element (styled to be hidden)
	 * @name inputElement
	 * @type {element}
	 * @memberof jMod.FileSelector#
	 */
	_this.inputElement = createNewElement(inputElementOpts);
	
	
	// Trigger Button
	var buttonTriggerElementOpts = {
		type: 'button',
		EventListeners: {
			'click': function(e){
				console.log('Button click triggered');
				var fileInput = this.previousSibling;
				fileInput.focus();
				fireClick(fileInput);
				eventCancel(e);
				return false;
			}
		}
	};
	
	if(typeof data.button == "object"){
		/*
		if(data.button.style)
			buttonTriggerElementOpts.style = data.button.style;
			
		if(data.button.innerHTML || data.button.text)
			buttonTriggerElementOpts.innerHTML = (data.button.innerHTML || data.button.text);
		*/
		if(data.button.type)
			delete data.button.type;
		if(data.button.EventListeners && data.button.EventListeners.click)
			delete data.button.EventListeners.click;
			
		buttonTriggerElementOpts = jMod.extend(true, buttonTriggerElementOpts, data.button);
	}
	
	/**
	 * The button element used to trigger the input dialog
	 * @name buttonTriggerElement
	 * @type {element}
	 * @memberof jMod.FileSelector#
	 */
	_this.buttonTriggerElement = createNewElement(buttonTriggerElementOpts);

	var formElementOpts = jMod.extend(true, data.form || {}, {
		type: 'form',
		innerHTML: [
			_this.inputElement,
			_this.buttonTriggerElement
		]
	});
	/*
	if(data.form){
		if(data.form.id)
			formElementOpts.id = data.form.id;
			
		if(data.form.name)
			formElementOpts.attributes.name = data.form.name;
	}
	*/
	
	/**
	 * Form element that acts as a wrapper
	 * @name formElement
	 * @type {element}
	 * @memberof jMod.FileSelector#
	 */
	_this.formElement = createNewElement(formElementOpts);
	
	jMod.FileSelector.FileSelectorForms.push(_this.formElement);
}
jMod.FileSelector.FileSelectorForms = [];

/**
 * Check for local file read support
 * @function FileReadSupport
 * @memberof jMod.FileSelector
 */
jMod.FileSelector.FileReadSupport = function(){
	return (window.File && window.FileReader);
}

/**
 * Check for local blob support
 * @function BlobSupport
 * @memberof jMod.FileSelector
 */
jMod.FileSelector.BlobSupport = function(){
	return (window.File && window.Blob);
}

/**
 * Reads the given file as text
 * @function ReadFileAsText
 * @memberof jMod.FileSelector
 * @param {file} file - File to read
 * @param {function} callback - Function to call when file read is complete
 * @param {function} [error_callback] - Function to call if there is an error reading the file
 * @returns {boolean} - Returns true if there is file read support and the file exists. Otherwise it returns false.
 */
jMod.FileSelector.ReadFileAsText = function(file, callback, error_callback){
	if(!jMod.FileSelector.FileReadSupport){
		if(jMod.debug) console.log('Error! No Support For File Reading!');
		return false;
	}
	var r = new FileReader();
	if(file){
		r.onload = function(e) {
			return callback.call(this || jMod, e, e.target.result, file);
		}
		
		r.onerror = function(e){
			if(jMod.debug) console.log('Error reading file', file);
			return (error_callback || callback)(e, undefined, file);
		}
		r.readAsText(file);
		return true;
	} else {
		if(jMod.debug) console.log('Error reading file', file);
		(error_callback || callback)(e, undefined, file);
	}
	return false;
}

// For Images / Image Preview
/**
 * Reads the given file and encodes the result as a base64 string
 * @function ReadFileAsURL
 * @memberof jMod.FileSelector
 * @param {file} file - File to read
 * @param {function} callback - Function call when file read is complete
 * @param {function} [error_callback] - Function to call if there is an error reading the file
 * @returns {boolean} - Returns true if there is file read support and the file exists. Otherwise it returns false.
 */
jMod.FileSelector.ReadFileAsURL = function(file, callback, error_callback){
	if(!jMod.FileSelector.FileReadSupport){
		if(jMod.debug) console.log('Error! No Support For File Reading!');
		return false;
	}
	var r = new FileReader();
	if(file){
		r.onload = function(e) {
			return callback.call(this || jMod, e, e.target.result, file);
		}
		r.onerror = function(e){
			if(jMod.debug) console.log('Error reading file', file);
			return (error_callback || callback)(e, undefined, file);
		}
		r.readAsDataURL(file);
		return true;
	} else {
		if(jMod.debug) console.log('Error reading file', file);
		(error_callback || callback)(e, undefined, file);
	}
	return false;
}

/**
 * Reads the given file and attempts to parse it as a JSON string
 * @function ReadFileAsJSON
 * @memberof jMod.FileSelector
 * @param {file} file - File to parse
 * @param {function} callback - Function call when file read is complete
 * @param {function} [error_callback] - Function to call if there is an error reading the file
 * @returns {boolean} - Returns true if there is file read support and the file exists. Otherwise it returns false.
 */
jMod.FileSelector.ReadFileAsJSON = function(file, callback, error_callback){
	return jMod.FileSelector.ReadFileAsText(file, function(e, content, _file){
		if(content && content != ''){
			try{
				return callback(e, JSON.parse(content), _file);
			}catch(err){
				if(jMod.debug) console.log('Error! Cannot parse json file!', err, _file);
				return (error_callback || callback)(e, undefined, _file);
			}
		} else {
			if(jMod.debug) console.log('Error! JSON file is empty!', _file);
			return (error_callback || callback)(e, undefined, _file);
		}
	});
}

