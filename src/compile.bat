@ECHO OFF
CLS

ECHO. Delete Temp File
IF EXIST "tmp\MUJS.TMP.js" del "tmp\MUJS.TMP.js"

ECHO. Make Temp File
copy MUJS.PREFIX.js+MUJS.CONFIG.js+MUJS.UPDATE.js+MUJS.ERROR.js+MUJS.SUFFIX.js tmp\MUJS.TMP.js /B

ECHO. Compile...
java -jar compiler.jar --compilation_level SIMPLE_OPTIMIZATIONS --js_output_file=bin\MUJS.js --js tmp\MUJS.TMP.js

IF EXIST "..\MUJS.js" del "..\MUJS.js"
copy "bin\MUJS.js" "..\MUJS.js" /B
