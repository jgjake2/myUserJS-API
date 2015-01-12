// +@display_name  Tooltip
// +@history (0.0.15) History begins.

/**
 * Tooltip Configuration Options
 * @name Tooltip
 * @alias Tooltip
 * @memberof jMod.Config
 * @example
 * // Get the current value of Ext.enabled
 * jMod('get', 'Tooltip.enabled')
 * // or
 * jMod.Config('Tooltip.enabled');
 * // or
 * jMod.Config.Tooltip.enabled;
 */
/*
jMod.Config.Tooltip = {
	enabled: false,
	containerId: 'jModTooltipContainer',
	attributeNames: {
		id: 'data-tooltip-id',
		tooltip: 'data-tooltip',
		placement: 'data-tooltip-placement',
		margin: 'data-tooltip-margin'
	},
	classNames: {
		tooltipTarget: 'jmod-tooltip-target',
		tooltip: 'tooltip'
	}
}
*/

jMod.Config.Tooltip = jMod.extend({
	enabled: false,
	containerId: 'jModTooltipContainer',
	attributeNames: {
		id: 'data-tooltip-id',
		tooltip: 'data-tooltip',
		placement: 'data-tooltip-placement',
		margin: 'data-tooltip-margin'
	},
	classNames: {
		tooltipTarget: 'jmod-tooltip-target',
		tooltip: 'tooltip'
	}
}, jMod.Config.Tooltip || {});

// Minifies down nicely
var
	Tooltip_ContainerId_Key = 'Tooltip.containerId',
	Tooltip_IdAttribute_Key = 'Tooltip.attributeNames.id',
	Tooltip_TooltipAttribute_Key = 'Tooltip.attributeNames.tooltip',
	Tooltip_PlacementAttribute_Key = 'Tooltip.attributeNames.placement',
	Tooltip_MarginAttribute_Key = 'Tooltip.attributeNames.margin',
	Tooltip_TooltipTargetClass_Key = 'Tooltip.classNames.tooltipTarget',
	Tooltip_TooltipClass_Key = 'Tooltip.classNames.tooltip';

/**
 * @namespace jMod.Tooltip
 * @memberOf jMod
 * @since 0.0.14
 */
var Tooltip = jMod.Tooltip = function(data, data2){
	if(isElement(data)){
		jMod.Tooltip.AddTooltipsToElement.apply(jMod.Tooltip, arguments);
	}
}

var _TooltipContainer;
Object.defineProperties(Tooltip, {
	Initialized: {
		value: false,
		writable: true
	},
	Count: {
		value: 0,
		writable: true
	},
	TooltipContainer: {
		get: function(){
			if(!Tooltip.Initialized)
				Tooltip.init();
			if(!_TooltipContainer)
				_TooltipContainer = document.getElementById(jConfig(Tooltip_ContainerId_Key));
			return _TooltipContainer;
		},
		set: function(el){
			_TooltipContainer = el;
		}
	},
	'get': {
		value: (function(obj){
			var tooltipId, tooltipEl, tmpEl, idAttName = jConfig(Tooltip_IdAttribute_Key);
			if(isElement(obj)){
				if(hasClass(obj, jConfig(Tooltip_TooltipClass_Key))){
					return document.querySelector('.' + jConfig(Tooltip_TooltipTargetClass_Key) + ' [' + idAttName + '="'+obj.id+'"]')
				}
				if(hasClass(obj, jConfig(Tooltip_TooltipTargetClass_Key)) && obj.hasAttribute(idAttName)){
					tooltipId = obj.getAttribute(idAttName);
				}else if(this.TooltipContainer && (tmpEl = this.TooltipContainer.querySelector('.' + jConfig(Tooltip_TooltipTargetClass_Key) + ' [' + idAttName + ']')) !== null){
					tooltipId = tmpEl.getAttribute(idAttName);
				}
				return document.getElementById(tooltipId);
			} else if(typeof obj === "string") {
				if((tooltipEl = document.getElementById(obj)) !== null){
					return tooltipEl;
				}
			} else if(typeof obj === "number") {
				if(this.TooltipContainer && this.TooltipContainer.childElementCount > obj)
					return tooltipContainer.children[obj];
			}
			return null;
		}).bind(Tooltip)
	}
});

/** @const */
var fadeTime = 200;

Tooltip.MoveTooltip = function(targetEl, tooltipEl, position){
	if('top' in position)
		tooltipEl.style.top = position.top;
	else if('bottom' in position)
		tooltipEl.style.bottom = position.bottom;
		
	if('left' in position)
		tooltipEl.style.left = position.left;
	else if('right' in position)
		tooltipEl.style.right = position.right;
		
	var marginAttributeName = jConfig('Tooltip.attributeNames.margin');
	if(targetEl.hasAttribute(marginAttributeName + '-top'))
		tooltipEl.style.marginTop = targetEl.getAttribute(marginAttributeName + '-top');
		
	if(targetEl.hasAttribute(marginAttributeName + '-left'))
		tooltipEl.style.marginLeft = targetEl.getAttribute(marginAttributeName + '-left');
		
	if(targetEl.hasAttribute(marginAttributeName + '-bottom'))
		tooltipEl.style.marginBottom = targetEl.getAttribute(marginAttributeName + '-bottom');
		
	if(targetEl.hasAttribute(marginAttributeName + '-right'))
		tooltipEl.style.marginRight = targetEl.getAttribute(marginAttributeName + '-right');
}

