// +@insert          after:end

var FileSelectorTest = function(){
	console.log('FileSelector Test');
	var tmpFileSelector = new jMod.FileSelector({
		multiple: true,
		button: {
			innerHTML: 'foo'
		},
		form: {
			attributes: {
				name: 'formName'
			}
		},
		onChange: function(e, files, value){
			console.log('onChnage cb', e, files, value);
			//jMod.FileSelector.ReadFileAsText(files[0], function(e, content, file){
				//console.log('Read File: ', file, 'e', e);
				//console.log('content: ', content);
			//});
			
			//jMod.FileSelector.ReadFileAsJSON(files[0], function(e, content, file){
				//console.log('Read File: ', file, 'e', e);
				//console.log('JSON Object: ', content);
			//});
			
			jMod.FileSelector.ReadFileAsURL(files[0], function(e, content, file){
				console.log('Read File: ', file, 'e', e);
				console.log('URL: ', content);
				var imageElement = jMod.Element.createNewElement({
					type: 'img'
				});
				(unsafeWindow || window).document.body.appendChild(imageElement);
				imageElement.src = content;
			});
		}
	});
	
	(unsafeWindow || window).document.body.appendChild(tmpFileSelector.formElement);
	
	console.log('FileSelector Click');
	tmpFileSelector.click(false, true);
}

setTimeout(function(){
	FileSelectorTest();
}, 2000);
