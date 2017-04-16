// +@display_name  Settings Radio

Settings.PrefTypes.add('checkbox', {
	multiValue: true,
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || storedValue === "" ? storedValue : defaultValue;
		if(typeof currentValue !== "object")
			currentValue = currentValue.split(',');
		var options = [];
		
		//for(var i = 0; i < data.options.length; i++){
		for(var optionName in data.options){
			var tmpOption = {
				type: 'label',
				className: 'checkbox-inline',
				innerHTML: [
					{
						type: 'input',
						className: 'checkbox',
						attributes: {
							name: data.name + '-o',
							type: 'checkbox',
							value: optionName
						},
						checked: (currentValue.indexOf(optionName) != -1 ? true : false),
						EventListeners: {
							CheckboxStateChange: function(e){
								var name = e.target.parentElement.parentElement.getAttribute('name');
								var value = Settings.PrefTypes.getValueByName(name);
								Settings.PrefTypes.onChange(name, value);
							}
						}
					},
					{
						type: 'span',
						innerHTML: data.options[optionName].label,
						attributes: {}
					}
				],
				attributes: {
				}
			};
			
			if(PROPDEFINED(data.options[optionName],'tooltip') && (PROPDEFINED(data.options[optionName].tooltip,'innerHTML') || PROPDEFINED(data.options[optionName].tooltip,'text'))){
				tmpOption.innerHTML[1] = setTooltipProperties(tmpOption.innerHTML[1], data.options[optionName].tooltip);
			}
			
			options.push(tmpOption)
			
		}
		
		var opts = {
			type: 'div',
			className: 'form-group pref-container',
			innerHTML: options,
			attributes: {
				name: data.name
			},
		};
		
		/*
		if( PROPTREEDEFINED(data,'tooltip','innerHTML') || PROPTREEDEFINED(data,'tooltip','text') ){
			opts.innerHTML = setTooltipProperties(opts.innerHTML, data.tooltip);
		}
		*/
		
		return opts;
	},
	getValue: function(prefEl, data){
		var r = [];
		var prefs = jMod.$$('input:checked', prefEl);
		for(var i = 0; i < prefs.length; i++)
			r.push(prefs[i].value);
		return r.join(',');
	},
	setValue: function(prefEl, data, value){
		var valueArr = value.split(',');
		for(var i = 0; i < prefEl.options.length; i++){
			if(valueArr.indexOf(getAttribute(prefEl.options[i], 'name')) != -1)
				prefEl.options[i].checked = true;
			else
				prefEl.options[i].checked = false;
		}
		return true;
	},
	enable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			if(prefs[i].hasAttribute('disabled'))
				prefs[i].removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		var prefs = jMod.$$('input', prefEl);
		for(var i = 0; i < prefs.length; i++)
			prefs[i].setAttribute('disabled', 'disabled');
	}
});
