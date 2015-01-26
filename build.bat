@ECHO OFF
cls
setlocal enabledelayedexpansion

:: Use this batch file to set default arguments that can be overridden by command line params

set paramIndex=0
set paramValue=EMPTY

set JMOD_VERSION=0.0.18
set COPY_OUTPUT_TO=C:\Users\Spud\AppData\Roaming\Mozilla\Firefox\Profiles\hatqckbp.Dev\gm_scripts\Anti-Pagination\jMod.js
set JSDOC_DIR=F:\Software\jsdoc

set IS_DEBUG=0
set IS_BETA=0
set IS_RELEASE=0
set MAKE_JSDOC=0
set MINIFY=0

set TEST=0

set lastReturned=EMPTY


call:isInArgs "-v" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set JMOD_VERSION=%paramValue%)

call:isInArgs "-d" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set IS_DEBUG=1)

call:isInArgs "-b" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set IS_BETA=1)

call:isInArgs "-r" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set IS_RELEASE=1)

call:isInArgs "-doc" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set MAKE_JSDOC=1)

call:isInArgs "-m" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set MINIFY=1)

call:isInArgs "-test" paramIndex paramValue %*
IF /I "%paramIndex%" NEQ "0" (call set TEST=%paramValue%)


set INTRO_TEXT=Compiling jMod %JMOD_VERSION%


IF /I "%MAKE_JSDOC%" NEQ "0" echo Make JSDoc

set ARGS=-v %JMOD_VERSION% -cp "%COPY_OUTPUT_TO%"

IF /I "%IS_DEBUG%" NEQ "0" (call set ARGS=%ARGS% -d)&&(call set INTRO_TEXT=%INTRO_TEXT% [debug])
IF /I "%IS_BETA%" NEQ "0" (call set ARGS=%ARGS% -b)&&(call set INTRO_TEXT=%INTRO_TEXT% [beta])
IF /I "%IS_RELEASE%" NEQ "0" (call set ARGS=%ARGS% -r)&&(call set INTRO_TEXT=%INTRO_TEXT% [release])
IF /I "%MINIFY%" NEQ "0" (call set ARGS=%ARGS% -m)&&(call set INTRO_TEXT=%INTRO_TEXT% [minify])
IF /I "%MAKE_JSDOC%" NEQ "0" (call set ARGS=%ARGS% -doc "%JSDOC_DIR%")&&(call set INTRO_TEXT=%INTRO_TEXT% [make doc])

IF /I "%TEST%" NEQ "0" (call set ARGS=%ARGS% -test "%TEST%")&&(call set INTRO_TEXT=%INTRO_TEXT% [test:%TEST%])

echo.&echo %INTRO_TEXT%

echo args: %ARGS%

START /B /I /WAIT /HIGH build.py %ARGS%

goto ENDPRGM

:isInArgs
	set %~2=0
	set %~3=EMPTY
	set argCount=-3
	for %%x in (%*) do (
		set /A argCount+=1
		set "argVec[!argCount!]=%%~x"
	)
	for /L %%i in (1,1,%argCount%) do (
		set /A x = %%i + 1
		call set y=%%argVec[!x!]%%
		IF /I "%~1" EQU "!argVec[%%i]!" (set %~2=%%i&set %~3=!y!&goto:isInArgs_End)
	)
:isInArgs_End
goto:eof

:isInArgs2
	set %~2=0
	set %~3=EMPTY
	set argCount=-3
	for %%x in (%*) do (
		set /A argCount+=1
		set /A argCount2=!argCount! - 1
		set "argVec[!argCount!]=%%~x"
		set "argVec2[!argCount2!]=%%~x"
	)
	for /L %%i in (1,1,%argCount%) do (
		IF /I "%~1" EQU "!argVec[%%i]!" (set %~2=%%i&set %~3=!argVec2[%%i]!&goto:isInArgs2_End)
	)
:isInArgs2_End
goto:eof

:ENDPRGM
endlocal