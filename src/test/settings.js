// +@insert          after:end

var SettingsTest = function(){
	console.log('jMod.Settings Test');
	var SettingOptions = {
		title: 'Example Title',
		settings: [
			{
				name: 'Setting 1',
				description: 'Setting 1 description',
				tooltip: {
					innerHTML: 'Text input <i>Top</i>-<b>Right</b> Tooltip',
					placement: 'top-right'
				},
				icon: {
					name: 'fa-microphone',
					tooltip: {
						innerHTML: 'icon tooltip',
						placement: 'right'
					}
				},
				tab: 'Tab Name 1',
				section: 'Other',
				type: 'input',
				'default': 'foo bar'
			},
			{
				name: 'element example',
				tab: 'Tab Name 1',
				section: 'Other',
				type: 'element',
				innerHTML: [
					'Element Example: ',
					{
						type: 'img',
						attributes: {
							src: "https://assets-cdn.github.com/images/modules/logos_page/GitHub-Logo.png",
							height: "10px"
						}
					}
				]
			},
			{
				name: 'Toggle',
				description: 'Toggle Test',
				options: {
					'val1': {
						label: 'Toggle 1',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Toggle Tooltip 1',
							placement: 'right'
						}
					},
					'val2': {
						label: 'Toggle 2',
						on: 'ON',
						off: 'OFF',
						tooltip: {
							innerHTML: 'Toggle Tooltip 2',
							placement: 'right'
						}
					},
					'val3': {
						label: 'Toggle 3',
						on: 'WIDE ON',
						off: 'WIDE OFF',
						className: 'wide',
						tooltip: {
							innerHTML: 'Toggle Tooltip 3',
							placement: 'right'
						}
					},
					'val4': {
						label: 'Toggle 4',
						on: 'EX WIDE ON',
						off: 'EX WIDE OFF',
						className: 'ex-wide',
						tooltip: {
							innerHTML: 'Toggle Tooltip 4',
							placement: 'right'
						}
					}
				},
				tab: 'Tab Name 1',
				section: 'Other',
				type: 'toggle',
				'default': 'val3,val4'
			},
			{
				name: 'Setting 2',
				tooltip: {
					innerHTML: 'Select Left Tooltip',
					placement: 'left'
				},
				tab: 'Tab Name 1',
				section: 'Other',
				type: 'select',
				options: {
					'val1': 'Option 1',
					'val2': 'Option 2',
					'val3': 'Option 3',
					'val4': 'Option 4',
				},
				'default': 'val3'
			},
			{
				name: 'Setting 3',
				tooltip: {
					innerHTML: 'Textarea Top Left Tooltip',
					placement: 'left-top'
				},
				icon: {
					name: 'fa-question-circle',
					tooltip: {
						innerHTML: 'Icon Tooltip for Textarea',
						placement: 'right'
					}
				},
				style: {
					minHeight: '100px'
				},
				tab: 'Tab Name 1',
				section: 'Other',
				type: 'textarea',
				'default': 'taco'
			},
			{
				name: 'Checkboxes',
				tab: 'Tab Name 1',
				tooltip: {
					innerHTML: 'Top Label Tooltip',
					placement: 'top-left',
					margin: {
						//left: '5px'
					}
				},
				section: 'Other2',
				options: {
					'val1': {
						label: 'Checkbox 1',
						tooltip: {
							innerHTML: 'Checkbox Tooltip 1',
							placement: 'top'
						}
					},
					'val2': {
						label: 'Checkbox 2',
						tooltip: {
							innerHTML: 'Checkbox Tooltip 2',
							placement: 'top'
						}
					},
					'val3': {
						label: 'Checkbox 3',
						className: 'wide',
						tooltip: {
							innerHTML: 'Checkbox Tooltip 3',
							placement: 'top'
						}
					},
					'val4': {
						label: 'Checkbox 4',
						className: 'ex-wide',
						tooltip: {
							innerHTML: 'Checkbox Tooltip 4',
							placement: 'top'
						}
					}
				},
				type: 'checkbox',
				'default': 'val1,val3'
			},
			{
				name: 'Depend Checkbox',
				description: 'Depend on Value of Checkboxes',
				tab: 'Tab Name 1',
				section: 'Other2',
				type: 'input',
				'default': 'Depend Checkbox',
				depend: {
					'Checkboxes': ['val1', 'val4']
				}
			},
			{
				name: 'Radio',
				tab: 'Tab Name 1',
				tooltip: {
					innerHTML: 'Bottom Label Tooltip',
					placement: 'bottom-left'
				},
				section: 'Other2',
				options: {
					'val1': {
						label: 'Radio 1',
						tooltip: {
							innerHTML: 'Radio Tooltip 1',
							placement: 'bottom'
						}
					},
					'val2': {
						label: 'Radio 2',
						tooltip: {
							innerHTML: 'Radio Tooltip 2',
							placement: 'bottom'
						}
					},
					'val3': {
						label: 'Radio 3',
						className: 'wide',
						tooltip: {
							innerHTML: 'Radio Tooltip 3',
							placement: 'bottom'
						}
					},
					'val4': {
						label: 'Radio 4',
						className: 'ex-wide',
						tooltip: {
							innerHTML: 'Radio Tooltip 4',
							placement: 'bottom'
						}
					}
				},
				type: 'radio',
				'default': 'val1'
			},
			{
				name: 'Depend 1',
				description: 'Depend on Value of Radio',
				tab: 'Tab Name 1',
				section: 'Other2',
				type: 'input',
				'default': 'Depend 1',
				depend: {
					'Radio': ['val2', 'val4']
				}
			},
			{
				name: 'Depend 2',
				description: 'Depend on Value of Radio',
				tab: 'Tab Name 1',
				section: 'Other2',
				type: 'input',
				'default': 'Depend 2',
				depend: {
					'Radio': function(prefEl, data, radioValue){
						if(radioValue == 'val1')
							return true;
						return false;
					}
				}
			},
			{
				name: 'Range',
				min: 20,
				max: 567,
				tooltip: {
					innerHTML: 'Slider tooltip',
					placement: 'top',
				},
				tab: 'Tab Name 1',
				section: 'Other',
				type: 'range',
				'default': '50'
			},
			{
				name: 'Setting 6',
				tab: 'Tab Name 2',
				section: 'Other',
				type: 'input'
			},
			{
				name: 'Setting 7',
				tab: 'Tab Name 2',
				section: 'Other',
				type: 'input'
			},
			
			{
				name: 'Image File',
				description: 'Image File description',
				buttonText: 'Select an Image...',
				buttonIcon: 'fa-file-o ',
				tooltip: {
					innerHTML: 'Image File Tooltip',
					placement: 'left'
				},
				tab: 'Tab Name 2',
				section: 'Other',
				type: 'imagefile',
				'default': ''
			},
		],
		tabs: [
			// (optional) Additional Custom tab
			{
				name: 'About',
				innerHTML: [
					{
						type: 'h1',
						innerHTML: 'About'
					},
					{
						type: 'p',
						innerHTML: 'about example'
					}
				]
			},
			// (optional) Adding information about a tab referenced by a setting
			{
				name: 'Tab Name 1',
				displayName: 'Tab 1 displayName',
				content: {
					footer: {
						type: 'div',
						innerHTML: '<b>Tab 1 Footer foo bar</b>'
					}
				}
			}
		],
		// (optional) Change the order of the tabs. Tabs left out will be added after in the order they are referenced by your settings
		tabOrder: ['About', 'Tab Name 1'],
		// (optional) Set the active tab
		activeTab: 'Tab Name 2',
		// (optional) callback that fires before the settings dialog closes
		onBeforeHide: function(e){
			console.log('Settings on before hide');
		}
	};
	
	jMod.Settings(SettingOptions);
	
	
	setTimeout(function(){
		// Show the settings dialog
		console.log('Show jMod Settings');
		jMod.Settings.show();
		console.log('Setting 1 Value: ', jMod.Settings.get('Setting 1'));
		console.log('Setting 1 Default: ', jMod.Settings.getDefault('Setting 1'));
	},100);
		
	//setTimeout(function(){
		//var settingsNav = document.querySelector('.jMod-settings .nav-tabs');
		// Switch to Tab #1 in the settings dialog
		//jMod.Tabs.show(settingsNav, 1);
	//},2000);
};

jMod.onReady = SettingsTest;