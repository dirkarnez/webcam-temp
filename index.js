(function e(t,n){if(typeof exports==="object"&&typeof module==="object")module.exports=n();else if(typeof define==="function"&&define.amd)define([],n);else{var r=n();for(var i in r)(typeof exports==="object"?exports:t)[i]=r[i]}})(this,function(){return function(e){var t={};function n(r){if(t[r]){return t[r].exports}var i=t[r]={i:r,l:false,exports:{}};e[r].call(i.exports,i,i.exports,n);i.l=true;return i.exports}n.m=e;n.c=t;n.d=function(e,t,r){if(!n.o(e,t)){Object.defineProperty(e,t,{configurable:false,enumerable:true,get:r})}};n.n=function(e){var t=e&&e.__esModule?function t(){return e["default"]}:function t(){return e};n.d(t,"a",t);return t};n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)};n.p="";return n(n.s=0)}({"./src/demo/AppSimpleVanillaJs.js":function(e,t,n){"use strict";var r=n("./src/lib/index.js");var i=n("./src/demo/styles.css");var a=n.n(i);var o=document.getElementById("videoId");var c=document.getElementById("imgId");var s=document.getElementById("facingModeSelectId");var u=document.getElementById("startDefaultAllButtonId");var d=document.getElementById("startDefaultResolutionButtonId");var l=document.getElementById("startMaxResolutionId");var f=document.getElementById("takePhotoButtonId");var v=document.getElementById("takePhotoAndDownloadButtonId");var m=document.getElementById("stopCameraButtonId");var h=document.getElementById("cameraSettingsId");var g=document.getElementById("showSwitchCameraButtonsId");var p=document.getElementById("showDebugPlatformInfoButtonId");var w=new r["d"](o);function b(){w.startCamera().then(function(){var e="Camera started with default All";console.log(e)}).catch(function(e){console.error("Camera not started!",e)})}function C(){var e=s.value;w.startCamera(r["a"][e]).then(function(){var t="Camera started with default resolution and "+("prefered facingMode : "+e);console.log(t)}).catch(function(e){console.error("Camera not started!",e)})}function y(){var e=1;var t=r["b"].JPG;var n=1;var i={sizeFactor:e,imageType:t,imageCompression:n};var a=w.getDataUri(i);c.src=a}function M(){var e=1;var t=r["b"].JPG;var n=1;var i={sizeFactor:e,imageType:t,imageCompression:n};var a=w.getDataUri(i);Object(r["e"])(a,"myPhoto",1);c.src=a}function P(){var e=w.getCameraSettings();var t="No active camera";if(e){var n=e.aspectRatio,r=e.frameRate,i=e.height,a=e.width;t="\n        <b>Current active camera:</b>\n        aspectRatio:"+n+"\n        frameRate: "+r+"\n        height: "+i+"\n        width: "+a+"\n    "}h.innerHTML=t}function j(){w.enumerateCameras().then(function(e){if(e&&e.length>0){var t=document.getElementById("cameraButtonsContainerId");t.innerHTML="";var n=document.createElement("h3");n.innerText="Choose your camera :";t.appendChild(n);e.forEach(function(e){var n=e.kind,r=e.label,i=e.deviceId;var a=document.createElement("button");a.innerHTML="\n            kind: "+n+" <br/>\n            label: "+r+" <br/>\n            deviceId: "+i+"\n          ";(function(e){a.addEventListener("click",function(){console.log("click on",e);E(e)})})(i);t.appendChild(a)})}}).catch(function(e){console.log("Error could not enumerateCameras:",e)})}function I(){w.stopCamera().then(function(){console.log("Camera stoped!")}).catch(function(e){console.log("No camera to stop!:",e)})}function E(e){w.startCameraMaxResolution(e).then(function(){var t="Camera started with maximum resoluton and "+("prefered deviceId: "+e+" ");console.log(t)}).catch(function(e){console.error("Camera not started!",e)})}function S(){var e=s.value;w.startCameraMaxResolution(r["a"][e]).then(function(){var t="Camera started with maximum resoluton and "+("prefered facingMode: "+e+" ");console.log(t)}).catch(function(e){console.error("Camera not started!",e)})}function k(){var e=document.getElementById("debugPlatformInfoId");e.innerHTML=JSON.stringify(Object(r["c"])(),null,2)}document.addEventListener("DOMContentLoaded",function(){setInterval(function(){P()},500);u.onclick=b;d.onclick=C;l.onclick=S;f.onclick=y;v.onclick=M;m.onclick=I;g.onclick=j;p.onclick=k})},"./src/demo/index.js":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:true});var r=n("./src/demo/AppSimpleVanillaJs.js")},"./src/demo/styles.css":function(e,t){},"./src/lib/CameraPhoto/CameraPhoto.js":function(e,t,n){"use strict";n.d(t,"a",function(){return s});var r=n("./src/lib/CameraPhoto/MediaServices/index.js");var i=n("./src/lib/CameraPhoto/constants.js");var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(t,n,r){if(n)e(t.prototype,n);if(r)e(t,r);return t}}();function o(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var c=r["a"].IMAGE_TYPES.PNG;var s=function(){function e(t){o(this,e);this.videoElement=t;this.stream=null;this.numberOfMaxResolutionTry=0;this.settings=null;this.cameras=[];this.windowURL=r["a"].getWindowURL();this.mediaDevices=r["a"].getNavigatorMediaDevices()}a(e,[{key:"_getStreamDevice",value:function e(t,n){var i=this;return new Promise(function(e,a){var o=r["a"].getIdealConstraints(t,n);i.mediaDevices.getUserMedia(o).then(function(t){i._gotStream(t);e(t)}).catch(function(e){a(e)})})}},{key:"_getStreamDeviceMaxResolution",value:function e(t){var n=this;var i=r["a"].getMaxResolutionConstraints(t,this.numberOfMaxResolutionTry);if(i==null){var a={};return this._getStreamDevice(t,a)}return new Promise(function(e,r){n.mediaDevices.getUserMedia(i).then(function(t){n._gotStream(t);e(t)}).catch(function(e){setTimeout(function(){n.numberOfMaxResolutionTry+=1;n._getStreamDeviceMaxResolution(t).catch(function(){r(e)})},20)})})}},{key:"_setVideoSrc",value:function e(t){if("srcObject"in this.videoElement){this.videoElement.srcObject=t}else{var n=this.windowURL.createObjectURL(t);this.videoElement.src=n}}},{key:"_setSettings",value:function e(t){this.settings=null;var n=t&&t.getTracks?t.getTracks():[];if(n.length>0&&n[0].getSettings){this.settings=n[0].getSettings()}}},{key:"_enumerateCamerasPromise",value:function e(){var t=this;return new Promise(function(e,n){var r=[];t.mediaDevices.enumerateDevices().then(function(t){t.forEach(function(e){if(e.kind==="videoinput"&&e.deviceId){r.push(e)}});e(r)}).catch(function(e){n(e)})})}},{key:"_gotStream",value:function e(t){this.stream=t;this._setSettings(t);this._setVideoSrc(t)}},{key:"getCameraSettings",value:function e(){return this.settings}},{key:"enumerateCameras",value:function e(){var t=this;if(this.stream){return this._enumerateCamerasPromise()}return this.stopCamera().then(function(){}).catch(function(){}).then(function(){var e={video:true};return t.mediaDevices.getUserMedia(e).then(function(e){setTimeout(function(){e.getTracks().forEach(function(e){e.stop()})},20)}).then(function(){}).catch(function(){}).then(function(){return t._enumerateCamerasPromise()})})}},{key:"startCamera",value:function e(t,n){var r=this;return this.stopCamera().then(function(){}).catch(function(){}).then(function(){return r._getStreamDevice(t,n)})}},{key:"startCameraMaxResolution",value:function e(){var t=this;var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";this.numberOfMaxResolutionTry=0;return this.stopCamera().then(function(){}).catch(function(){}).then(function(){return t._getStreamDeviceMaxResolution(n)})}},{key:"getDataUri",value:function e(t){var n={sizeFactor:t.sizeFactor===undefined?i["c"]:t.sizeFactor,imageType:t.imageType===undefined?c:t.imageType,imageCompression:t.imageCompression===undefined?i["a"]:t.imageCompression,isImageMirror:t.isImageMirror===undefined?i["b"]:t.isImageMirror};var a=r["a"].getDataUri(this.videoElement,n);return a}},{key:"stopCamera",value:function e(){var t=this;return new Promise(function(e,n){if(t.stream){t.stream.getTracks().forEach(function(e){e.stop()});t.videoElement.src="";t.stream=null;t._setSettings(null);e()}n(Error("no stream to stop!"))})}}]);return e}()},"./src/lib/CameraPhoto/MediaServices/MediaServices.js":function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n("./src/lib/CameraPhoto/MediaServices/helper.js");var i=n("./src/lib/CameraPhoto/MediaServices/constants.js");var a=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||false;r.configurable=true;if("value"in r)r.writable=true;Object.defineProperty(e,r.key,r)}}return function(t,n,r){if(n)e(t.prototype,n);if(r)e(t,r);return t}}();function o(e,t){if(!(e instanceof t)){throw new TypeError("Cannot call a class as a function")}}var c=function(){function e(){o(this,e)}a(e,null,[{key:"getDataUri",value:function e(t,n){var i=n.sizeFactor,a=n.imageType,o=n.imageCompression,c=n.isImageMirror;var s=t.videoWidth,u=t.videoHeight;var d=Object(r["c"])(s,u,i),l=d.imageWidth,f=d.imageHeight;var v=document.createElement("canvas");v.width=l;v.height=f;var m=v.getContext("2d");if(c){m.setTransform(-1,0,0,1,v.width,0)}m.drawImage(t,0,0,l,f);var h=Object(r["b"])(v,a,o);return h}},{key:"getWindowURL",value:function e(){var t=window.URL||window.webkitURL||window.mozURL||window.msURL;return t}},{key:"getNavigatorMediaDevices",value:function e(){var t=null;var n=!!(navigator.mediaDevices&&navigator.mediaDevices.getUserMedia);var r=!!(navigator.mozGetUserMedia||navigator.webkitGetUserMedia);if(n){t=navigator.mediaDevices}else if(r){var i=navigator.mozGetUserMedia||navigator.webkitGetUserMedia;var a={getUserMedia:function e(t){return new Promise(function(e,n){i.call(navigator,t,e,n)})}};t=Object.assign(i,a)}return t}},{key:"isSupportedFacingMode",value:function t(){return e.getNavigatorMediaDevices().getSupportedConstraints().facingMode}},{key:"getIdealConstraints",value:function t(n,a){if(!Object(r["e"])(n,a)){return i["d"]}var o=e.getNavigatorMediaDevices().getSupportedConstraints();if(!o.width||!o.height){console.error("Constraint width or height not supported! fallback to default resolution");return i["d"]}var c=void 0;var s=void 0;if(n){var u=i["e"].includes(n);if(u){c=n}else{s={exact:n}}}var d=a&&a.width;var l=a&&a.height;return{audio:false,video:{facingMode:c,deviceId:s,width:d,height:l}}}},{key:"getMaxResolutionConstraints",value:function t(){var n=arguments.length>0&&arguments[0]!==undefined?arguments[0]:"";var i=arguments[1];console.warn("getMaxResolutionConstraints() numberOfMaxResolutionTry:",i);var a=[{width:{min:640}},{width:{min:800}},{width:{min:900}},{width:{min:1024}},{width:{min:1080}},{width:{min:1280}},{width:{min:1920}},{width:{min:2560}},{width:{min:3840}},{width:{min:4096}},{width:{min:4640}},{width:{min:5120}},{width:{min:5760}},{width:{min:6400}},{width:{min:7680}}];var o=e.getIdealConstraints(n,{});if(i===0){if(Object(r["d"])()){console.warn("fallback to iOS constraints");var c=e.getIdealConstraints(n,{width:{min:640,ideal:3840},height:{min:480,ideal:2160}});return c}o.video.advanced=a;return o}if(i<a.length){var s=a.slice(0,-i);o.video.advanced=s;return o}return null}},{key:"FACING_MODES",get:function e(){return i["a"]}},{key:"IMAGE_TYPES",get:function e(){return i["c"]}}]);return e}()},"./src/lib/CameraPhoto/MediaServices/constants.js":function(e,t,n){"use strict";n.d(t,"e",function(){return c});n.d(t,"a",function(){return s});n.d(t,"f",function(){return l});n.d(t,"c",function(){return f});n.d(t,"b",function(){return v});n.d(t,"d",function(){return m});var r;function i(e,t,n){if(t in e){Object.defineProperty(e,t,{value:n,enumerable:true,configurable:true,writable:true})}else{e[t]=n}return e}var a="user";var o="environment";var c=[a,o];var s={USER:a,ENVIRONMENT:o};var u="png";var d="jpg";var l=[d,u];var f={PNG:u,JPG:d};var v=(r={},i(r,d,"image/jpeg"),i(r,u,"image/png"),r);var m={audio:false,video:true}},"./src/lib/CameraPhoto/MediaServices/helper.js":function(e,t,n){"use strict";t["c"]=s;t["b"]=u;t["e"]=d;t["d"]=l;t["a"]=f;var r=n("./src/lib/CameraPhoto/MediaServices/constants.js");function i(e,t){if(!(t>=0&&t<=1)){throw new Error(t+" is invalid imageCompression, choose between: [0, 1]")}if(!r["f"].includes(e)){throw new Error(e+" is invalid imageType, choose between: "+r["f"].join(", "))}return true}function a(e,t){var n={};try{i(e,t);n.imageType=e;n.imageCompression=t}catch(e){console.error(e);console.error("default value of "+r["c"].PNG+" is used");n.imageType=r["c"].PNG;n.imageCompression=null}return n}function o(){var e=window.navigator.platform;var t=window.navigator.userAgent;return e||t}function c(){return"ontouchend"in document}function s(e,t,n){var r=e*parseFloat(n);var i=e/r;var a=t/i;return{imageWidth:r,imageHeight:a}}function u(e,t,n){var i=a(t,n);if(i.imageType===r["c"].JPG){if(!n){return e.toDataURL(r["b"][r["c"].JPG])}return e.toDataURL(r["b"][r["c"].JPG],n)}return e.toDataURL(r["b"][t])}function d(e,t){return e||t}function l(){var e=o();if(/iPad|iPhone|iPod/.test(e)){return true}var t=c();if(/Mac/.test(e)&&t){return true}return false}function f(){return{userAgent:window.navigator.userAgent,platform:window.navigator.platform,_getStringWithPlatform:o(),_getHasTouchEvents:c(),getIsIOS:l()}}},"./src/lib/CameraPhoto/MediaServices/index.js":function(e,t,n){"use strict";var r=n("./src/lib/CameraPhoto/MediaServices/MediaServices.js");n.d(t,"a",function(){return r["a"]});var i=n("./src/lib/CameraPhoto/MediaServices/helper.js");n.d(t,"b",function(){return i["a"]})},"./src/lib/CameraPhoto/constants.js":function(e,t,n){"use strict";n.d(t,"c",function(){return r});n.d(t,"a",function(){return i});n.d(t,"b",function(){return a});var r=1;var i=null;var a=false},"./src/lib/CameraPhoto/index.js":function(e,t,n){"use strict";n.d(t,"b",function(){return a});n.d(t,"c",function(){return o});var r=n("./src/lib/CameraPhoto/MediaServices/index.js");var i=n("./src/lib/CameraPhoto/CameraPhoto.js");n.d(t,"a",function(){return i["a"]});n.d(t,"d",function(){return r["b"]});var a=r["a"].FACING_MODES;var o=r["a"].IMAGE_TYPES},"./src/lib/index.js":function(e,t,n){"use strict";var r=n("./src/lib/CameraPhoto/index.js");n.d(t,"a",function(){return r["b"]});n.d(t,"b",function(){return r["c"]});n.d(t,"c",function(){return r["d"]});var i=n("./src/lib/plugins/index.js");n.d(t,"e",function(){return i["a"]});t["d"]=r["a"]},"./src/lib/plugins/downloadPhoto.js":function(e,t,n){"use strict";t["a"]=u;var r=n("./src/lib/CameraPhoto/index.js");function i(e){var t=atob(e.split(",")[1]);var n=e.split(",")[0].split(":")[1].split(";")[0];var r=new ArrayBuffer(t.length);var i=new Uint8Array(r);for(var a=0;a<t.length;a++){i[a]=t.charCodeAt(a)}var o=new Blob([r],{type:n});return o}function a(e,t){e=e+"";return e.length>=t?e:new Array(t-e.length+1).join("0")+e}function o(e){var t=r["c"].PNG;if(e==="image/jpeg"){t=r["c"].JPG}return t}function c(e,t,n){var r=a(t,4);var i=o(n);return e+"-"+r+"."+i}function s(e,t,n){window.URL=window.webkitURL||window.URL;var r=document.createElement("a");r.download=c(t,n,e.type);r.href=window.URL.createObjectURL(e);var i=document.createEvent("MouseEvents");i.initMouseEvent("click",true,true,window,1,0,0,0,0,false,false,false,false,0,null);r.dispatchEvent(i)}function u(e){var t=arguments.length>1&&arguments[1]!==undefined?arguments[1]:"photo";var n=arguments.length>2&&arguments[2]!==undefined?arguments[2]:0;var r=i(e);s(r,t,n)}},"./src/lib/plugins/index.js":function(e,t,n){"use strict";var r=n("./src/lib/plugins/downloadPhoto.js");n.d(t,"a",function(){return r["a"]})},0:function(e,t,n){e.exports=n("./src/demo/index.js")}})});
//# sourceMappingURL=index.js.map