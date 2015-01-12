// +@display_name  Settings Radio


Settings.PrefTypes.add('select', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || null;
		var storedValue = Settings.get(data.name);
		var currentValue = storedValue || defaultValue;
		var options = [];
		
		for(var optionName in data.options){
			options.push({
				type: 'option',
				innerHTML: data.options[optionName],
				attributes: {
					value: optionName,
					selected: (currentValue && currentValue == optionName ? true : null)
				}
			});
		}
		
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: {
				type: 'select',
				className: 'form-control pref',
				innerHTML: options,
				style: data.style,
				attributes: {
					'name': data.name,
					'data-jmod-settings-pref': data.name,
					'data-jmod-settings-pref-default': data['default'] || null,
					'data-jmod-settings-pref-type': 'select'
				},
				EventListeners: {
					change: function(e){
						Settings.PrefTypes.onChange(e.target.getAttribute('name'), e.target.value);
					}
				}
			}
		};
		
		if(PROPDEFINED(data,'tooltip') && (PROPDEFINED(data.tooltip,'innerHTML') || PROPDEFINED(data.tooltip,'text'))){
			opts.innerHTML = setTooltipProperties(opts.innerHTML, data.tooltip);
		}
		
		return opts;
	},
	getValue: function(prefEl, data){
		return prefEl.options[prefEl.selectedIndex].value;
	},
	setValue: function(prefEl, data, value){
		for (var i = 0; i < prefEl.options.length; i++) {
			if(prefEl.options[i].value == value){
				prefEl.selectedIndex = i;
				return true;
			}
		}
		return false;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});
