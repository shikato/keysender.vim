var generateKeyObjects = function (keysFromVim) {
  var keyObjects = [];

  for (var i = 0; i < keysFromVim.length; i++) { 

    var keyObject = {};
    keyObject.key = ""; 
    keyObject.keyCode = [];
    keyObject.isKeyCode = false; 
    keyObject.usingObject = {};
    keyObject.usingObject.using = []; 

    var splitKeys = keysFromVim[i].split(","); 
    if (!isValidKey(splitKeys)) return "";

    if (isKeyCode(splitKeys[0])) { 
      keyObject.isKeyCode = true;
      keyObject.keyCode.push(Number(splitKeys[0]));
    } else { 
      keyObject.key = splitKeys[0];
    }

    for (var k = 1; k < splitKeys.length; k++) { 
      var usingKey = getUsingKey(splitKeys[k]); 
      if (usingKey !== "") { 
        keyObject.usingObject.using.push(usingKey);   
      } 
    }

    keyObjects.push(keyObject); 
  }

  return keyObjects;
}; 

var isKeyCode = function (keyCode) {
  var keyCodeRe = /^\d{1,3}$/;
  if (keyCode.match(keyCodeRe)) return true;
  return false; 
}

var isValidKey = function (splitKeys) {
  if (splitKeys.length > 5) return false;
  
  var usingKeyRe = /c|d|a|s/;

  for (var i = 0; i < splitKeys.length; i++) {
    if (i === 0) { 
      // とりあえず空以外は許容とする
      if (splitKeys[i] === null || splitKeys[i] === "") {
        console.log("invalid key:" + splitKeys[i]);
        return false;
      } 
    } else {
      if (!splitKeys[i].match(usingKeyRe)) { 
        console.log("invalid key:" + splitKeys[i]);
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
    } else { 
      count += 1;
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
  var keysFromVim = [];

  for (var i = 0; i < argv.length; i++) { 
    if (i === 0) {
      targetAppName = argv[i];
    } else if (i === 1) { 
      vimAppName = argv[i];
    } else {
      keysFromVim.push(argv[i]);
    }
  }

  var keys = generateKeyObjects(keysFromVim); 
  if (keys === "") return;

  sendKey(keys, targetAppName, vimAppName);
}

