# keysender.vim
DEMO

Keysender is a plugin to send an application key events.

``` 
This plugin is available only in Mac.
The reason why is because this plugin uses JXA.
```

## Install
#### ex. [NeoBundle](https://github.com/Shougo/neobundle.vim)
.vimrc
```
NeoBundle 'shikato/keysender.vim'
```

## Usage
| Command | Action |
|:-----------|------------:|
| :Keysender |The command sends an application key events|
| :KeysenderSetTargetAppName something |The command sets Target Application Name. (Default: Chrome)|
| :KeysenderSetVimAppName something |The command sets Vim Application Name. (Default: MacVim)|

### :Keysender
ex1) If you want to send Chrome [m + ctrl + aption] & [v + command + shift]
```
:Keysender m,c,a v,d,s
```

## License
MIT
