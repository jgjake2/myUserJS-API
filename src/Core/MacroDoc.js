
/**
 * @global
 * @namespace Macros
 * @author jgjake2
 */

/**
 * <span class="macro-overload-count">3 Overload</span> Check if object <b>a</b> has all the given properties using the <b>typeof</b> operator
 * @name PROPDEFINED
 * @memberof Macros
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">1 Argument</span> PROPDEFINED(a,b)
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">2 Arguments</span> PROPDEFINED(a,b,c)
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">3 Arguments</span> PROPDEFINED(a,b,c,d)
 * @property {boolean} PROPDEFINED - <span class="macro-argument-count">4 Arguments</span> PROPDEFINED(a,b,c,d,e)
 * @example
 * PROPDEFINED&#40;obj,"foo"&#41; //result: PROPDEFINED(obj,"foo")
 * PROPDEFINED&#40;obj,"foo","bar"&#41; //result: PROPDEFINED(obj,"foo","bar")
 * PROPDEFINED&#40;obj,"foo","bar","taco"&#41; //result: PROPDEFINED(obj,"foo","bar","taco")
 * PROPDEFINED&#40;obj,"foo","bar","taco","bell"&#41; //result: PROPDEFINED(obj,"foo","bar","taco","bell")
 */

/**
 * <span class="macro-overload-count">2 Overload</span> Check if object <b>a</b> has property <b>b</b>, and <b>a[b]</b> has property <b>c</b>, etc... using <b>typeof</b>
 * @name PROPTREEDEFINED
 * @memberof Macros
 * @property {boolean} PROPTREEDEFINED - <span class="macro-argument-count">2 Arguments</span> PROPTREEDEFINED(a,b,c)
 * @property {boolean} PROPTREEDEFINED - <span class="macro-argument-count">3 Arguments</span> PROPTREEDEFINED(a,b,c,d)
 * @property {boolean} PROPTREEDEFINED - <span class="macro-argument-count">4 Arguments</span> PROPTREEDEFINED(a,b,c,d,e)
 * @example
 * PROPTREEDEFINED&#40;obj,"foo","bar"&#41; //result: PROPTREEDEFINED(obj,"foo","bar")
 * PROPTREEDEFINED&#40;obj,"foo","bar","taco"&#41; //result: PROPTREEDEFINED(obj,"foo","bar","taco")
 * PROPTREEDEFINED&#40;obj,"foo","bar","taco","bell"&#41; //result: PROPTREEDEFINED(obj,"foo","bar","taco","bell")
 */

/**
 * <span class="macro-overload-count">3 Overload</span> Check if object <b>a</b> has all the given properties using the <b>in</b> operator
 * @name HASPROP
 * @memberof Macros
 * @property {boolean} HASPROP - <span class="macro-argument-count">1 Argument</span> HASPROP(a,b)
 * @property {boolean} HASPROP - <span class="macro-argument-count">2 Arguments</span> HASPROP(a,b,c)
 * @property {boolean} HASPROP - <span class="macro-argument-count">3 Arguments</span> HASPROP(a,b,c,d)
 * @property {boolean} HASPROP - <span class="macro-argument-count">4 Arguments</span> HASPROP(a,b,c,d,e)
 * @example
 * HASPROP&#40;obj,"foo"&#41; //result: HASPROP(obj,"foo")
 * HASPROP&#40;obj,"foo","bar"&#41; //result: HASPROP(obj,"foo","bar")
 * HASPROP&#40;obj,"foo","bar","taco"&#41; //result: HASPROP(obj,"foo","bar","taco")
 * HASPROP&#40;obj,"foo","bar","taco","bell"&#41; //result: HASPROP(obj,"foo","bar","taco","bell")
 */

/**
 * <span class="macro-overload-count">3 Overload</span> If object <b>a</b> has all the given properties using the <b>in</b> operator, then...
 * @name IFHASPROP
 * @memberof Macros
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">1 Argument</span> IFHASPROP(a,b,c,d)
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">2 Arguments</span> IFHASPROP(a,b,c,d,e)
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">3 Arguments</span> IFHASPROP(a,b,c,d,e,f)
 * @property {boolean} IFHASPROP - <span class="macro-argument-count">4 Arguments</span> IFHASPROP(a,b,c,d,e,f,g)
 * @example
 * IFHASPROP&#40;obj,"foo",true,false&#41; //result: IFHASPROP(obj,"foo",true,false)
 * IFHASPROP&#40;obj,"foo","bar",true,false&#41; //result: IFHASPROP(obj,"foo","bar",true,false)
 * IFHASPROP&#40;obj,"foo","bar","taco",true,false&#41; //result: IFHASPROP(obj,"foo","bar","taco",true,false)
 * IFHASPROP&#40;obj,"foo","bar","taco","bell",true,false&#41; //result: IFHASPROP(obj,"foo","bar","taco","bell",true,false)
 */

