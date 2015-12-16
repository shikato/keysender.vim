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
If you want to send Chrome [m + ctrl + option], [v + command + shift], [abcde]
```
:Keysender m,c,a v,d,s abcde
```
:Keysender can send [key code](http://hyslog.com/blog/2012/06/25/569) of Mac.
```
:Keysender 2,c,a
```

## License
MIT
