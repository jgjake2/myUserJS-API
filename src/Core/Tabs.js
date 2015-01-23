// +@display_name  Tooltip
// +@history (0.0.15) History begins.
// +@history (0.0.17) Fix resizing bug that causes content to disappear when tab width is not computable or too large.

/**
 * Tabs Configuration Options
 * @name Tabs
 * @alias Tabs
 * @memberof jMod.Config
 * @example
 * // Get the current value of Ext.enabled
 * jMod('get', 'Tabs.enabled')
 * // or
 * jMod.Config('Tabs.enabled');
 * // or
 * jMod.Config.Tabs.enabled;
 */
/*jMod.Config.Tabs = {
	enabled: true,
	att: {
		li: 'data-jmod-tab',
		ul: 'data-jmod-tab-nav-g',
		ct: 'data-jmod-tab-cont-g',
		pane: 'data-jmod-tab-content'
	},
	cn: {
		nav: 'nav-tabs',
		ct: 'tab-content'
	}
}*/

jMod.Config.Tabs = jMod.extend({
	enabled: true,
	att: {
		li: 'data-jmod-tab',
		ul: 'data-jmod-tab-nav-g',
		ct: 'data-jmod-tab-cont-g',
		pane: 'data-jmod-tab-content'
	},
	cn: {
		nav: 'nav-tabs',
		ct: 'tab-content'
	}
}, jMod.Config.Tabs || {});

var Tabs = jMod.Tabs = function(data){

}
Tabs.Initialized = false;
Tabs.GroupCount = 0;
var TabAtt = Tabs.att = {};
var TabCn = Tabs.cn = {};

Object.defineProperties(Tabs.att, {
	li: {
		get: function(){
			return jConfig('Tabs.att.li');
		}
	},
	ul: {
		get: function(){
			return jConfig('Tabs.att.ul');
		}
	},
	ct: {
		get: function(){
			return jConfig('Tabs.att.ct');
		}
	},
	pane: {
		get: function(){
			return jConfig('Tabs.att.pane');
		}
	}
});


Object.defineProperties(Tabs.cn, {
	nav: {
		get: function(){
			return jConfig('Tabs.cn.nav');
		}
	},
	ct: {
		get: function(){
			return jConfig('Tabs.cn.ct');
		}
	}
});

Tabs.Events = new EventsClass(['onBeforeShow', 'onAfterShow']);
Tabs.handler = {
	click: function(e){
		var target = e.target;
		var targetLi = target.parentElement;
		if(this.contains(target) && target.nodeName == "A"){
			var content = this.parentElement.querySelector('.'+TabCn.ct);
			var href = getAttribute(target, "href");
			if(href){
				var activeContent = content.querySelector(".tab-pane.active");
				var activeLink = this.querySelector("li.active");
				
				var targetContent = content.querySelector(href);
				
				if(targetContent){
					var tabGroupNum = getAttribute(this, TabAtt.ul);
					if(Tabs.Events.fire('onBeforeShow', parseInt(tabGroupNum), this, [target, targetContent]) !== false){
						if(activeLink){
							removeClass(activeLink, "active");
						}
						
						if(activeContent){
							removeClass(activeContent, "active");
						}
						
						addClass(targetLi, "active");
						addClass(targetContent, "active");
						Tabs.Events.fire('onAfterShow', parseInt(tabGroupNum), this, [target, targetContent]);
					}
				}
			}
			eventCancel(e);
		}
	}
}

