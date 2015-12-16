if exists("g:loaded_keysender")
  finish
endif
let g:loaded_vimtask = 1

let s:save_cpo = &cpo
set cpo&vim 


command! -nargs=* Keysender call keysender#SendKey2App(<f-args>) 
command! -nargs=1 KeysenderSetTargetApp call keysender#SetTargetApp(<f-args>) 
command! -nargs=1 KeysenderSetVimApp call keysender#SetVimApp(<f-args>) 


let &cpo = s:save_cpo
unlet s:save_cpo
