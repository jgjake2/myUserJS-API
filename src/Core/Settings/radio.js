// +@display_name  Settings Radio


Settings.PrefTypes.add('radio', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || defaultValue;
		var options = [];
		
		//for(var i = 0; i < data.options.length; i++){
		for(var optionName in data.options){
			var tmpOption = {
				type: 'label',
				className: 'radio radio-inline',
				innerHTML: [
					{
						type: 'input',
						className: 'radiobox',
						attributes: {
							type: 'radio',
							value: optionName,
							name: data.name + '-o'
						},
						checked: (currentValue.indexOf(optionName) != -1 ? true : false),
						EventListeners: {
							RadioStateChange: function(e){
								var name = e.target.parentElement.parentElement.getAttribute('name');
								var value = Settings.PrefTypes.getValueByName(name);
								//console.log('onchange name', name, 'value', value, 'e', e);
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
					//value: optionName,
					//selected: (defaultValue && defaultValue == optionName ? true : null)
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
		
		
		return opts;
	},
	getValue: function(prefEl, data){
		return jMod.$('input:checked', prefEl).value;
	},
	setValue: function(prefEl, data, value){
		for(var i = 0; i < prefEl.options.length; i++){
			if(getAttribute(prefEl.options[i], 'name') == value)
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
