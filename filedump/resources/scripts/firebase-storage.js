!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?t(require("@firebase/app")):"function"==typeof define&&define.amd?define(["@firebase/app"],t):t((e=e||self).firebase)}(this,function(nt){"use strict";try{(function(){function e(r,n){var o,i,a,e,s={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return e={next:t(0),throw:t(1),return:t(2)},"function"==typeof Symbol&&(e[Symbol.iterator]=function(){return this}),e;function t(t){return function(e){return function(t){if(o)throw new TypeError("Generator is already executing.");for(;s;)try{if(o=1,i&&(a=2&t[0]?i.return:t[0]?i.throw||((a=i.return)&&a.call(i),0):i.next)&&!(a=a.call(i,t[1])).done)return a;switch(i=0,a&&(t=[2&t[0],a.value]),t[0]){case 0:case 1:a=t;break;case 4:return s.label++,{value:t[1],done:!1};case 5:s.label++,i=t[1],t=[0];continue;case 7:t=s.ops.pop(),s.trys.pop();continue;default:if(!(a=0<(a=s.trys).length&&a[a.length-1])&&(6===t[0]||2===t[0])){s=0;continue}if(3===t[0]&&(!a||t[1]>a[0]&&t[1]<a[3])){s.label=t[1];break}if(6===t[0]&&s.label<a[1]){s.label=a[1],a=t;break}if(a&&s.label<a[2]){s.label=a[2],s.ops.push(t);break}a[2]&&s.ops.pop(),s.trys.pop();continue}t=n.call(r,s)}catch(e){t=[6,e],i=0}finally{o=a=0}if(5&t[0])throw t[1];return{value:t[0]?t[1]:void 0,done:!0}}([t,e])}}}nt=nt&&nt.hasOwnProperty("default")?nt.default:nt;var p="firebasestorage.googleapis.com",h="storageBucket",b=(t.prototype.codeProp=function(){return this.code},t.prototype.codeEquals=function(e){return r(e)===this.codeProp()},t.prototype.serverResponseProp=function(){return this.serverResponse_},t.prototype.setServerResponseProp=function(e){this.serverResponse_=e},Object.defineProperty(t.prototype,"name",{get:function(){return this.name_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"code",{get:function(){return this.code_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"message",{get:function(){return this.message_},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"serverResponse",{get:function(){return this.serverResponse_},enumerable:!0,configurable:!0}),t);function t(e,t){this.code_=r(e),this.message_="Firebase Storage: "+t,this.serverResponse_=null,this.name_="FirebaseError"}var m={UNKNOWN:"unknown",OBJECT_NOT_FOUND:"object-not-found",BUCKET_NOT_FOUND:"bucket-not-found",PROJECT_NOT_FOUND:"project-not-found",QUOTA_EXCEEDED:"quota-exceeded",UNAUTHENTICATED:"unauthenticated",UNAUTHORIZED:"unauthorized",RETRY_LIMIT_EXCEEDED:"retry-limit-exceeded",INVALID_CHECKSUM:"invalid-checksum",CANCELED:"canceled",INVALID_EVENT_NAME:"invalid-event-name",INVALID_URL:"invalid-url",INVALID_DEFAULT_BUCKET:"invalid-default-bucket",NO_DEFAULT_BUCKET:"no-default-bucket",CANNOT_SLICE_BLOB:"cannot-slice-blob",SERVER_FILE_WRONG_SIZE:"server-file-wrong-size",NO_DOWNLOAD_URL:"no-download-url",INVALID_ARGUMENT:"invalid-argument",INVALID_ARGUMENT_COUNT:"invalid-argument-count",APP_DELETED:"app-deleted",INVALID_ROOT_OPERATION:"invalid-root-operation",INVALID_FORMAT:"invalid-format",INTERNAL_ERROR:"internal-error"};function r(e){return"storage/"+e}function u(){return new b(m.UNKNOWN,"An unknown error occurred, please check the error payload for server response.")}function l(){return new b(m.CANCELED,"User canceled the upload/download.")}function g(){return new b(m.CANNOT_SLICE_BLOB,"Cannot slice blob for upload. Please retry the upload.")}function a(e,t,r){return new b(m.INVALID_ARGUMENT,"Invalid argument in `"+t+"` at index "+e+": "+r)}function c(){return new b(m.APP_DELETED,"The Firebase app was deleted.")}function f(e,t){return new b(m.INVALID_FORMAT,"String does not match format '"+e+"': "+t)}function i(e){throw new b(m.INTERNAL_ERROR,"Internal error: "+e)}var d={RAW:"raw",BASE64:"base64",BASE64URL:"base64url",DATA_URL:"data_url"};function s(e){switch(e){case d.RAW:case d.BASE64:case d.BASE64URL:case d.DATA_URL:return;default:throw"Expected one of the event types: ["+d.RAW+", "+d.BASE64+", "+d.BASE64URL+", "+d.DATA_URL+"]."}}var n=function(e,t){this.data=e,this.contentType=t||null};function _(e,t){switch(e){case d.RAW:return new n(o(t));case d.BASE64:case d.BASE64URL:return new n(v(e,t));case d.DATA_URL:return new n(function(e){var t=new y(e);return t.base64?v(d.BASE64,t.rest):function(e){var t;try{t=decodeURIComponent(e)}catch(e){throw f(d.DATA_URL,"Malformed data URL.")}return o(t)}(t.rest)}(t),function(e){return new y(e).contentType}(t))}throw u()}function o(e){for(var t=[],r=0;r<e.length;r++){var n=e.charCodeAt(r);if(n<=127)t.push(n);else if(n<=2047)t.push(192|n>>6,128|63&n);else if(55296==(64512&n))if(r<e.length-1&&56320==(64512&e.charCodeAt(r+1)))n=65536|(1023&n)<<10|1023&e.charCodeAt(++r),t.push(240|n>>18,128|n>>12&63,128|n>>6&63,128|63&n);else t.push(239,191,189);else 56320==(64512&n)?t.push(239,191,189):t.push(224|n>>12,128|n>>6&63,128|63&n)}return new Uint8Array(t)}function v(t,e){switch(t){case d.BASE64:var r=-1!==e.indexOf("-"),n=-1!==e.indexOf("_");if(r||n)throw f(t,"Invalid character '"+(r?"-":"_")+"' found: is it base64url encoded?");break;case d.BASE64URL:var o=-1!==e.indexOf("+"),i=-1!==e.indexOf("/");if(o||i)throw f(t,"Invalid character '"+(o?"+":"/")+"' found: is it base64 encoded?");e=e.replace(/-/g,"+").replace(/_/g,"/")}var a;try{a=atob(e)}catch(e){throw f(t,"Invalid character found")}for(var s=new Uint8Array(a.length),u=0;u<a.length;u++)s[u]=a.charCodeAt(u);return s}var y=function(e){this.base64=!1,this.contentType=null;var t=e.match(/^data:([^,]+)?,/);if(null===t)throw f(d.DATA_URL,"Must be formatted 'data:[<mediatype>][;base64],<data>");var r=t[1]||null;null!=r&&(this.base64=function(e,t){return e.length>=t.length&&e.substring(e.length-t.length)===t}(r,";base64"),this.contentType=this.base64?r.substring(0,r.length-";base64".length):r),this.rest=e.substring(e.indexOf(",")+1)};var w,R,T={STATE_CHANGED:"state_changed"},E="running",k="pausing",O="paused",U="success",A="canceling",x="canceled",C="error",S={RUNNING:"running",PAUSED:"paused",SUCCESS:"success",CANCELED:"canceled",ERROR:"error"};function N(e){switch(e){case E:case k:case A:return S.RUNNING;case O:return S.PAUSED;case U:return S.SUCCESS;case x:return S.CANCELED;case C:default:return S.ERROR}}function P(e){return null!=e}function L(e){return void 0!==e}function I(e){return"function"==typeof e}function D(e){return"object"==typeof e}function M(e){return"string"==typeof e||e instanceof String}function W(e){return"number"==typeof e||e instanceof Number}function B(e){return j()&&e instanceof Blob}function j(){return"undefined"!=typeof Blob}(R=w=w||{})[R.NO_ERROR=0]="NO_ERROR",R[R.NETWORK_ERROR=1]="NETWORK_ERROR",R[R.ABORT=2]="ABORT";var q=(F.prototype.send=function(e,t,r,n){if(this.sent_)throw i("cannot .send() more than once");if(this.sent_=!0,this.xhr_.open(t,e,!0),P(n))for(var o in n)n.hasOwnProperty(o)&&this.xhr_.setRequestHeader(o,n[o].toString());return P(r)?this.xhr_.send(r):this.xhr_.send(),this.sendPromise_},F.prototype.getErrorCode=function(){if(!this.sent_)throw i("cannot .getErrorCode() before sending");return this.errorCode_},F.prototype.getStatus=function(){if(!this.sent_)throw i("cannot .getStatus() before sending");try{return this.xhr_.status}catch(e){return-1}},F.prototype.getResponseText=function(){if(!this.sent_)throw i("cannot .getResponseText() before sending");return this.xhr_.responseText},F.prototype.abort=function(){this.xhr_.abort()},F.prototype.getResponseHeader=function(e){return this.xhr_.getResponseHeader(e)},F.prototype.addUploadProgressListener=function(e){P(this.xhr_.upload)&&this.xhr_.upload.addEventListener("progress",e)},F.prototype.removeUploadProgressListener=function(e){P(this.xhr_.upload)&&this.xhr_.upload.removeEventListener("progress",e)},F);function F(){var t=this;this.sent_=!1,this.xhr_=new XMLHttpRequest,this.errorCode_=w.NO_ERROR,this.sendPromise_=new Promise(function(e){t.xhr_.addEventListener("abort",function(){t.errorCode_=w.ABORT,e(t)}),t.xhr_.addEventListener("error",function(){t.errorCode_=w.NETWORK_ERROR,e(t)}),t.xhr_.addEventListener("load",function(){e(t)})})}var H=(z.prototype.createXhrIo=function(){return new q},z);function z(){}function G(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];var r="undefined"!=typeof BlobBuilder?BlobBuilder:"undefined"!=typeof WebKitBlobBuilder?WebKitBlobBuilder:void 0;if(void 0!==r){for(var n=new r,o=0;o<e.length;o++)n.append(e[o]);return n.getBlob()}if(j())return new Blob(e);throw Error("This browser doesn't seem to support creating Blobs")}var X=(V.prototype.size=function(){return this.size_},V.prototype.type=function(){return this.type_},V.prototype.slice=function(e,t){if(B(this.data_)){var r=function(e,t,r){return e.webkitSlice?e.webkitSlice(t,r):e.mozSlice?e.mozSlice(t,r):e.slice?e.slice(t,r):null}(this.data_,e,t);return null===r?null:new V(r)}return new V(new Uint8Array(this.data_.buffer,e,t-e),!0)},V.getBlob=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];if(j()){var r=e.map(function(e){return e instanceof V?e.data_:e});return new V(G.apply(null,r))}var n=e.map(function(e){return M(e)?_(d.RAW,e).data:e.data_}),o=0;n.forEach(function(e){o+=e.byteLength});var i=new Uint8Array(o),a=0;return n.forEach(function(e){for(var t=0;t<e.length;t++)i[a++]=e[t]}),new V(i,!0)},V.prototype.uploadData=function(){return this.data_},V);function V(e,t){var r=0,n="";B(e)?(r=(this.data_=e).size,n=e.type):e instanceof ArrayBuffer?(t?this.data_=new Uint8Array(e):(this.data_=new Uint8Array(e.byteLength),this.data_.set(new Uint8Array(e))),r=this.data_.length):e instanceof Uint8Array&&(t?this.data_=e:(this.data_=new Uint8Array(e.length),this.data_.set(e)),r=e.length),this.size_=r,this.type_=n}var K=(Object.defineProperty(Z.prototype,"path",{get:function(){return this.path_},enumerable:!0,configurable:!0}),Object.defineProperty(Z.prototype,"isRoot",{get:function(){return 0===this.path.length},enumerable:!0,configurable:!0}),Z.prototype.fullServerUrl=function(){var e=encodeURIComponent;return"/b/"+e(this.bucket)+"/o/"+e(this.path)},Z.prototype.bucketOnlyServerUrl=function(){return"/b/"+encodeURIComponent(this.bucket)+"/o"},Z.makeFromBucketSpec=function(t){var e;try{e=Z.makeFromUrl(t)}catch(e){return new Z(t,"")}if(""===e.path)return e;throw function(e){return new b(m.INVALID_DEFAULT_BUCKET,"Invalid default bucket '"+e+"'.")}(t)},Z.makeFromUrl=function(e){for(var t=null,r="([A-Za-z0-9.\\-_]+)",n=new RegExp("^gs://"+r+"(/(.*))?$","i"),o=p.replace(/[.]/g,"\\."),i=[{regex:n,indices:{bucket:1,path:3},postModify:function(e){"/"===e.path.charAt(e.path.length-1)&&(e.path_=e.path_.slice(0,-1))}},{regex:new RegExp("^https?://"+o+"/v[A-Za-z0-9_]+/b/"+r+"/o(/([^?#]*).*)?$","i"),indices:{bucket:1,path:3},postModify:function(e){e.path_=decodeURIComponent(e.path)}}],a=0;a<i.length;a++){var s=i[a],u=s.regex.exec(e);if(u){var l=u[s.indices.bucket],c=u[s.indices.path];t=new Z(l,c=c||""),s.postModify(t);break}}if(null==t)throw function(e){return new b(m.INVALID_URL,"Invalid URL '"+e+"'.")}(e);return t},Z);function Z(e,t){this.bucket=e,this.path_=t}function J(e){var t;try{t=JSON.parse(e)}catch(e){return null}return function(e){return D(e)&&!Array.isArray(e)}(t)?t:null}function Q(e){var t=e.lastIndexOf("/",e.length-2);return-1===t?e:e.slice(t+1)}function $(e){return"https://"+p+"/v0"+e}function Y(e){var t=encodeURIComponent,r="?";for(var n in e){if(e.hasOwnProperty(n))r=r+(t(n)+"="+t(e[n]))+"&"}return r=r.slice(0,-1)}function ee(e,t){return t}var te=function(e,t,r,n){this.server=e,this.local=t||e,this.writable=!!r,this.xform=n||ee},re=null;function ne(){if(re)return re;var e=[];e.push(new te("bucket")),e.push(new te("generation")),e.push(new te("metageneration")),e.push(new te("name","fullPath",!0));var t=new te("name");t.xform=function(e,t){return function(e){return!M(e)||e.length<2?e:Q(e)}(t)},e.push(t);var r=new te("size");return r.xform=function(e,t){return P(t)?Number(t):t},e.push(r),e.push(new te("timeCreated")),e.push(new te("updated")),e.push(new te("md5Hash",null,!0)),e.push(new te("cacheControl",null,!0)),e.push(new te("contentDisposition",null,!0)),e.push(new te("contentEncoding",null,!0)),e.push(new te("contentLanguage",null,!0)),e.push(new te("contentType",null,!0)),e.push(new te("metadata","customMetadata",!0)),re=e}function oe(e,t,r){for(var n={type:"file"},o=r.length,i=0;i<o;i++){var a=r[i];n[a.local]=a.xform(n,t[a.server])}return function(n,o){Object.defineProperty(n,"ref",{get:function(){var e=n.bucket,t=n.fullPath,r=new K(e,t);return o.makeStorageReference(r)}})}(n,e),n}function ie(e,t,r){var n=J(t);return null===n?null:oe(e,n,r)}function ae(e,t){for(var r={},n=t.length,o=0;o<n;o++){var i=t[o];i.writable&&(r[i.server]=e[i.local])}return JSON.stringify(r)}function se(e){if(!D(e)||!e)throw"Expected Metadata object.";for(var t in e)if(e.hasOwnProperty(t)){var r=e[t];if("customMetadata"===t){if(!D(r))throw"Expected object for 'customMetadata' mapping."}else if(D(n=r)&&null!==n)throw"Mapping for '"+t+"' cannot be an object."}var n}var ue="maxResults",le=1e3,ce="pageToken",pe="prefixes",he="items";function fe(e,t){var r={prefixes:[],items:[],nextPageToken:t.nextPageToken},n=e.bucket();if(null===n)throw new b(m.NO_DEFAULT_BUCKET,"No default bucket found. Did you set the '"+h+"' property when initializing the app?");if(t[pe])for(var o=0,i=t[pe];o<i.length;o++){var a=i[o].replace(/\/$/,""),s=e.makeStorageReference(new K(n,a));r.prefixes.push(s)}if(t[he])for(var u=0,l=t[he];u<l.length;u++){var c=l[u];s=e.makeStorageReference(new K(n,c.name));r.items.push(s)}return r}function de(e){if(!D(e)||!e)throw"Expected ListOptions object.";for(var t in e)if(t===ue){if(!W(r=e[ue])||!Number.isInteger(r)||e[ue]<=0)throw"Expected maxResults to be a positive number.";if(1e3<e[ue])throw"Expected maxResults to be less than or equal to "+le+"."}else{if(t!==ce)throw"Unknown option: "+t;if(e[ce]&&!M(e[ce]))throw"Expected pageToken to be string."}var r}var _e=function(e,t,r,n){this.url=e,this.method=t,this.handler=r,this.timeout=n,this.urlParams={},this.headers={},this.body=null,this.errorHandler=null,this.progressCallback=null,this.successCodes=[200],this.additionalRetryCodes=[]};function ve(e){if(!e)throw u()}function be(n,o){return function(e,t){var r=ie(n,t,o);return ve(null!==r),r}}function me(n){return function(e,t){var r=function(e,t){var r=J(t);return null===r?null:fe(e,r)}(n,t);return ve(null!==r),r}}function ge(n,o){return function(e,t){var r=ie(n,t,o);return ve(null!==r),function(n,e){var t=J(e);if(null===t)return null;if(!M(t.downloadTokens))return null;var r=t.downloadTokens;if(0===r.length)return null;var o=encodeURIComponent;return r.split(",").map(function(e){var t=n.bucket,r=n.fullPath;return $("/b/"+o(t)+"/o/"+o(r))+Y({alt:"media",token:e})})[0]}(r,t)}}function ye(n){return function(e,t){var r;return(r=401===e.getStatus()?new b(m.UNAUTHENTICATED,"User is not authenticated, please authenticate using Firebase Authentication and try again."):402===e.getStatus()?function(e){return new b(m.QUOTA_EXCEEDED,"Quota for bucket '"+e+"' exceeded, please view quota on https://firebase.google.com/pricing/.")}(n.bucket):403===e.getStatus()?function(e){return new b(m.UNAUTHORIZED,"User does not have permission to access '"+e+"'.")}(n.path):t).setServerResponseProp(t.serverResponseProp()),r}}function we(n){var o=ye(n);return function(e,t){var r=o(e,t);return 404===e.getStatus()&&(r=function(e){return new b(m.OBJECT_NOT_FOUND,"Object '"+e+"' does not exist.")}(n.path)),r.setServerResponseProp(t.serverResponseProp()),r}}function Re(e,t,r){var n=$(t.fullServerUrl()),o=e.maxOperationRetryTime(),i=new _e(n,"GET",be(e,r),o);return i.errorHandler=we(t),i}function Te(e,t,r){var n=Object.assign({},r);return n.fullPath=e.path,n.size=t.size(),n.contentType||(n.contentType=function(e,t){return e&&e.contentType||t&&t.type()||"application/octet-stream"}(null,t)),n}var Ee=function(e,t,r,n){this.current=e,this.total=t,this.finalized=!!r,this.metadata=n||null};function ke(e,t){var r=null;try{r=e.getResponseHeader("X-Goog-Upload-Status")}catch(e){ve(!1)}return ve(!!r&&-1!==(t||["active"]).indexOf(r)),r}function Oe(e,a,t,s,r,u,n,o){var l=new Ee(0,0);if(n?(l.current=n.current,l.total=n.total):(l.current=0,l.total=s.size()),s.size()!==l.total)throw new b(m.SERVER_FILE_WRONG_SIZE,"Server recorded incorrect upload file size, please retry the upload.");var i=l.total-l.current,c=i;0<r&&(c=Math.min(c,r));var p=l.current,h=p+c,f={"X-Goog-Upload-Command":c===i?"upload, finalize":"upload","X-Goog-Upload-Offset":l.current},d=s.slice(p,h);if(null===d)throw g();var _=a.maxUploadRetryTime(),v=new _e(t,"POST",function(e,t){var r,n=ke(e,["active","final"]),o=l.current+c,i=s.size();return r="final"===n?be(a,u)(e,t):null,new Ee(o,i,"final"===n,r)},_);return v.headers=f,v.body=d.uploadData(),v.progressCallback=o||null,v.errorHandler=ye(e),v}var Ue=function(e,t,r){if(I(e)||P(t)||P(r))this.next=e,this.error=t||null,this.complete=r||null;else{var n=e;this.next=n.next||null,this.error=n.error||null,this.complete=n.complete||null}},Ae=function(e,t,r,n,o,i){this.bytesTransferred=e,this.totalBytes=t,this.state=r,this.metadata=n,this.task=o,this.ref=i};function xe(t,e,r){for(var n=e.length,o=e.length,i=0;i<e.length;i++)if(e[i].optional){n=i;break}if(!(n<=r.length&&r.length<=o))throw function(e,t,r,n){var o,i;return i=e===t?1===(o=e)?"argument":"arguments":(o="between "+e+" and "+t,"arguments"),new b(m.INVALID_ARGUMENT_COUNT,"Invalid argument count in `"+r+"`: Expected "+o+" "+i+", received "+n+".")}(n,o,t,r.length);for(i=0;i<r.length;i++)try{e[i].validator(r[i])}catch(e){throw e instanceof Error?a(i,t,e.message):a(i,t,e)}}var Ce=function(t,e){var r=this;this.validator=function(e){r.optional&&!L(e)||t(e)},this.optional=!!e};function Se(e,t){function r(e){if(!M(e))throw"Expected string."}var n;return n=e?function(t,r){return function(e){t(e),r(e)}}(r,e):r,new Ce(n,t)}function Ne(e){return new Ce(se,e)}function Pe(){return new Ce(function(e){if(!(W(e)&&0<=e))throw"Expected a number 0 or greater."})}function Le(t,e){return new Ce(function(e){if(!(null===e||P(e)&&e instanceof Object))throw"Expected an Object.";null!=t&&t(e)},e)}function Ie(e){return new Ce(function(e){if(!(null===e||I(e)))throw"Expected a Function."},e)}function De(r){return function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];Promise.resolve().then(function(){return r.apply(void 0,e)})}}var Me=(We.prototype.makeProgressCallback_=function(){var t=this,r=this.transferred_;return function(e){return t.updateProgress_(r+e)}},We.prototype.shouldDoResumable_=function(e){return 262144<e.size()},We.prototype.start_=function(){this.state_===E&&null===this.request_&&(this.resumable_?null===this.uploadUrl_?this.createResumable_():this.needToFetchStatus_?this.fetchStatus_():this.needToFetchMetadata_?this.fetchMetadata_():this.continueUpload_():this.oneShotUpload_())},We.prototype.resolveToken_=function(t){var r=this;this.authWrapper_.getAuthToken().then(function(e){switch(r.state_){case E:t(e);break;case A:r.transition_(x);break;case k:r.transition_(O)}})},We.prototype.createResumable_=function(){var n=this;this.resolveToken_(function(e){var t=function(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a=Te(t,n,o),s={name:a.fullPath},u=$(i),l={"X-Goog-Upload-Protocol":"resumable","X-Goog-Upload-Command":"start","X-Goog-Upload-Header-Content-Length":n.size(),"X-Goog-Upload-Header-Content-Type":a.contentType,"Content-Type":"application/json; charset=utf-8"},c=ae(a,r),p=e.maxUploadRetryTime(),h=new _e(u,"POST",function(e){var t;ke(e);try{t=e.getResponseHeader("X-Goog-Upload-URL")}catch(e){ve(!1)}return ve(M(t)),t},p);return h.urlParams=s,h.headers=l,h.body=c,h.errorHandler=ye(t),h}(n.authWrapper_,n.location_,n.mappings_,n.blob_,n.metadata_),r=n.authWrapper_.makeRequest(t,e);(n.request_=r).getPromise().then(function(e){n.request_=null,n.uploadUrl_=e,n.needToFetchStatus_=!1,n.completeTransitions_()},n.errorHandler_)})},We.prototype.fetchStatus_=function(){var n=this,o=this.uploadUrl_;this.resolveToken_(function(e){var t=function(e,t,r,o){var n=e.maxUploadRetryTime(),i=new _e(r,"POST",function(e){var t=ke(e,["active","final"]),r=null;try{r=e.getResponseHeader("X-Goog-Upload-Size-Received")}catch(e){ve(!1)}r||ve(!1);var n=Number(r);return ve(!isNaN(n)),new Ee(n,o.size(),"final"===t)},n);return i.headers={"X-Goog-Upload-Command":"query"},i.errorHandler=ye(t),i}(n.authWrapper_,n.location_,o,n.blob_),r=n.authWrapper_.makeRequest(t,e);(n.request_=r).getPromise().then(function(e){e=e,n.request_=null,n.updateProgress_(e.current),n.needToFetchStatus_=!1,e.finalized&&(n.needToFetchMetadata_=!0),n.completeTransitions_()},n.errorHandler_)})},We.prototype.continueUpload_=function(){var n=this,o=262144*this.chunkMultiplier_,i=new Ee(this.transferred_,this.blob_.size()),a=this.uploadUrl_;this.resolveToken_(function(e){var t;try{t=Oe(n.location_,n.authWrapper_,a,n.blob_,o,n.mappings_,i,n.makeProgressCallback_())}catch(e){return n.error_=e,void n.transition_(C)}var r=n.authWrapper_.makeRequest(t,e);(n.request_=r).getPromise().then(function(e){n.increaseMultiplier_(),n.request_=null,n.updateProgress_(e.current),e.finalized?(n.metadata_=e.metadata,n.transition_(U)):n.completeTransitions_()},n.errorHandler_)})},We.prototype.increaseMultiplier_=function(){262144*this.chunkMultiplier_<33554432&&(this.chunkMultiplier_*=2)},We.prototype.fetchMetadata_=function(){var n=this;this.resolveToken_(function(e){var t=Re(n.authWrapper_,n.location_,n.mappings_),r=n.authWrapper_.makeRequest(t,e);(n.request_=r).getPromise().then(function(e){n.request_=null,n.metadata_=e,n.transition_(U)},n.metadataErrorHandler_)})},We.prototype.oneShotUpload_=function(){var n=this;this.resolveToken_(function(e){var t=function(e,t,r,n,o){var i=t.bucketOnlyServerUrl(),a={"X-Goog-Upload-Protocol":"multipart"},s=function(){for(var e="",t=0;t<2;t++)e+=Math.random().toString().slice(2);return e}();a["Content-Type"]="multipart/related; boundary="+s;var u=Te(t,n,o),l="--"+s+"\r\nContent-Type: application/json; charset=utf-8\r\n\r\n"+ae(u,r)+"\r\n--"+s+"\r\nContent-Type: "+u.contentType+"\r\n\r\n",c="\r\n--"+s+"--",p=X.getBlob(l,n,c);if(null===p)throw g();var h={name:u.fullPath},f=$(i),d=e.maxUploadRetryTime(),_=new _e(f,"POST",be(e,r),d);return _.urlParams=h,_.headers=a,_.body=p.uploadData(),_.errorHandler=ye(t),_}(n.authWrapper_,n.location_,n.mappings_,n.blob_,n.metadata_),r=n.authWrapper_.makeRequest(t,e);(n.request_=r).getPromise().then(function(e){n.request_=null,n.metadata_=e,n.updateProgress_(n.blob_.size()),n.transition_(U)},n.errorHandler_)})},We.prototype.updateProgress_=function(e){var t=this.transferred_;this.transferred_=e,this.transferred_!==t&&this.notifyObservers_()},We.prototype.transition_=function(e){if(this.state_!==e)switch(e){case A:case k:this.state_=e,null!==this.request_&&this.request_.cancel();break;case E:var t=this.state_===O;this.state_=e,t&&(this.notifyObservers_(),this.start_());break;case O:this.state_=e,this.notifyObservers_();break;case x:this.error_=l(),this.state_=e,this.notifyObservers_();break;case C:case U:this.state_=e,this.notifyObservers_()}},We.prototype.completeTransitions_=function(){switch(this.state_){case k:this.transition_(O);break;case A:this.transition_(x);break;case E:this.start_()}},Object.defineProperty(We.prototype,"snapshot",{get:function(){var e=N(this.state_);return new Ae(this.transferred_,this.blob_.size(),e,this.metadata_,this,this.ref_)},enumerable:!0,configurable:!0}),We.prototype.on=function(e,t,r,i){var n="Expected a function or an Object with one of `next`, `error`, `complete` properties.",o=Ie(!0).validator,a=Le(null,!0).validator;function s(e){try{return void o(e)}catch(e){}try{if(a(e),!(L(e.next)||L(e.error)||L(e.complete)))throw"";return}catch(e){throw n}}xe("on",[Se(function(){if(e!==T.STATE_CHANGED)throw"Expected one of the event types: ["+T.STATE_CHANGED+"]."}),Le(s,!0),Ie(!0),Ie(!0)],arguments);var u=this;function l(o){return function(e,t,r){null!==o&&xe("on",o,arguments);var n=new Ue(e,t,i);return u.addObserver_(n),function(){u.removeObserver_(n)}}}var c=[Le(function(e){if(null===e)throw n;s(e)}),Ie(!0),Ie(!0)];return L(t)||L(r)||L(i)?l(null)(t,r,i):l(c)},We.prototype.then=function(e,t){return this.promise_.then(e,t)},We.prototype.catch=function(e){return this.then(null,e)},We.prototype.addObserver_=function(e){this.observers_.push(e),this.notifyObserver_(e)},We.prototype.removeObserver_=function(e){var t=this.observers_.indexOf(e);-1!==t&&this.observers_.splice(t,1)},We.prototype.notifyObservers_=function(){var t=this;this.finishPromise_(),this.observers_.slice().forEach(function(e){t.notifyObserver_(e)})},We.prototype.finishPromise_=function(){if(null!==this.resolve_){var e=!0;switch(N(this.state_)){case S.SUCCESS:De(this.resolve_.bind(null,this.snapshot))();break;case S.CANCELED:case S.ERROR:De(this.reject_.bind(null,this.error_))();break;default:e=!1}e&&(this.resolve_=null,this.reject_=null)}},We.prototype.notifyObserver_=function(e){switch(N(this.state_)){case S.RUNNING:case S.PAUSED:e.next&&De(e.next.bind(e,this.snapshot))();break;case S.SUCCESS:e.complete&&De(e.complete.bind(e))();break;case S.CANCELED:case S.ERROR:e.error&&De(e.error.bind(e,this.error_))();break;default:e.error&&De(e.error.bind(e,this.error_))()}},We.prototype.resume=function(){xe("resume",[],arguments);var e=this.state_===O||this.state_===k;return e&&this.transition_(E),e},We.prototype.pause=function(){xe("pause",[],arguments);var e=this.state_===E;return e&&this.transition_(k),e},We.prototype.cancel=function(){xe("cancel",[],arguments);var e=this.state_===E||this.state_===k;return e&&this.transition_(A),e},We);function We(e,t,r,n,o,i){var a=this;void 0===i&&(i=null),this.transferred_=0,this.needToFetchStatus_=!1,this.needToFetchMetadata_=!1,this.observers_=[],this.error_=null,this.uploadUrl_=null,this.request_=null,this.chunkMultiplier_=1,this.resolve_=null,this.reject_=null,this.ref_=e,this.authWrapper_=t,this.location_=r,this.blob_=o,this.metadata_=i,this.mappings_=n,this.resumable_=this.shouldDoResumable_(this.blob_),this.state_=E,this.errorHandler_=function(e){a.request_=null,a.chunkMultiplier_=1,e.codeEquals(m.CANCELED)?(a.needToFetchStatus_=!0,a.completeTransitions_()):(a.error_=e,a.transition_(C))},this.metadataErrorHandler_=function(e){a.request_=null,e.codeEquals(m.CANCELED)?a.completeTransitions_():(a.error_=e,a.transition_(C))},this.promise_=new Promise(function(e,t){a.resolve_=e,a.reject_=t,a.start_()}),this.promise_.then(null,function(){})}var Be=(je.prototype.toString=function(){return xe("toString",[],arguments),"gs://"+this.location.bucket+"/"+this.location.path},je.prototype.newRef=function(e,t){return new je(e,t)},je.prototype.mappings=function(){return ne()},je.prototype.child=function(e){xe("child",[Se()],arguments);var t=function(e,t){var r=t.split("/").filter(function(e){return 0<e.length}).join("/");return 0===e.length?r:e+"/"+r}(this.location.path,e),r=new K(this.location.bucket,t);return this.newRef(this.authWrapper,r)},Object.defineProperty(je.prototype,"parent",{get:function(){var e=function(e){if(0===e.length)return null;var t=e.lastIndexOf("/");return-1===t?"":e.slice(0,t)}(this.location.path);if(null===e)return null;var t=new K(this.location.bucket,e);return this.newRef(this.authWrapper,t)},enumerable:!0,configurable:!0}),Object.defineProperty(je.prototype,"root",{get:function(){var e=new K(this.location.bucket,"");return this.newRef(this.authWrapper,e)},enumerable:!0,configurable:!0}),Object.defineProperty(je.prototype,"bucket",{get:function(){return this.location.bucket},enumerable:!0,configurable:!0}),Object.defineProperty(je.prototype,"fullPath",{get:function(){return this.location.path},enumerable:!0,configurable:!0}),Object.defineProperty(je.prototype,"name",{get:function(){return Q(this.location.path)},enumerable:!0,configurable:!0}),Object.defineProperty(je.prototype,"storage",{get:function(){return this.authWrapper.service()},enumerable:!0,configurable:!0}),je.prototype.put=function(e,t){return void 0===t&&(t=null),xe("put",[new Ce(function(e){if(!(e instanceof Uint8Array||e instanceof ArrayBuffer||j()&&e instanceof Blob))throw"Expected Blob or File."}),Ne(!0)],arguments),this.throwIfRoot_("put"),new Me(this,this.authWrapper,this.location,this.mappings(),new X(e),t)},je.prototype.putString=function(e,t,r){void 0===t&&(t=d.RAW),xe("putString",[Se(),Se(s,!0),Ne(!0)],arguments),this.throwIfRoot_("putString");var n=_(t,e),o=Object.assign({},r);return!P(o.contentType)&&P(n.contentType)&&(o.contentType=n.contentType),new Me(this,this.authWrapper,this.location,this.mappings(),new X(n.data,!0),o)},je.prototype.delete=function(){var r=this;return xe("delete",[],arguments),this.throwIfRoot_("delete"),this.authWrapper.getAuthToken().then(function(e){var t=function(e,t){var r=$(t.fullServerUrl()),n=e.maxOperationRetryTime(),o=new _e(r,"DELETE",function(e,t){},n);return o.successCodes=[200,204],o.errorHandler=we(t),o}(r.authWrapper,r.location);return r.authWrapper.makeRequest(t,e).getPromise()})},je.prototype.listAll=function(){xe("listAll",[],arguments);var e={prefixes:[],items:[]};return this.listAllHelper(e).then(function(){return e})},je.prototype.listAllHelper=function(i,a){return function(i,a,s,u){return new(s=s||Promise)(function(e,t){function r(e){try{o(u.next(e))}catch(e){t(e)}}function n(e){try{o(u.throw(e))}catch(e){t(e)}}function o(t){t.done?e(t.value):new s(function(e){e(t.value)}).then(r,n)}o((u=u.apply(i,a||[])).next())})}(this,void 0,void 0,function(){var t,r,n,o;return e(this,function(e){switch(e.label){case 0:return t={pageToken:a},[4,this.list(t)];case 1:return r=e.sent(),(n=i.prefixes).push.apply(n,r.prefixes),(o=i.items).push.apply(o,r.items),null==r.nextPageToken?[3,3]:[4,this.listAllHelper(i,r.nextPageToken)];case 2:e.sent(),e.label=3;case 3:return[2]}})})},je.prototype.list=function(n){xe("list",[function(e){return new Ce(de,e)}(!0)],arguments);var o=this;return this.authWrapper.getAuthToken().then(function(e){var t=n||{},r=function(e,t,r,n,o){var i={};t.isRoot?i.prefix="":i.prefix=t.path+"/",r&&0<r.length&&(i.delimiter=r),n&&(i.pageToken=n),o&&(i.maxResults=o);var a=$(t.bucketOnlyServerUrl()),s=e.maxOperationRetryTime(),u=new _e(a,"GET",me(e),s);return u.urlParams=i,u.errorHandler=ye(t),u}(o.authWrapper,o.location,"/",t.pageToken,t.maxResults);return o.authWrapper.makeRequest(r,e).getPromise()})},je.prototype.getMetadata=function(){var r=this;return xe("getMetadata",[],arguments),this.throwIfRoot_("getMetadata"),this.authWrapper.getAuthToken().then(function(e){var t=Re(r.authWrapper,r.location,r.mappings());return r.authWrapper.makeRequest(t,e).getPromise()})},je.prototype.updateMetadata=function(r){var n=this;return xe("updateMetadata",[Ne()],arguments),this.throwIfRoot_("updateMetadata"),this.authWrapper.getAuthToken().then(function(e){var t=function(e,t,r,n){var o=$(t.fullServerUrl()),i=ae(r,n),a=e.maxOperationRetryTime(),s=new _e(o,"PATCH",be(e,n),a);return s.headers={"Content-Type":"application/json; charset=utf-8"},s.body=i,s.errorHandler=we(t),s}(n.authWrapper,n.location,r,n.mappings());return n.authWrapper.makeRequest(t,e).getPromise()})},je.prototype.getDownloadURL=function(){var r=this;return xe("getDownloadURL",[],arguments),this.throwIfRoot_("getDownloadURL"),this.authWrapper.getAuthToken().then(function(e){var t=function(e,t,r){var n=$(t.fullServerUrl()),o=e.maxOperationRetryTime(),i=new _e(n,"GET",ge(e,r),o);return i.errorHandler=we(t),i}(r.authWrapper,r.location,r.mappings());return r.authWrapper.makeRequest(t,e).getPromise().then(function(e){if(null===e)throw new b(m.NO_DOWNLOAD_URL,"The given file does not have any download URLs.");return e})})},je.prototype.throwIfRoot_=function(e){if(""===this.location.path)throw function(e){return new b(m.INVALID_ROOT_OPERATION,"The operation '"+e+"' cannot be performed on a root reference, create a non-root reference using child, such as .child('file.png').")}(e)},je);function je(e,t){this.authWrapper=e,this.location=t instanceof K?t:K.makeFromUrl(t)}var qe=(Fe.prototype.getPromise=function(){return this.promise_},Fe.prototype.cancel=function(e){},Fe);function Fe(e){this.promise_=Promise.reject(e)}var He=(ze.prototype.addRequest=function(e){var t=this,r=this.id;this.id++,this.map.set(r,e),e.getPromise().then(function(){return t.map.delete(r)},function(){return t.map.delete(r)})},ze.prototype.clear=function(){this.map.forEach(function(e){e&&e.cancel(!0)}),this.map.clear()},ze);function ze(){this.map=new Map,this.id=-9007199254740991}var Ge=(Xe.extractBucket_=function(e){var t=e[h]||null;return null==t?null:K.makeFromBucketSpec(t).bucket},Xe.prototype.getAuthToken=function(){return null!==this.app_&&P(this.app_.INTERNAL)&&P(this.app_.INTERNAL.getToken)?this.app_.INTERNAL.getToken().then(function(e){return null!==e?e.accessToken:null},function(){return null}):Promise.resolve(null)},Xe.prototype.bucket=function(){if(this.deleted_)throw c();return this.bucket_},Xe.prototype.service=function(){return this.service_},Xe.prototype.makeStorageReference=function(e){return this.storageRefMaker_(this,e)},Xe.prototype.makeRequest=function(e,t){if(this.deleted_)return new qe(c());var r=this.requestMaker_(e,t,this.pool_);return this.requestMap_.addRequest(r),r},Xe.prototype.deleteApp=function(){this.deleted_=!0,this.app_=null,this.requestMap_.clear()},Xe.prototype.maxUploadRetryTime=function(){return this.maxUploadRetryTime_},Xe.prototype.setMaxUploadRetryTime=function(e){this.maxUploadRetryTime_=e},Xe.prototype.maxOperationRetryTime=function(){return this.maxOperationRetryTime_},Xe.prototype.setMaxOperationRetryTime=function(e){this.maxOperationRetryTime_=e},Xe);function Xe(e,t,r,n,o){if(this.bucket_=null,this.deleted_=!1,this.app_=e,null!==this.app_){var i=this.app_.options;P(i)&&(this.bucket_=Xe.extractBucket_(i))}this.storageRefMaker_=t,this.requestMaker_=r,this.pool_=o,this.service_=n,this.maxOperationRetryTime_=12e4,this.maxUploadRetryTime_=6e5,this.requestMap_=new He}var Ve=(Ke.prototype.start_=function(){var s=this;function e(e,t){var r,n=s.resolve_,o=s.reject_,i=t.xhr;if(t.wasSuccessCode)try{var a=s.callback_(i,i.getResponseText());L(a)?n(a):n()}catch(e){o(e)}else null!==i?((r=u()).setServerResponseProp(i.getResponseText()),s.errorCallback_?o(s.errorCallback_(i,r)):o(r)):t.canceled?o(r=s.appDelete_?c():l()):o(r=new b(m.RETRY_LIMIT_EXCEEDED,"Max retry time for operation exceeded, please try again."))}this.canceled_?e(0,new Ze(!1,null,!0)):this.backoffId_=function(t,r,e){var n=1,o=null,i=!1,a=0;function s(){return 2===a}var u=!1;function l(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];u||(u=!0,r.apply(null,e))}function c(e){o=setTimeout(function(){o=null,t(p,s())},e)}function p(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];u||(e?l.call.apply(l,[null,e].concat(t)):s()||i?l.call.apply(l,[null,e].concat(t)):(n<64&&(n*=2),c(1===a?(a=2,0):1e3*(n+Math.random()))))}var h=!1;function f(e){h||(h=!0,u||(null!==o?(e||(a=2),clearTimeout(o),c(0)):e||(a=1)))}return c(0),setTimeout(function(){f(i=!0)},e),f}(function(i,e){if(e)i(!1,new Ze(!1,null,!0));else{var t=s.pool_.createXhrIo();s.pendingXhr_=t,null!==s.progressCallback_&&t.addUploadProgressListener(a),t.send(s.url_,s.method_,s.body_,s.headers_).then(function(e){null!==s.progressCallback_&&e.removeUploadProgressListener(a),s.pendingXhr_=null;var t=(e=e).getErrorCode()===w.NO_ERROR,r=e.getStatus();if(t&&!s.isRetryStatusCode_(r)){var n=-1!==s.successCodes_.indexOf(r);i(!0,new Ze(n,e))}else{var o=e.getErrorCode()===w.ABORT;i(!1,new Ze(!1,null,o))}})}function a(e){var t=e.loaded,r=e.lengthComputable?e.total:-1;null!==s.progressCallback_&&s.progressCallback_(t,r)}},e,this.timeout_)},Ke.prototype.getPromise=function(){return this.promise_},Ke.prototype.cancel=function(e){this.canceled_=!0,this.appDelete_=e||!1,null!==this.backoffId_&&function(e){e(!1)}(this.backoffId_),null!==this.pendingXhr_&&this.pendingXhr_.abort()},Ke.prototype.isRetryStatusCode_=function(e){var t=500<=e&&e<600,r=-1!==[408,429].indexOf(e),n=-1!==this.additionalRetryCodes_.indexOf(e);return t||r||n},Ke);function Ke(e,t,r,n,o,i,a,s,u,l,c){var p=this;this.pendingXhr_=null,this.backoffId_=null,this.resolve_=null,this.reject_=null,this.canceled_=!1,this.appDelete_=!1,this.url_=e,this.method_=t,this.headers_=r,this.body_=n,this.successCodes_=o.slice(),this.additionalRetryCodes_=i.slice(),this.callback_=a,this.errorCallback_=s,this.progressCallback_=l,this.timeout_=u,this.pool_=c,this.promise_=new Promise(function(e,t){p.resolve_=e,p.reject_=t,p.start_()})}var Ze=function(e,t,r){this.wasSuccessCode=e,this.xhr=t,this.canceled=!!r};function Je(e,t,r){var n=Y(e.urlParams),o=e.url+n,i=Object.assign({},e.headers);return function(e,t){null!==t&&0<t.length&&(e.Authorization="Firebase "+t)}(i,t),function(e){var t=void 0!==nt?nt.SDK_VERSION:"AppManager";e["X-Firebase-Storage-Version"]="webjs/"+t}(i),new Ve(o,e.method,i,e.body,e.successCodes,e.additionalRetryCodes,e.handler,e.errorHandler,e.timeout,e.progressCallback,r)}var Qe=($e.prototype.ref=function(e){if(xe("ref",[Se(function(e){if("string"!=typeof e)throw"Path is not a string.";if(/^[A-Za-z]+:\/\//.test(e))throw"Expected child path but got a URL, use refFromURL instead."},!0)],arguments),null==this.bucket_)throw new Error("No Storage Bucket defined in Firebase Options.");var t=new Be(this.authWrapper_,this.bucket_);return null!=e?t.child(e):t},$e.prototype.refFromURL=function(e){return xe("refFromURL",[Se(function(e){if("string"!=typeof e)throw"Path is not a string.";if(!/^[A-Za-z]+:\/\//.test(e))throw"Expected full URL but got a child path, use ref instead.";try{K.makeFromUrl(e)}catch(e){throw"Expected valid full URL but got an invalid one."}},!1)],arguments),new Be(this.authWrapper_,e)},Object.defineProperty($e.prototype,"maxUploadRetryTime",{get:function(){return this.authWrapper_.maxUploadRetryTime()},enumerable:!0,configurable:!0}),$e.prototype.setMaxUploadRetryTime=function(e){xe("setMaxUploadRetryTime",[Pe()],arguments),this.authWrapper_.setMaxUploadRetryTime(e)},$e.prototype.setMaxOperationRetryTime=function(e){xe("setMaxOperationRetryTime",[Pe()],arguments),this.authWrapper_.setMaxOperationRetryTime(e)},Object.defineProperty($e.prototype,"app",{get:function(){return this.app_},enumerable:!0,configurable:!0}),Object.defineProperty($e.prototype,"INTERNAL",{get:function(){return this.internals_},enumerable:!0,configurable:!0}),$e);function $e(e,t,r){if(this.bucket_=null,this.authWrapper_=new Ge(e,function(e,t){return new Be(e,t)},Je,this,t),this.app_=e,null!=r)this.bucket_=K.makeFromBucketSpec(r);else{var n=this.authWrapper_.bucket();null!=n&&(this.bucket_=new K(n,""))}this.internals_=new Ye(this)}var Ye=(et.prototype.delete=function(){return this.service_.authWrapper_.deleteApp(),Promise.resolve()},et);function et(e){this.service_=e}var tt;function rt(e,t,r){return new Qe(e,new H,r)}tt={TaskState:S,TaskEvent:T,StringFormat:d,Storage:Qe,Reference:Be},nt.INTERNAL.registerService("storage",rt,tt,void 0,!0)}).apply(this,arguments)}catch(e){throw console.error(e),new Error("Cannot instantiate firebase-storage - be sure to load firebase-app.js first.")}});
//# sourceMappingURL=firebase-storage.js.map
