// +@display_name  Settings Input

Settings.PrefTypes.add('input', {
	make: function(data){
		var text = data.description || data.name;
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: [
				{
					type: 'input',
					className: 'form-control pref',
					innerHTML: '',
					style: data.style,
					attributes: {
						value: storedValue || defaultValue,
						'name': data.name,
						'type': 'text',
						'data-jmod-settings-pref': data.name,
						'data-jmod-settings-pref-default': data['default'] || null,
					},
					EventListeners: {
						input: function(e){
							Settings.PrefTypes.onChange(e.target.getAttribute('name'), e.target.value);
						}
					}
				}
			]
		};
		
		if(PROPDEFINED(data,'tooltip') && (PROPDEFINED(data.tooltip,'innerHTML') || PROPDEFINED(data.tooltip,'text'))){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
		}
		
		if(PROPDEFINED(data, "icon")){
			opts.className += ' input-icon-right';
			var iconOpts = getIcon(data.icon);
			
			opts.innerHTML.unshift(iconOpts);
		}
		return opts;
	},
	getValue: function(prefEl, data){
		return prefEl.value;
	},
	setValue: function(prefEl, data, value){
		prefEl.value = value;
		return true;
	},
	enable: function(prefEl, data){
		if(prefEl.hasAttribute('disabled'))
			prefEl.removeAttribute('disabled');
	},
	disable: function(prefEl, data){
		prefEl.setAttribute('disabled', 'disabled');
	}
});