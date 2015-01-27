
function testSelector(){
	console.log('Test jQuery Selectors');
	var newEl = jMod.Element.createNewElement({
		id: 'testElement',
		innerHTML: [
			{
				className: 'tc1',
				innerHTML: [
					{
						className: 'tc1-1 childElement-1'
					},
					{
						className: 'tc1-2 childElement-1'
					},
					{
						className: 'tc1-3 childElement-1',
						innerHTML: {
							className: 'tc1-3-1 childElement-2',
							innerHTML: {
								className: 'tc1-3-1-1 childElement-3'
							}
						}
					}
				]
			},
			{
				className: 'tc2',
				innerHTML: [
					{
						className: 'tc2-1 childElement-1'
					},
					{
						className: 'tc2-3 childElement-1'
					}
				]
			},
			{
				className: 'tc3',
				innerHTML: [
					{
						className: 'tc3-1 childElement-1'
					}
				]
			}
		]
	});
	
	document.body.appendChild(newEl);
	
	console.log('Add Tokenizer');
	jMod.jQueryExtensions.extendTokenizer($);
	
	console.log("jQuery Find Function:");
	console.dir($.find);
	
	// Test 1
	var test1 = $(".tc1-2 + .tc1-3");
	console.log('test: sibling matching ".tc1-3"', test1, test1.length == 1 ? "Pass!" : "Fail!");
	
	// Test 2
	var test2 = $(".tc1-2 ++ *");
	console.log('test: all siblings', test2, test2.length == 2 ? "Pass!" : "Fail!");
	
	// Test 3
	var test3 = $(".tc1-2 +< *");
	console.log('test: all previous siblings', test3, test3.length == 1 ? "Pass!" : "Fail!");
	
	// Test 4
	var test4 = $(".tc1-2 +> *");
	console.log('test: all next siblings', test4, test4.length == 1 ? "Pass!" : "Fail!");
	
	// Test 5
	var test5 = $(".tc1-2 ++ * .childElement-3");
	console.log('test: child of sibling with class name "childElement-3"', test5, test5.length == 1 ? "Pass!" : "Fail!");
	
	// Test 6
	var test6 = $(".tc3 ++ * .childElement-1");
	console.log('test: child of sibling with class name "childElement-1"', test6, test6.length == 5 ? "Pass!" : "Fail!");
	
	
	console.log('End Test jQuery Selectors');
}

setTimeout(testSelector, 1000);
