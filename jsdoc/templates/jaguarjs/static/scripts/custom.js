function getDefaultsColNumber($table){
	return ($table.find('thead > tr > th:contains("Default")').first().index());
}

function formatDefaultCol(col){
	$col = $(col);
	switch($col.html().trim().toLowerCase()){
		case 'true':
			return $col.html('<span class="value-true">true</span>');
			break;
		case 'false':
			return $col.html('<span class="value-false">false</span>');
			break;
	}
}

function formatTables(){
	try{
	$tTable = $('table.props');
	$tTable.each(function(){
		var $this = $(this);
		var defaultsColNum = getDefaultsColNumber($this);
		if(defaultsColNum){
			$this.find('tbody > tr').each(function(){
				$tr = $(this);
				var defaultsCol = $tr.children('td').eq(defaultsColNum);
				formatDefaultCol(defaultsCol);
			});
		}
	});
	}catch(e){
		console.log('error', e);
	}
}

setTimeout(formatTables, 100);