Tooltip.MoveTooltipToTarget = function(tooltip, targetEl, callback){
	var tooltipEl, top, left, bottom, right;
	
	if(hasClass(tooltip, jConfig(Tooltip_TooltipClass_Key)))
		tooltipEl = tooltip;
	else if(tooltip.hasAttribute(jConfig(Tooltip_IdAttribute_Key)))
		tooltipEl = document.getElementById(tooltip.getAttribute(jConfig(Tooltip_IdAttribute_Key)));
	else
		return;
	
	var tooltipPlacement = targetEl.getAttribute(jConfig(Tooltip_PlacementAttribute_Key)) || 'top';
	
	var offset = getOffset(targetEl);
	
	switch(tooltipPlacement){
		// Left
		case 'left-top':
			top = parseInt(offset.top);
			left = offset.left - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'left-bottom':
			top = (offset.top + offset.height) - parseInt(tooltipEl.offsetHeight);
			left = offset.left - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'left':
			top = (offset.top + parseInt(offset.height / 2)) - parseInt(parseInt(tooltipEl.offsetHeight) / 2);
			left = offset.left - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
			
		// Right
		case 'right-top':
			top = parseInt(offset.top);
			left = offset.left + offset.width;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'right-bottom':
			top = (offset.top + offset.height) - parseInt(tooltipEl.offsetHeight);
			left = offset.left + offset.width;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'right':
			top = (offset.top + parseInt(offset.height / 2)) - parseInt(tooltipEl.offsetHeight / 2);
			left = offset.left + offset.width;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
			
		// Bottom
		case 'bottom-left':
			top = offset.top + offset.height;
			left = offset.left;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'bottom-right':
			top = offset.top + offset.height;
			left = (offset.left + offset.width) - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'bottom':
			top = offset.top + offset.height;
			left = offset.left + parseInt(offset.width / 2) - parseInt(parseInt(tooltipEl.offsetWidth) / 2);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
			
		// Top
		case 'top-left':
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			top = offset.top - parseInt(tooltipEl.offsetHeight);
			left = offset.left;
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'top-right':
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			top = offset.top - parseInt(tooltipEl.offsetHeight);
			left = (offset.left + offset.width) - parseInt(tooltipEl.offsetWidth);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
		case 'top':
		default:
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			//bottom = window.viewportSize.getHeight() - offset.top - offset.height + 10;
			top = offset.top - parseInt(tooltipEl.offsetHeight);
			left = offset.left + parseInt(offset.width / 2) - parseInt(parseInt(tooltipEl.offsetWidth) / 2);
			Tooltip.MoveTooltip(targetEl, tooltipEl, {top: top + 'px', left: left + 'px'});
			break;
	}
	
	
}

Tooltip.HideAllExcept = function(except){
	var hide = [],
		tooltipEl,
		tooltips = jMod.$$('.jmod-na .' + jConfig(Tooltip_TooltipClass_Key) + '.in');
	for(var i = 0; i < tooltips.length; i++){
		tooltipEl = tooltips[i];
		if(tooltipEl.style.display == "block" && tooltipEl !== except){
			removeClass(tooltipEl, 'in')
			hide.push(tooltipEl);
		}
	}
	
	setTimeout(function(_hide){
		for(var i = 0; i < _hide.length; i++){
			if(!hasClass(_hide[i], 'in'))
				_hide[i].style.display = 'none';
		}
	}, fadeTime, hide);
}

