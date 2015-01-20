// +@display_name  Settings Image File

var setBackgroundURI = function(el, uri, innerHTML){
	el.innerHTML = innerHTML || '';
	el.style.backgroundImage = 'url('+uri+')';
	el.setAttribute('data-src', uri);
	
	var bgimg = new Image();
	bgimg.onload = function() {
		var tmpHeight = parseInt(bgimg.naturalHeight) + 'px';
		var tmpWidth = parseInt(bgimg.naturalWidth) + 'px';
		if(!isNaN(bgimg.naturalHeight) && !isNaN(bgimg.naturalWidth)){
			if(parseInt(tmpHeight) > 300){
				tmpHeight = '300px';
				tmpWidth = '100%';
				el.style.backgroundSize = 'contain';
			} else {
				el.style.backgroundSize = '100% 100%';
			}
			el.style.height = tmpHeight;
			el.style.width = tmpWidth;
		}
		bgimg.parentElement.removeChild(bgimg);
	}
	bgimg.style.position = "absolute";
	bgimg.style.opacity = "0";
	(window || unsafeWindow).document.body.appendChild(bgimg);
	bgimg.src = uri;
}

Settings.PrefTypes.add('imagefile', {
	make: function(data){
		var defaultValue = data['default'] || '';
		var storedValue = Settings.get(data.name);
		var currentValue = (storedValue || defaultValue);
		var hasValidValue = typeof currentValue === "string" && currentValue != '' ? true : false;
		
		var fileSelector = new jMod.FileSelector({
			multiple: false,
			accept: 'image/*',
			button: {
				style: data.style,
				className: 'btn btn-success',
				innerHTML: [
					'<i class="fa ' + (data.buttonIcon || "fa-file-image-o") + '" style="margin-right:10px;"></i>',
					data.buttonText || 'Select an Image'
				],
				attributes: {
					type: 'button'
				}
			},
			form: {
				className: 'imagefile-form pref',
				attributes: {
					name: data.name,
					'data-jmod-settings-pref': data.name,
					'data-jmod-settings-pref-default': data['default'] || null,
				}
			},
			onChange: function(e, files, value){
				jMod.FileSelector.ReadFileAsURL(files[0],
					function(e, content, file){
						var imgContainerEl = fileSelector.formElement.parentElement.lastChild;
						
						setBackgroundURI(imgContainerEl, content, '');
						
						Settings.PrefTypes.onChange(fileSelector.formElement.getAttribute('name'), content);
					},
					function(e, content, file){
						var imgContainerEl = fileSelector.formElement.parentElement.lastChild;
						setBackgroundURI(imgContainerEl, '', 'No Preview');
						Settings.PrefTypes.onChange(fileSelector.formElement.getAttribute('name'), '');
					}
				);
			}
		});
		
		var opts = {
			type: 'div',
			className: 'pref-container',
			innerHTML: [
				fileSelector.formElement,
				createNewElement({
					type: 'div',
					className: 'image-preview-container',
					style: {
						//backgroundImage: hasValidValue ? 'url(' + currentValue + ')' : ''
					},
					attributes: {
						//'data-src': hasValidValue ? currentValue : ''
					},
					innerHTML: hasValidValue ? '' : 'No Preview'
				})
			]
		};
		
		if(Loading.DOMLoaded){
			setBackgroundURI(opts.innerHTML[1], hasValidValue ? currentValue : '', hasValidValue ? '' : 'No Preview');
		} else {
			setTimeout(setBackgroundURI, 150, opts.innerHTML[1], hasValidValue ? currentValue : '', hasValidValue ? '' : 'No Preview');
		}
		
		if(PROPDEFINED(data,'tooltip') && (PROPDEFINED(data.tooltip,'innerHTML') || PROPDEFINED(data.tooltip,'text'))){
			opts.innerHTML[0] = setTooltipProperties(opts.innerHTML[0], data.tooltip);
		}
		
		return opts;
	},
	getValue: function(prefEl, data){
		try{
			var imgContainerEl = prefEl.parentElement.lastChild;
			return imgContainerEl.getAttribute('data-src');
		}catch(e){
			return '';
		}
	},
	setValue: function(prefEl, data, value){
		var imgContainerEl = prefEl.parentElement.lastChild;
		setBackgroundURI(imgContainerEl, value, value && value != '' ? '' : 'No Preview');
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