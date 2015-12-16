var generateKeyObjects = function (keysFromVimArray) {
  var retKeys = [];

  for (var i = 0; i < keysFromVimArray.length; i++) { 

    var keyObject = {};
    keyObject.key = ""; 
    keyObject.keyCode = [];
    keyObject.isKeyCode = false; 
    keyObject.usingObject = {};
    keyObject.usingObject.using = []; 

    var splitKeyArray = keysFromVimArray[i].split(","); 
    if (!isValidKey(splitKeyArray)) return "";

    if (isKeyCode(splitKeyArray[0])) { 
      keyObject.isKeyCode = true;
      keyObject.keyCode.push(Number(splitKeyArray[0]));
    } else { 
      keyObject.key = splitKeyArray[0];
    }

    for (var k = 1; k < splitKeyArray.length; k++) { 
      var usingKey = getUsingKey(splitKeyArray[k]); 
      if (usingKey !== "") { 
        keyObject.usingObject.using.push(usingKey);   
      } 
    }

    retKeys.push(keyObject); 
  }

  return retKeys;
}; 

var isKeyCode = function (keyCode) {
  var keyCodeRe = /^\d{1,3}$/;
  if (keyCode.match(keyCodeRe)) return true;
  return false; 
}

var isValidKey = function (splitKeyArray) {
  if (splitKeyArray.length > 5) return false;
  
  var usingKeyRe = /c|d|a|s/;

  for (var i = 0; i < splitKeyArray.length; i++) {
    if (i === 0) { 
      // とりあえず空以外は許容とする
      if (splitKeyArray[i] === null || splitKeyArray[i] === "") {
        console.log("invalid key:" + splitKeyArray[i]);
        return false;
      } 
    } else {
      if (!splitKeyArray[i].match(usingKeyRe)) { 
        console.log("invalid key:" + splitKeyArray[i]);
        return false;
      }
    } 
  }

  return true;
};

var getUsingKey = function (usingKey) { 
  if (usingKey === "c") {
    return "control down";
  } else if (usingKey === "s") {
    return "shift down";
  } else if (usingKey === "a") {
    return "option down";
  } else if (usingKey === "d") { 
    return "command down";
  }
  return "";
};


var sendKey = function (keyObjects, targetAppName, vimAppName) {
  var targetApp = null; 
  var vimApp = null; 
  try { 
    targetApp = Application(targetAppName); 
    vimApp = Application(vimAppName); 
  } catch(e) {
    console.log(e);
    return;
  }

  var systemEvent = Application("System Events");
  targetApp.activate();

  var delayTime = 0.3;
//  var keyCount = getKeyCount(keyObjects);
//  if (keyCount > 5) {
//    delayTime = 0.1 * keyCount;
//  } 
  delay(delayTime); 

  keyObjects.forEach(function(keyObject) { 
    if (keyObject.isKeyCode) { 
      doKeyCode(systemEvent, keyObject);
    } else { 
      doKeystroke(systemEvent, keyObject);
    }
  });

  vimApp.activate(); 
}; 

var getKeyCount = function (keyObjects) {
  var count = 0;
  
  keyObjects.forEach(function (keyObject) {
    if (!keyObject.isKeyCode) { 
      count += keyObject.key.length;
    }
  }); 

  return count;
}

var doKeystroke = function (systemEvent, keyObject) {
  systemEvent.keystroke(keyObject.key, keyObject.usingObject); 
};

var doKeyCode = function (systemEvent, keyObject) { 
  systemEvent.keyCode(keyObject.keyCode, keyObject.usingObject); 
}; 


// argv[0]はtargetAppName
// argv[1]はvimAppName
// それ移行はkey
function run(argv){ 
  if (argv.length < 3) {
    console.log("Arguments are necessary more than 3.");
    return; 
  }

  var targetAppName = null;
  var vimAppName = null;
  var keyArrayFromVim = [];

  for (var i = 0; i < argv.length; i++) { 
    if (i === 0) {
      targetAppName = argv[i];
    } else if (i === 1) { 
      vimAppName = argv[i];
    } else {
      keyArrayFromVim.push(argv[i]);
    }
  }

  var keys = generateKeyObjects(keyArrayFromVim); 
  if (keys === "") return;

  sendKey(keys, targetAppName, vimAppName);
}

