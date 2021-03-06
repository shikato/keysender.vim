let s:save_cpo = &cpo
set cpo&vim 


let s:TYPE_KEYSTROKE = "1" 
let s:TYPE_KEY_CODE = "2"

" デフォルトMacVim 
let s:vimAppName = "MacVim"
" デフォルトChrome 
let s:targetAppName = "Chrome"
let s:scriptsDir = expand('<sfile>:p:h')


function! keysender#SendKey2AppWithKeystroke(...) 
  let argv = join(a:000, " ")
  echo argv
  call system("osascript -l JavaScript " . s:scriptsDir . "/../jxa/keysender.js " . s:TYPE_KEYSTROKE . " " . s:targetAppName ." " . s:vimAppName ." " . argv . "> /dev/null 2>&1")  
endfunction 

function! keysender#SendKey2AppWithKeyCode(...) 
  let argv = join(a:000, " ")
  echo argv
  call system("osascript -l JavaScript " . s:scriptsDir . "/../jxa/keysender.js " . s:TYPE_KEY_CODE . " " . s:targetAppName ." " . s:vimAppName ." " . argv . "> /dev/null 2>&1")  
endfunction 

function! keysender#SetTargetAppName(appName) 
  let s:targetAppName = a:appName
endfunction 

function! keysender#SetVimAppName(appName) 
  let s:vimAppName = a:appName
endfunction 


let &cpo = s:save_cpo
unlet s:save_cpo