Tooltip.handler = {
	mouseenter: function(e){
		var tooltipId = this.getAttribute(jConfig(Tooltip_IdAttribute_Key));
		var tooltipValue = this.getAttribute(jConfig(Tooltip_TooltipAttribute_Key));
		var tooltipPlacement = this.getAttribute(jConfig(Tooltip_PlacementAttribute_Key)) || 'top';
		var tooltipContainer = Tooltip.TooltipContainer;
		
		switch(tooltipPlacement){
			case 'top-left':
			case 'top-right':
				tooltipPlacement = 'top ' + tooltipPlacement;
				break;
			case 'bottom-left':
			case 'bottom-right':
				tooltipPlacement = 'bottom ' + tooltipPlacement;
				break;
			case 'left-top':
			case 'left-bottom':
				tooltipPlacement = 'left ' + tooltipPlacement;
				break;
			case 'right-top':
			case 'right-bottom':
				tooltipPlacement = 'right ' + tooltipPlacement;
				break;
		}
		
		var tooltipEl = document.getElementById(tooltipId);
		if(!tooltipEl){
			tooltipEl = createNewElement({
				type: 'div',
				id: tooltipId,
				className: jConfig(Tooltip_TooltipClass_Key) + ' ' + tooltipPlacement + ' fade slow',
				style: {
					'display': 'none',
				},
				innerHTML: ['<div class="tooltip-arrow"></div>','<div class="tooltip-inner">'+tooltipValue+'</div>']
			});
			tooltipEl.addEventListener("mouseenter", function(ev){
				var currentOpacity = window.getComputedStyle(this,null).getPropertyValue("opacity");
				if(currentOpacity > 0.2){
					addClass(this, 'in');
					Tooltip.HideAllExcept(this);
				}
			});
			
			tooltipEl.addEventListener("mouseleave", function(ev){
				var currentOpacity = window.getComputedStyle(this,null).getPropertyValue("opacity");
				removeClass(this, 'in');
				setTimeout(function(el){
					if(!hasClass(el, 'in'))
						el.style.display = 'none';
				}, fadeTime, this);
			});
			
			tooltipEl.addEventListener("click", function(ev){
				removeClass(this, 'in');
				setTimeout(function(el){
					if(!hasClass(el, 'in'))
						el.style.display = 'none';
				}, fadeTime, this);
			});
			
			tooltipContainer.appendChild(tooltipEl);
			
		}
		
		Tooltip.HideAllExcept(tooltipEl);
		
		tooltipEl.style.display = 'block';
		
		setTimeout(function(targetEl, tooltipEl){
			addClass(tooltipEl, 'in');
			Tooltip.MoveTooltipToTarget(tooltipEl, targetEl);
		}, 1, this, tooltipEl);
		
	},
	
	mouseleave: function(e){
		var tooltipEl = Tooltip.get(this);
		if(tooltipEl){
			removeClass(tooltipEl, 'in');
			setTimeout(function(tooltipEl){
				if(!hasClass(tooltipEl, 'in'))
					tooltipEl.style.display = 'none';
			}, fadeTime, tooltipEl);
		}
	},
	
	scroll: function(e){
		var tooltips, tooltipId, tooltipEl;
		if(isNamespaced(this, 'jmod-na'))
			tooltips = jMod.$$('.' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']', this);
		else
			tooltips = jMod.$$('.jmod-na .' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']', this);
		for(var i = 0; i < tooltips.length; i++){
			tooltipId = tooltips[i].getAttribute(jConfig(Tooltip_IdAttribute_Key));
			tooltipEl = document.getElementById(tooltipId);
			if(tooltipEl && tooltipEl.style.display == "block"){
				Tooltip.MoveTooltipToTarget(tooltipEl, tooltips[i]);
			}
		}
	}
}

Tooltip.getTooltipsFromElement = function(el){
	var val, r = [];
	//var tooltips = el.querySelectorAll('.' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']');
	var tooltips = jMod.$$('.' + jConfig(Tooltip_TooltipTargetClass_Key) + '[' + jConfig(Tooltip_TooltipAttribute_Key) + ']', el);
	for(var i = 0; i < tooltips.length; i++)
		if(tooltips[i].getAttribute(jConfig(Tooltip_TooltipAttribute_Key)))
			r.push(tooltips[i]);
	return r;
}

Tooltip.AddTooltipsToElement = function(el){
	var tooltips = Tooltip.getTooltipsFromElement(el);
	for(var i = 0; i < tooltips.length; i++){
		tooltips[i].setAttribute(jConfig(Tooltip_IdAttribute_Key), 'jmod-tooltip-' + Tooltip.Count++);
		tooltips[i].addEventListener("mouseenter", Tooltip.handler.mouseenter);
		tooltips[i].addEventListener("mouseleave", Tooltip.handler.mouseleave);
		
		var parent = tooltips[i];
		while(parent.parentElement){
			parent = parent.parentElement;
			if(!parent.hasAttribute('data-jmod-scroll-event')){
				parent.setAttribute('data-jmod-scroll-event', true);
				parent.addEventListener("scroll", Tooltip.handler.scroll);
			}
		}
	}
	el.addEventListener("scroll", Tooltip.handler.scroll);
}


Tooltip.init = function(){
	Tooltip.Initialized = true;
	
	var tooltipContainer = document.getElementById(jConfig(Tooltip_ContainerId_Key));
	if(tooltipContainer == null){
		tooltipContainer = document.createElement("div");
		tooltipContainer.id = jConfig(Tooltip_ContainerId_Key);
		tooltipContainer.className = 'jModTooltipContainer jmod-na jmod-fa';
		document.body.appendChild(tooltipContainer);
		_TooltipContainer = tooltipContainer;
	}

}

jMod.CSS = '.jmod-na .fade.slow {transition: opacity '+((fadeTime / 1000).toFixed(2)).toString()+'s linear 0s;}' + <><![CDATACSS[


]]></>;

