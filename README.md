# keysender.vim
Keysender is Vim plugin to send an application key events.

![demo1](https://qiita-image-store.s3.amazonaws.com/0/47437/2ab5c30c-ec0a-61a8-7174-24a9bd983b8d.gif) 

![demo2](https://qiita-image-store.s3.amazonaws.com/0/47437/786ff3ab-5b09-9169-2653-7619043a4196.gif)

``` 
You can use this software only in Mac.
Because this software uses JXA.
```

## Download
#### ex. [NeoBundle](https://github.com/Shougo/neobundle.vim)
.vimrc
```
NeoBundle 'shikato/keysender.vim'
```

## Usage
| Command | Action |
|:-----------|------------:|
| :KeysenderKeystroke ...something|The command sends an application keystroke. |
| :KeysenderKeyCode ...something|The command sends an application key code.|
| :KeysenderSetTargetAppName something |The command sets target application name. (Default: Chrome)|
| :KeysenderSetVimAppName something |The command sets Vim application name. (Default: MacVim)|

### Example

#### Basic
If you want to send Chrome [a]
```
:KeysenderKeystroke a
```
#### Plural & Change target application
If you want to send Safari [abc], [d], [ef] 
```
:KeysenderSetTargetAppName Safari
:KeysenderKeystroke abc d ef
```
#### Attribute Key
If you want to send Chrome [a + ctrl], [bc + command + option], [e + shift] 
```
:KeysenderKeystroke a,c bc,d,a e,s
```

| Key | Description |
|:-----------|------------:|
| c |ctrl |
| d |command |
| a |option |
| s |shift |

#### Key code
Keysender can send [key code](http://hyslog.com/blog/2012/06/25/569) of Mac.
```
:KeysenderTypeKeyCode 2,c,a
```
You can know the key code by this command.
```
grep 'kVK_.*=' /System/Library/Frameworks/Carbon.framework/Frameworks/HIToolbox.framework/Headers/Events.h
```

## Other documents
[Qiita](http://qiita.com/shikato/items/2e8af1330e3ac8949279)

## License
MIT
