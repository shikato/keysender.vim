# keysender.vim
![demo1](https://qiita-image-store.s3.amazonaws.com/0/47437/2ab5c30c-ec0a-61a8-7174-24a9bd983b8d.gif) 

![demo2](https://qiita-image-store.s3.amazonaws.com/0/47437/786ff3ab-5b09-9169-2653-7619043a4196.gif)

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

### Example

#### Basic
If you want to send Chrome [a]
```
:Keysender a
```
#### Plural & Change target application
If you want to send Safari [abc], [d], [ef] 
```
:KeysenderSetTargetAppName Safari
:Keysender abc d ef
```
#### Attribute Key
If you want to send Chrome [a + ctrl], [bc + command + option], [e + shift] 
```
:Keysender a,c bc,d,a e,s
```

| Key | Description |
|:-----------|------------:|
| c|ctrl |
| d |command |
| a |option |
| s |shift |

#### Key code
:Keysender can send [key code](http://hyslog.com/blog/2012/06/25/569) of Mac.
```
:Keysender 2,c,a
```
You can know the key code by this command.
```
grep 'kVK_.*=' /System/Library/Frameworks/Carbon.framework/Frameworks/HIToolbox.framework/Headers/Events.h
```

[Introductory article]()

## License
MIT