Tabs.load = function(data){
	var tabGroups, el, EventListeners;
	if(isElement(data))
		el = data;
	else if(typeof data === "object" && data.target) {
		el = data.target;
		EventListeners = data.EventListeners;
	} else
		return;
	if(hasClass(el, 'tabbable')) {
		tabGroups = [el];
	} else {
		tabGroups = jMod.$$('div.tabbable', el);
	}
	if(tabGroups){
		for(var i = 0; i < tabGroups.length; i++) {
			var tabNav = tabGroups[i].querySelector('.nav.'+TabCn.nav);
			var tabContent = tabGroups[i].querySelector('.'+TabCn.ct);
			if(tabNav && tabContent){
				tabNav.setAttribute(TabAtt.ul, Tabs.GroupCount);
				tabContent.setAttribute(TabAtt.ct, Tabs.GroupCount);
				if(typeof data === "object")
					Tabs.Events.addAll(data, Tabs.GroupCount);
				tabNav.addEventListener("click", Tabs.handler.click);
				Tabs.GroupCount++;
			}
		}
	}
}

Tabs.makeNavElement = function(data){
	var r = {
		type: 'li',
		id: data.id,
		className: (data.isActive || data.active ? 'active ' : '') + (data.className || data['class'] || ''),
		innerHTML: {
			type: 'a',
			innerHTML: data.name || data.innerHTML || data.text,
			attributes: {
				href: '#'+ (data.contentId || data.targetId),
				'data-toggle': 'tab'
			}
		},
		attributes: (data.attributes || {})
	};
	r.attributes[TabAtt.li] = data.index || -1;
	return r;
}

Tabs.makeContentElement = function(data){
	var r = {
		type: 'div',
		id: data.id,
		className: 'container tab-pane ' + (data.isActive || data.active ? 'active ' : '') + (data.className || data['class'] || ''),
		innerHTML: data.innerHTML || data.text || '',
		attributes: (data.attributes || {})
	};
	r.attributes[TabAtt.pane] = data.index || -1;
	return r;
}

Tabs.show = function(tabGroup, tab){
	var i, tmp, tabEl;
	if(typeof tabGroup === "number") {
		tabGroup = document.querySelector('ul['+TabAtt.ul+'="'+tabGroup+'"]');
	}
	if(isElement(tabGroup)){
		if(hasAttribute(tabGroup, TabAtt.li)){
			tabEl = tabGroup;
		} else if(typeof tab === "number"){
			tabEl = jMod.$$('li['+TabAtt.li+']', tabGroup)[tab];
		} else if(typeof tab === "string") {
			tmp = jMod.$$('li['+TabAtt.li+']', tabGroup);
			for(i = 0; i < tmp.length; i++){
				if(tmp[i].innerHTML == tab){
					tabEl = tmp[i];
					break;
				}
			}
		} else if(isElement(tab) && hasAttribute(tab, TabAtt.li)){
			tabEl = tab;
		}
		
		if(tabEl && isElement(tabEl))
			return fireClick(tabEl.querySelector('a[data-toggle="tab"]'));
	}
}

function waitForComputeableWidth(el, callback, count){
	var computedNav = (window || unsafeWindow).getComputedStyle(el, null);
	if((count = count || 0) < 50 && isNaN(parseInt(computedNav.width))){
		setTimeout(function(el, callback, count){
			waitForComputeableWidth(el, callback, count + 1);
		}, 100, el, callback, count);
	} else {
		callback(el, computedNav);
	}
}

function resizeTabs(tabsNav, computedNav){
	var tabsContent = tabsNav.parentElement.querySelector('.tab-content');
	
	if(tabsContent.offsetParent === null)
		return;
	//var width = parseInt(computedNav.getPropertyValue('width'));
	var width = parseInt(computedNav.width);
	if(isNaN(width))
		if(jMod.debug)
			jModLogWarning('Tabs.resize', 'Tab width is NaN!', tabsNav, tabsContent, computedNav);
	else if(width > 300)
		if(jMod.debug)
			jModLogWarning('Tabs.resize', 'Tab width too wide!', width, tabsNav);
	else if(width > 50)
			tabsContent.style.marginLeft = (width + 11) + 'px';
}

Tabs.resize = function(tabsNav){
	waitForComputeableWidth(tabsNav, resizeTabs);
}