/**
 * <span class="macro-overload-count">2 Overload</span> Check if object <b>a</b> has property <b>b</b>, and <b>a[b]</b> has property <b>c</b>, etc... using <b>in</b>
 * @name HASPROPTREE
 * @memberof Macros
 * @property {boolean} HASPROPTREE - <span class="macro-argument-count">2 Arguments</span> HASPROPTREE(a,b,c)
 * @property {boolean} HASPROPTREE - <span class="macro-argument-count">3 Arguments</span> HASPROPTREE(a,b,c,d)
 * @property {boolean} HASPROPTREE - <span class="macro-argument-count">4 Arguments</span> HASPROPTREE(a,b,c,d,e)
 * @example
 * HASPROPTREE&#40;obj,"foo","bar"&#41; //result: HASPROPTREE(obj,"foo","bar")
 * HASPROPTREE&#40;obj,"foo","bar","taco"&#41; //result: HASPROPTREE(obj,"foo","bar","taco")
 * HASPROPTREE&#40;obj,"foo","bar","taco","bell"&#41; //result: HASPROPTREE(obj,"foo","bar","taco","bell")
 */

/**
 * <span class="macro-overload-count">0 Overloads</span> Check if variable exists in the current scope
 * @name EXISTS
 * @memberof Macros
 * @property {boolean} EXISTS - <span class="macro-argument-count">1 Argument(s)</span> EXISTS(a)
 * @example
 * EXISTS&#40;obj&#41; //result: EXISTS(obj)
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> If variable exists, produce b, otherwise produce c
 * @name IFEXISTS
 * @memberof Macros
 * @property {boolean} IFEXISTS - <span class="macro-argument-count">1 Argument(s)</span> IFEXISTS(a,b,c)
 * @example
 * IFEXISTS&#40;obj,true,false&#41; //result: IFEXISTS(obj,true,false)
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if variable does not exist in the current scope
 * @name NOTEXISTS
 * @memberof Macros
 * @property {boolean} NOTEXISTS - <span class="macro-argument-count">1 Argument(s)</span> NOTEXISTS(a)
 * @example
 * NOTEXISTS&#40;obj&#41; //result: NOTEXISTS(obj)
 */
 
 
/**
 * <span class="macro-overload-count">1 Overload</span> Get the arguments of a function, slicing with the given number "a" to optional argument "b"
 * @name ARGUMENTS
 * @memberof Macros
 * @property {boolean} ARGUMENTS - <span class="macro-argument-count">1 Argument(s)</span> ARGUMENTS(a)
 * @property {boolean} ARGUMENTS - <span class="macro-argument-count">2 Argument(s)</span> ARGUMENTS(a,b)
 * @example
 * ARGUMENTS&#40;1&#41; //result: ARGUMENTS(1)
 * ARGUMENTS&#40;1,3&#41; //result: ARGUMENTS(1,3)
 */

 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is a function
 * @name ISFUNCTION
 * @memberof Macros
 * @property {boolean} ISFUNCTION - <span class="macro-argument-count">1 Argument(s)</span> ISFUNCTION(a)
 * @example
 * ISFUNCTION&#40;foo&#41; //result: ISFUNCTION(foo)
 */
 
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is an object
 * @name ISOBJECT
 * @memberof Macros
 * @property {boolean} ISOBJECT - <span class="macro-argument-count">1 Argument(s)</span> ISOBJECT(a)
 * @example
 * ISOBJECT&#40;foo&#41; //result: ISOBJECT(foo)
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is a boolean
 * @name ISBOOLEAN
 * @memberof Macros
 * @property {boolean} ISBOOLEAN - <span class="macro-argument-count">1 Argument(s)</span> ISBOOLEAN(a)
 * @example
 * ISBOOLEAN&#40;foo&#41; //result: ISBOOLEAN(foo)
 */
 
/**
 * <span class="macro-overload-count">0 Overloads</span> Check if "a" is a string
 * @name ISSTRING
 * @memberof Macros
 * @property {boolean} ISSTRING - <span class="macro-argument-count">1 Argument(s)</span> ISSTRING(a)
 * @example
 * ISSTRING&#40;foo&#41; //result: ISSTRING(foo)
 */