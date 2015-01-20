// +@display_name  Observer

jMod.Observer = function(){
	
	this.filters = [];
	
	this.addFilter = function(callback, data, fireOnce){
		this.filters.push({
			callback: callback,
			data: data,
			fireOnce: fireOnce === true ? true : false
		});
	}
	
	this.filterMutation = function(mutation){
		var filterData,
			_continue,
			tmp,
			x,
			i = 0;
			
		for(i; i < this.filters.length; i++){
			filterData = this.filters[i].data;
			_continue = false;
			
			if(filterData.type){
				if(typeof filterData.type === "string")
					filterData.type = [filterData.type];
				if(filterData.type.indexOf(mutation.type) == -1)
					continue;
			}
			
			if(typeof filterData.target === "object"){
				// Has Class
				if(filterData.target.hasClass){
					if(typeof filterData.target.hasClass === "string")
						filterData.target.hasClass = [filterData.target.hasClass];
					for(x = 0; x < filterData.target.hasClass.length; x++){
						if(!hasClass(mutation.target, filterData.target.hasClass[x])){
							_continue = true;
							break;
						}
					}
					if(_continue)
						continue;
				}
				
				// Has Children
				if(filterData.target.hasChildren){
					if(typeof filterData.target.hasChildren === "string")
						filterData.target.hasChildren = [filterData.target.hasChildren];
					for(x = 0; x < filterData.target.hasChildren.length; x++){
						tmp = jMod.$$(filterData.target.hasChildren[x], mutation.target);
						if(!tmp || tmp.length == 0){
							_continue = true;
							break;
						}
					}
					if(_continue)
						continue;
				}
				
				
			}
			
			// Fire Callback
			this.filters[i].callback(mutation, this);
			if(this.filters[i].fireOnce)
				return;
		}
	}
	
	this.MutationObserver = new MutationObserver(function(mutations) {
		for(var i = 0; i < mutations.length; i++){
			this.filterMutation(mutations[i]);
		}
	});
	
	this.observe = function(target, config){
		this.MutationObserver.observe(target, config || {
			childList: true,
			attributes: true,
			characterData: true,
			subtree: true,
			//attributeOldValue: true,
			//characterDataOldValue: true,
			//attributeFilter: true
		});
	}
	
	this.disconnect = function(){
		this.MutationObserver.disconnect();
	}
}

