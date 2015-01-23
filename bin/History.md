jMod History
============

## Version 0.0.18
* **Core**
    * Started cleaning up Notifications.
    * Added sessionStorage.
    * Added jQueryExtensions.

## Version 0.0.17
* **Config**
    * Config function now attempts to get userscript information when called (if enabled).
* **Core**
    * Added Observer class.
    * Added Language framework.
* **ExportFunction**
    * Added condition for arrays when normal copying fails.
    * Added some documentation.
    * Better support when "exportFunction" is unavailable.
* **Get Remote Image**
    * History begins.
* **Get Resource**
    * History begins.
* **Initialize**
    * Logging improvements.
* **Language**
    * History begins.
* **Log**
    * Updated format builder to include integer types.
    * Updated format builder to handle arguments without a type as an object without including it in the format string.
    * Added a jMod specific Warning and Info logger.
* **Script Info**
    * Added enable/disable configuration and logging for "getScriptFileInfo".
* **SessionStorage**
    * History begins.
* **Settings**
    * Fix resizing bug.
* **Tooltip**
    * Fix resizing bug that causes content to disappear when tab width is not computable or too large.

## Version 0.0.16
* **Add Script**
    * Minor improvements.
* **Config**
    * Users can now set configuration from meta block, or from script tag.
* **Core**
    * Major renaming to reduce min size.
    * Renamed jMod and changed css namespce to .jmod-na.
* **DOMTiming**
    * renamed variables and added jModReady
* **Log**
    * Consolidated similar functions.
    * Added dir and dirxml functions.
* **Script Info**
    * Moved into a "jMod.ScriptInfo" function.
* **URLBuilder**
    * History begins.
* **Versions**
    * History begins.
* **_call**
    * History begins.

## Version 0.0.15
* **Config**
    * Fixed jMod.Config properties being added twice.
* **Core**
    * Added GM_Storage for cross-domain storage.
    * Created preprocessor macros.
    * Added more debugging information.
    * Updated requirements to be more flexible.
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
* **Element**
    * Added documentation.
    * Created jMod.Element namespace and function.
* **Events**
    * Fixed addListener bug, preventing
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
* **GM_Storage**
    * History begins.
* **Initialize**
    * Speed improvements.
* **LocalStorage**
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
* **Log**
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
* **Modal**
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
    * Created a backdrop for each Modal instead of one for all modals.
* **Notifications**
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
* **Proto**
    * Added jMod.Extend.
* **Script Info**
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
* **SendMessage**
    * History begins.
* **Settings**
    * History begins.
* **Tooltip**
    * History begins.
    * History begins.
* **Update**
    * Removed ref to jMod.fn (\_\_proto\_\_ is depreciated).
    * Updated to use jMod.SendMessage

## Version 0.0.14
* **Core**
    * Started documentation overhaul
    * Automated initialization for things like script_name and username by parsing the given metablock
* **Date**
    * History begins.
* **Element**
    * History begins.
* **Events**
    * Changed to jMod.Events.
    * Added more DOM events.
* **Initialize**
    * History begins.
* **Log**
    * Removed "Debug" from list of functions mapped to jMod.
    * Minor fixes / improvements.
* **Modal**
    * History begins.
* **Notifications**
    * History begins.
* **Proto**
    * Added URLBuilder Class.
    * Updated URLBuilder so instanceof can be used.
* **Script Info**
    * Fixed GM_info cloning process.
* **Update**
    * History begins.
    * Changed jMod.UPDATE to jMod.Update.
    * Fixed bug that caused callbacks to fire twice.

## Version 0.0.13
* **Add Style**
    * Added GM_addStyle if it exists.
* **Content Eval**
    * History begins.
* **Log**
    * Fixed output to the Web Console using GM_log.
* **Proto**
    * Fixed mCloneInto return value.

## Version 0.0.11
* **Config**
    * Added XMLHttpRequest.
* **Core**
    * Added XMLHttpRequest for update checks / stat collecting
    * Enabled function calls through jMod() function

## Version 0.0.10
* **Core**
    * Speed / safety improvements

## Version 0.0.9
* **Add Script**
    * History begins.
* **Add Style**
    * History begins.
* **Config**
    * History begins.
* **Core**
    * History begins.
* **DOMTiming**
    * History begins.
* **Error**
    * History begins.
* **Events**
    * History begins.
* **LocalStorage**
    * History begins.
* **Log**
    * History begins.
* **Parse Meta**
    * History begins.
* **Proto**
    * History begins.
* **Script Info**
    * History begins.
