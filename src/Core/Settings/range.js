// +@display_name  Settings Range


Settings.PrefTypes.add('range', {
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
					min: parseInt(data.min || '0'),
					max: parseInt(data.max || '100'),
					step: parseInt(data.step || '1'),
					value: parseInt(storedValue || defaultValue),
					//style: {},
					attributes: {
						//defaultValue: storedValue || defaultValue,
						'name': data.name,
						'type': 'range',
						'data-jmod-settings-pref': data.name,
						'data-jmod-settings-pref-default': data['default'] || null,
					},
					EventListeners: {
						'change': function(e){
							//var textbox = e.target.previousSibling;
							var textbox = e.target.nextSibling;
							textbox.value = this.value;
						},
						'input': function(e){
							var textbox = e.target.nextSibling;
							textbox.value = this.value;
						}
					}
				},
				{
					type: 'input',
					className: 'form-control pref disabled range-value',
					innerHTMLL: '',
					//style: {},
					attributes: {
						value: storedValue || defaultValue,
						disabled: 'disabled'
					},
					EventListeners: {
						'keypress': function(e){
							console.log('keypress', e);
							//var range = e.target.nextSibling;
							//range.value = parseInt(this.value);
						}
					}
				}
			]
		};
		
		if(PROPDEFINED(data,'tooltip') && (PROPDEFINED(data.tooltip,'innerHTML') || PROPDEFINED(data.tooltip,'text'))){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
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