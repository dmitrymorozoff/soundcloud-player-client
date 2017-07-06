/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = this["webpackHotUpdate"];
/******/ 	this["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "3567170fd8c12a184016"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			hotApply(hotApplyOnUpdate).then(function(result) {
/******/ 				deferred.resolve(result);
/******/ 			}, function(err) {
/******/ 				deferred.reject(err);
/******/ 			});
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 				var callbacks = [];
/******/ 				for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 					dependency = moduleOutdatedDependencies[i];
/******/ 					cb = module.hot._acceptedDependencies[dependency];
/******/ 					if(callbacks.indexOf(cb) >= 0) continue;
/******/ 					callbacks.push(cb);
/******/ 				}
/******/ 				for(i = 0; i < callbacks.length; i++) {
/******/ 					cb = callbacks[i];
/******/ 					try {
/******/ 						cb(moduleOutdatedDependencies);
/******/ 					} catch(err) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "accept-errored",
/******/ 								moduleId: moduleId,
/******/ 								dependencyId: moduleOutdatedDependencies[i],
/******/ 								error: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err;
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./public";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire("./index.js")(__webpack_require__.s = "./index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".best-movies-wrap {\n  padding: 50px 25px; }\n\n.best-movies,\n.movies-wrap {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center;\n  position: relative; }\n\n.pagintaion-wrap {\n  display: flex;\n  justify-content: center; }\n\n.pagination-btn,\n.modal-btn {\n  width: 150px;\n  margin: 10px;\n  border: none;\n  color: #fff;\n  text-transform: uppercase;\n  height: 40px;\n  background: #1e1d23;\n  border-top: 2px solid #2c2b34;\n  cursor: pointer;\n  transition: .2s; }\n  .pagination-btn:hover,\n  .modal-btn:hover {\n    background: #19181d; }\n\n.modal-btn {\n  margin-top: 20px;\n  margin-left: 0; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Header.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".header {\n  width: 100%;\n  height: 80px;\n  background: #1e1d23;\n  display: flex;\n  flex-wrap: wrap;\n  align-items: center; }\n\n.header-logo-title {\n  display: flex;\n  align-items: center;\n  font-size: 16px;\n  text-transform: uppercase;\n  font-weight: bold;\n  letter-spacing: 2px;\n  height: 100%;\n  color: #fff; }\n\n.header-logo-wrap {\n  display: flex;\n  align-items: center;\n  padding-left: 45px;\n  height: 100%;\n  width: 5%; }\n\n.header-logo-title {\n  width: 15%; }\n\n.logo {\n  height: 65%; }\n\n.search {\n  margin-left: 80px;\n  width: 70%;\n  display: inline-block;\n  height: 20px;\n  font-size: 20px;\n  border-radius: 2px;\n  background: #2a2931;\n  padding: 10px;\n  outline: none;\n  border: none;\n  color: #fff;\n  transition: 0.3s linear;\n  border-bottom: 1px solid #19181d; }\n\n.search:focus {\n  background: #f3f3f3; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Layout.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".layer {\n  display: none;\n  width: 100%;\n  min-height: 550px;\n  height: auto; }\n\n.layer.active {\n  display: flex;\n  flex-wrap: wrap;\n  justify-content: center; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".overflow {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  z-index: 999;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background: rgba(0, 0, 0, 0.8);\n  visibility: hidden;\n  opacity: 0;\n  transition: .3s; }\n\n.overflow.active {\n  visibility: visible;\n  opacity: 1; }\n\n.modal {\n  min-width: 550px;\n  max-width: 900px;\n  min-height: 450px;\n  max-height: 600px;\n  background: #fff; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/MovieCard.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".movie-card-part {\n  display: flex;\n  width: 890px;\n  height: 280px;\n  margin: 50px 20px;\n  background: #18171c;\n  border-top: 2px solid #26252d;\n  flex-wrap: wrap;\n  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.08);\n  position: relative; }\n\n.poster-wrap-part {\n  padding: 0;\n  width: 55%;\n  margin-left: 15px; }\n\n.poster-part {\n  width: 100%;\n  box-shadow: 0 10px 100px rgba(0, 0, 0, 0.2), 0 100px 100px rgba(0, 0, 0, 0.03);\n  cursor: pointer; }\n\n.movie-card-part {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n  align-items: center; }\n\n.movie-card-title-part {\n  font-size: 18px;\n  line-height: 26px;\n  text-align: center;\n  margin-top: -30px;\n  margin-bottom: 10px;\n  color: #fff; }\n\n.movie-card-content-part {\n  display: flex;\n  color: #3d3c41;\n  flex-direction: column;\n  padding: 15px;\n  align-items: center;\n  width: 35%; }\n\n.movie-card-rate-part {\n  font-family: 'Josefin Sans', sans-serif;\n  position: absolute;\n  top: 63%;\n  letter-spacing: 6px;\n  left: 45%;\n  color: #fff;\n  font-weight: bold;\n  font-size: 58px;\n  text-shadow: 0 0 0.2em rgba(255, 255, 255, 0.05), 0 0 0.2em rgba(0, 0, 0, 0.05), 0 0.3em 0.2em rgba(0, 0, 0, 0.05); }\n\n.movie-card-full {\n  width: 180px;\n  margin: 40px;\n  height: 340px;\n  display: flex;\n  transition: 3s;\n  position: relative;\n  background: #18171c;\n  border-top: 2px solid #26252d;\n  box-shadow: 0 10px 100px rgba(0, 0, 0, 0.16), 0 100px 100px rgba(0, 0, 0, 0.08);\n  padding: 25px 10px 5px 10px;\n  flex-direction: column;\n  justify-content: flex-end;\n  position: relative; }\n  .movie-card-full :hover .poster-full {\n    transform: scale(1.7); }\n\n.poster-wrap-full {\n  padding: 0;\n  width: 100%;\n  left: -40px;\n  top: -35px;\n  cursor: pointer;\n  position: absolute;\n  overflow: hidden; }\n  .poster-wrap-full:hover .movie-card-btn-full {\n    top: 45%; }\n  .poster-wrap-full:hover:after {\n    clip-path: circle(120% at 50% 50%); }\n  .poster-wrap-full:hover:before {\n    background: linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 0.1) 90%); }\n  .poster-wrap-full:after {\n    position: absolute;\n    top: 0;\n    bottom: 0;\n    left: 0;\n    right: 0;\n    content: '';\n    display: block;\n    z-index: 3;\n    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.9) 100%);\n    clip-path: circle(0% at 50% 50%);\n    transition: .5s; }\n\n.poster-full {\n  width: 100%;\n  transition: .8s;\n  box-shadow: 0 15px 30px 1px rgba(0, 0, 0, 0.31); }\n\n.movie-card-title-full {\n  color: #fff;\n  text-align: center;\n  box-shadow: 0 10px 90px rgba(0, 0, 0, 0.16), 0 90px 90px rgba(0, 0, 0, 0.03);\n  font-size: 16px;\n  z-index: 9;\n  top: 245px;\n  left: -10px;\n  width: 170px;\n  border-top: 2px solid #26252d;\n  height: 20px;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  padding: 10px;\n  background: #1e1d23;\n  position: absolute; }\n\n.movie-card-year-full {\n  display: none; }\n\n.movie-card-content-full {\n  display: flex;\n  justify-content: center; }\n\n.movie-card-desc-full {\n  text-align: center;\n  height: 45px;\n  line-height: 26px;\n  margin: 20px 0;\n  font-size: 16px;\n  overflow: hidden;\n  color: #3d3c41; }\n\n.movie-card-rate-full {\n  background: #1e1d23;\n  font-family: 'Raleway', sans-serif;\n  width: 50px;\n  height: 50px;\n  text-align: center;\n  line-height: 50px;\n  position: absolute;\n  top: -60px;\n  left: -60px;\n  border-top: 2px solid #26252d;\n  color: #fff;\n  font-weight: bold;\n  font-size: 24px;\n  z-index: 5;\n  text-shadow: 0 0 0.2em rgba(255, 255, 255, 0.05), 0 0 0.2em rgba(0, 0, 0, 0.05), 0 0.3em 0.2em rgba(0, 0, 0, 0.05); }\n\n.movie-card-btn-full {\n  transition: .4s;\n  position: absolute;\n  top: 120%;\n  left: 50%;\n  margin-left: -75px;\n  cursor: pointer;\n  z-index: 5;\n  width: 150px;\n  height: 40px;\n  background: #ff0707;\n  border: none;\n  color: #fff;\n  font-size: 16px; }\n\n.movie-card-modal {\n  position: relative;\n  display: flex; }\n\n.poster-wrap-modal {\n  margin-top: -80px;\n  box-shadow: 0 10px 100px rgba(0, 0, 0, 0.2), 0 100px 100px rgba(0, 0, 0, 0.03); }\n\n.movie-card-title-modal {\n  font-size: 36px;\n  margin-bottom: 20px; }\n\n.movie-card-year-modal {\n  margin-bottom: 20px; }\n\n.movie-card-desc-modal {\n  line-height: 26px; }\n\n.movie-card-content-modal {\n  display: flex;\n  flex-direction: column;\n  padding: 55px; }\n\n.movie-card-rate-modal {\n  background: #ff0707;\n  font-family: 'Josefin Sans', sans-serif;\n  font-weight: bold;\n  color: #fff;\n  padding: 10px;\n  width: 70px;\n  text-align: center;\n  line-height: 70px;\n  height: 70px;\n  font-size: 46px;\n  position: absolute;\n  right: -40px;\n  bottom: 40px; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Navigation.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".tabs-list {\n  background: #19181d;\n  display: flex;\n  flex-wrap: wrap; }\n\n.tab {\n  height: 70px;\n  width: 130px;\n  background: #19181d;\n  padding-bottom: 3px; }\n\n.tab-link {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100%;\n  height: 100%;\n  text-decoration: none;\n  color: #3d3c41;\n  transition: .2s;\n  font-size: 18px; }\n  .tab-link:hover {\n    background: #1e1d23;\n    color: #fff; }\n\n.tab-link.active {\n  background: #1e1d23;\n  color: #fff;\n  border-bottom: 3px solid #ff0707; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Scrollbar.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".scrollbar {\n  position: absolute;\n  display: flex;\n  width: 10000px;\n  height: 60px;\n  margin-top: 85px;\n  cursor: w-resize;\n  color: #131313;\n  font-size: 20px;\n  background: #27262c;\n  border-bottom: 1px solid #19181d; }\n\n.scrollbar-wrap {\n  width: 100%;\n  position: relative;\n  top: 65%; }\n\n.scrollbar-item {\n  line-height: 60px;\n  text-align: center;\n  width: 435px;\n  color: #3d3c41;\n  -webkit-user-select: none;\n  -moz-user-select: none;\n  -ms-user-select: none;\n  user-select: none; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".ticket-reserv-wrapper {\n  height: 600px;\n  width: 850px;\n  padding: 20px;\n  background: #1e1d23;\n  overflow: hidden; }\n\n.places-wrap {\n  height: 40px;\n  display: flex;\n  position: relative; }\n  .places-wrap:before {\n    content: '';\n    display: block;\n    width: 600px;\n    margin: 20px auto;\n    height: 800px;\n    border-top: 7px solid #00aeef;\n    box-shadow: inset 0 120px 20px -100px rgba(1, 174, 240, 0.2); }\n\n.place {\n  position: absolute;\n  width: 25px;\n  height: 25px;\n  cursor: pointer;\n  transition: .1s;\n  background: #27262c; }\n  .place:hover {\n    background: #ff0707; }\n\n.place.active {\n  background: #ed0000; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TopMovies.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.i, ".top-movies-wrap {\n  width: 100%;\n  padding-top: 50px;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n  position: relative;\n  height: 520px;\n  background: #1e1d23; }\n\n.top-movies {\n  position: absolute;\n  width: 10000px;\n  display: flex; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/style.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../node_modules/css-loader/lib/css-base.js")(undefined);
// imports
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Open+Sans);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Raleway);", ""]);
exports.push([module.i, "@import url(https://fonts.googleapis.com/css?family=Josefin+Sans);", ""]);

// module
exports.push([module.i, "* {\n  padding: 0;\n  margin: 0; }\n\nbody {\n  background: #242329;\n  font-family: 'Roboto', sans-serif;\n  height: 100vh; }\n", ""]);

// exports


/***/ }),

/***/ "../node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "../node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("../node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "../node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./BestMovies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

var _MoviesHelper = __webpack_require__("./MoviesHelper.js");

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _TicketReservation = __webpack_require__("./TicketReservation.js");

var _TicketReservation2 = _interopRequireDefault(_TicketReservation);

var _MovieCard = __webpack_require__("./MovieCard.js");

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _Modal = __webpack_require__("./Modal.js");

var _Modal2 = _interopRequireDefault(_Modal);

var _Button = __webpack_require__("./Button.js");

var _Button2 = _interopRequireDefault(_Button);

__webpack_require__("./css/BestMovies.scss");

var _HallScheme = __webpack_require__("./HallScheme.js");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var BestMovies = function () {
  function BestMovies(container) {
    _classCallCheck(this, BestMovies);

    this.container = container;
    this.movies = [];
    this.bestMoviesLayer = null;
    this.currentPage = 3;
    this.bestMoviesUrl = "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22&page=";
    this.modalWithInfo = null;
    this.modal = null;
    this.pagination = [];
    this.countPages = 0;
    this.moviesWrap = null;
  }

  _createClass(BestMovies, [{
    key: "create",
    value: function create() {
      var _this = this;

      this.moviesWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movies-wrap"]
      });
      this.bestMoviesLayer = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["best-movies"]
      }, this.moviesWrap);
      var prevBtn = new _Button2.default({
        title: "prev",
        classList: ["pagination-btn", "pagination-prev"]
      });
      var nextBtn = new _Button2.default({
        title: "next",
        classList: ["pagination-btn", "pagination-next"]
      });
      this.pagination = [prevBtn.create(), nextBtn.create()];
      console.log(this.pagination);
      var pagintaionWrapper = _Helpers.createElement.apply(undefined, [{
        tag: "div",
        classList: ["pagintaion-wrap"]
      }].concat(_toConsumableArray(this.pagination)));
      var bestMoviesLayerWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["best-movies-wrap"]
      }, this.bestMoviesLayer, pagintaionWrapper);
      this.container.appendChild(bestMoviesLayerWrap);
      this.modal = new _Modal2.default(this.bestMoviesLayer, "best-movies");
      this.modal.create();
      document.addEventListener("keydown", function (event) {
        if (event.keyCode == 27) {
          _this.modal.hide();
        }
      });
      this.pagination[0].addEventListener("click", this.prevPage.bind(this));
      this.pagination[1].addEventListener("click", this.nextPage.bind(this));
    }
  }, {
    key: "loadingMovies",
    value: function loadingMovies() {
      var _this2 = this;

      var url = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "&primary_release_date.gte=2016-11-15&primary_release_date.lte=2017-2-22&page=3";

      this.moviesWrap.innerHTML = "";
      var movieHelper = new _MoviesHelper2.default();
      var movieItem = null;
      movieHelper.getData(movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + url).then(function (data) {
        _this2.countPages = data.total_pages;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var movie = _step.value;

            movieItem = new _MovieCard2.default(_this2.moviesWrap, movie);
            movieItem.create("full");
            console.log(movieItem.buyTicketButton);
            movieItem.poster.addEventListener("click", _this2.handleClickOnMovieCard.bind(_this2));
            _this2.movies.push(movieItem);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      }).catch(function (e) {
        console.log(e);
      });
    }
  }, {
    key: "nextPage",
    value: function nextPage() {
      this.currentPage++;
      if (this.currentPage + 1 < this.countPages) {
        var newUrl = this.bestMoviesUrl + this.currentPage;
        this.loadingMovies(newUrl);
      }
    }
  }, {
    key: "prevPage",
    value: function prevPage() {
      if (this.currentPage - 1 > 0) {
        this.currentPage--;
        var newUrl = this.bestMoviesUrl + this.currentPage;
        this.loadingMovies(newUrl);
      }
    }
  }, {
    key: "handleClickOnMovieCard",
    value: function handleClickOnMovieCard(event) {
      var _this3 = this;

      if (event.target.className === "poster-wrap-full") {
        var currentCard = event.target.parentElement;
        var currentCardId = currentCard.getAttribute("data-id");
        var movieHelper = new _MoviesHelper2.default();
        movieHelper.getData(movieHelper.getUrl() + "movie/" + currentCardId + movieHelper.getApiKey()).then(function (data) {
          _this3.modal.appendInnerStructure(function () {
            var temp = (0, _Helpers.createElement)({
              tag: "div",
              classList: ["movie-card-"]
            });
            var movieItem = new _MovieCard2.default(temp, data);
            movieItem.create("modal");
            movieItem.buyTicketButton.addEventListener("click", this.handleBuyTicketBtnClick.bind(this, data));
            return movieItem.card;
          }.bind(_this3));
        }).catch(function (e) {
          console.log(e);
        });
        this.modal.show();
      }
    }
  }, {
    key: "handleBuyTicketBtnClick",
    value: function handleBuyTicketBtnClick(data) {
      this.modal.modal.innerHTML = "";
      this.modal.appendInnerStructure(function () {
        console.log(data);
        console.log(_HallScheme.halls.hallOne);
        var ticketReservation = new _TicketReservation2.default({
          countPlace: 120,
          data: data,
          hallScheme: _HallScheme.halls.hallOne
        });
        return ticketReservation.create();
      }.bind(this));
    }
  }]);

  return BestMovies;
}();

exports.default = BestMovies;

/***/ }),

/***/ "./Button.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Button = function () {
  function Button(props) {
    _classCallCheck(this, Button);

    this.title = props.title;
    this.classList = props.classList;
    this.button = null;
  }

  _createClass(Button, [{
    key: "create",
    value: function create() {
      this.button = (0, _Helpers.createElement)({
        tag: "button",
        classList: [].concat(_toConsumableArray(this.classList))
      });
      this.button.innerHTML = this.title;
      return this.button;
    }
  }]);

  return Button;
}();

exports.default = Button;

/***/ }),

/***/ "./HallScheme.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var halls = exports.halls = {
  hallOne: [[0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0], [0, 0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 0, 0, 0, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 0], [0, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 0, 0, 0]]
};

/***/ }),

/***/ "./Header.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/Header.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Header = function () {
  function Header(container, props) {
    _classCallCheck(this, Header);

    this.container = container;
    this.props = props;
  }

  _createClass(Header, [{
    key: "create",
    value: function create() {
      var logoWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["header-logo-wrap"]
      });
      var logoTitle = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["header-logo-title"]
      });
      var logo = (0, _Helpers.createElement)({
        tag: "img",
        classList: ["logo"]
      });
      logo.src = this.props.src;
      logoTitle.innerHTML = "The Movie Database";
      logoWrap.appendChild(logo);
      var search = (0, _Helpers.createElement)({
        tag: "input",
        classList: ["search"]
      });
      search.type = "text";
      var header = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["header"]
      }, logoWrap, logoTitle, search);
      this.container.appendChild(header);
    }
  }]);

  return Header;
}();

exports.default = Header;

/***/ }),

/***/ "./Helpers.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function createElement(props) {
  var _element$classList;

  var element = document.createElement(props.tag);
  (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(props.classList));
  Object.keys(props).forEach(function (key) {
    if (key.startsWith("data-")) {
      element.setAttribute(key, props[key]);
    }
  });

  for (var _len = arguments.length, children = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    children[_key - 1] = arguments[_key];
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = children[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var item = _step.value;

      element.appendChild(item);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator.return) {
        _iterator.return();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return element;
}

exports.createElement = createElement;

/***/ }),

/***/ "./Layout.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

var _TopMovies = __webpack_require__("./TopMovies.js");

var _TopMovies2 = _interopRequireDefault(_TopMovies);

var _BestMovies = __webpack_require__("./BestMovies.js");

var _BestMovies2 = _interopRequireDefault(_BestMovies);

__webpack_require__("./css/Layout.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Layout = function () {
    function Layout(container, props) {
        _classCallCheck(this, Layout);

        this.container = container;
        this.count = props.layersList.length;
        this.layers = [];
        this.activeLayerIndex = props.activeLayer;
        this.props = props;
        this.activeLayer = null;
    }

    _createClass(Layout, [{
        key: "create",
        value: function create() {
            var indexLayer = 1;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.layersList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var layer = (0, _Helpers.createElement)({
                        tag: "div",
                        classList: ["layer", "layer-" + indexLayer, item.link],
                        "data-id": indexLayer
                    });
                    this.layers.push(layer);
                    this.container.appendChild(layer);
                    indexLayer++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.activeLayer = this.layers[this.activeLayerIndex];
            this.activeLayer.classList.add("active");
            var topMovies = new _TopMovies2.default(this.layers[0]);
            topMovies.create();
            topMovies.loadingMovies();
            var bestMovies = new _BestMovies2.default(this.layers[0]);
            bestMovies.create();
            bestMovies.loadingMovies();
        }
    }, {
        key: "toggleLayer",
        value: function toggleLayer(newActiveId) {
            this.activeLayer.classList.toggle("active");
            this.activeLayerIndex = newActiveId;
            this.activeLayer = this.layers[newActiveId];
            this.activeLayer.classList.add("active");
        }
    }]);

    return Layout;
}();

exports.default = Layout;

/***/ }),

/***/ "./Modal.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/Modal.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Modal = function () {
  function Modal(container, prefix) {
    _classCallCheck(this, Modal);

    this.container = container;
    this.overflow = null;
    this.prefix = prefix;
    this.modal = null;
  }

  _createClass(Modal, [{
    key: "create",
    value: function create() {
      this.modal = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["modal", "modal" + this.prefix]
      });
      this.overflow = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["overflow", "overflow" + this.prefix]
      }, this.modal);
      this.container.appendChild(this.overflow);
    }
  }, {
    key: "appendInnerStructure",
    value: function appendInnerStructure(innerStructure) {
      this.modal.appendChild(innerStructure());
    }
  }, {
    key: "show",
    value: function show() {
      this.overflow.classList.add("active");
    }
  }, {
    key: "hide",
    value: function hide() {
      this.overflow.classList.remove("active");
      this.modal.innerHTML = "";
    }
  }]);

  return Modal;
}();

exports.default = Modal;

/***/ }),

/***/ "./MovieCard.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

var _Button = __webpack_require__("./Button.js");

var _Button2 = _interopRequireDefault(_Button);

__webpack_require__("./css/MovieCard.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MovieCard = function () {
  function MovieCard(container, props) {
    _classCallCheck(this, MovieCard);

    this.container = container;
    this.card = null;
    this.id = props.id;
    this.title = props.original_title;
    this.rate = props.vote_average;
    this.year = props.release_date;
    this.desc = props.overview;
    this.posterPath = "https://image.tmdb.org/t/p/w500" + props.poster_path;
    this.poster = null;
    this.buyTicketButton = null;
  }

  _createClass(MovieCard, [{
    key: "create",
    value: function create() {
      var cardCategory = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "part";

      var postfix = cardCategory;

      var cardPoster = (0, _Helpers.createElement)({
        tag: "img",
        classList: ["poster-" + postfix]
      });
      cardPoster.src = this.posterPath;
      this.poster = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["poster-wrap-" + postfix]
      }, cardPoster);
      var cardTitle = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movie-card-title-" + postfix]
      });
      cardTitle.innerHTML = this.title;
      var cardRate = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movie-card-rate-" + postfix]
      });
      cardRate.innerHTML = cardCategory === "part" ? this.rate + "/10" : "" + this.rate;
      var cardYear = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movie-card-year-" + postfix]
      });
      cardYear.innerHTML = this.year;
      var cardContnt = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movie-card-content-" + postfix]
      }, cardTitle, cardYear);
      var btnAddToBookmars = new _Button2.default({
        title: "Add Bookmark",
        classList: ["movie-card-btn-" + postfix]
      });
      if (cardCategory === "full" || cardCategory === "modal") {
        if (cardCategory !== "modal") {
          this.poster.appendChild(btnAddToBookmars.create());
        }
        var cardDesc = (0, _Helpers.createElement)({
          tag: "div",
          classList: ["movie-card-desc-" + postfix]
        });
        cardDesc.innerHTML = this.desc;
        cardContnt.appendChild(cardDesc);
      }
      var button = new _Button2.default({
        title: "Buy Ticket",
        classList: ["modal-btn"]
      });
      this.buyTicketButton = button.create();
      if (cardCategory === "modal") {
        cardContnt.appendChild(this.buyTicketButton);
      }
      this.card = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["movie-card-" + postfix],
        "data-id": this.id
      }, this.poster, cardContnt, cardRate);

      this.container.appendChild(this.card);
      return this.card;
    }
  }]);

  return MovieCard;
}();

exports.default = MovieCard;

/***/ }),

/***/ "./MoviesHelper.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MoviesHelper = function () {
  function MoviesHelper() {
    _classCallCheck(this, MoviesHelper);

    this.apiKey = "?api_key=191afa11366f646301a60a16fee09d34";
    this.url = "https://api.themoviedb.org/3/";
  }

  _createClass(MoviesHelper, [{
    key: "getApiKey",
    value: function getApiKey() {
      return this.apiKey;
    }
  }, {
    key: "getUrl",
    value: function getUrl() {
      return this.url;
    }
  }, {
    key: "getData",
    value: function getData(url) {
      var fullUrl = url;
      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", fullUrl);
        xhr.onload = function () {
          if (xhr.status === 200) {
            var json = JSON.parse(xhr.response);
            resolve(json);
          } else {
            reject(xhr.statusText);
          }
        };
        xhr.onerror = function (error) {
          reject(error);
        };
        xhr.send();
      });
    }
  }]);

  return MoviesHelper;
}();

exports.default = MoviesHelper;

/***/ }),

/***/ "./Navigation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/Navigation.scss");

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigation = function () {
    function Navigation(container, props) {
        _classCallCheck(this, Navigation);

        this.container = container;
        this.props = props;
        this.navigation = (0, _Helpers.createElement)({
            tag: "div",
            classList: [].concat(_toConsumableArray(props.classList))
        });
        this.links = [];
        this.activeTabIndex = props.activeTab;
        this.activeTab = null;
    }

    _createClass(Navigation, [{
        key: "create",
        value: function create() {
            var indexTab = 1;
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
                for (var _iterator = this.props.tabs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                    var item = _step.value;

                    var link = (0, _Helpers.createElement)({
                        tag: "a",
                        classList: ["tab-link"],
                        "data-id": indexTab
                    });
                    link.innerHTML = item.title;
                    link.href = "#" + item.link;
                    this.links.push(link);
                    var tab = (0, _Helpers.createElement)({
                        tag: "div",
                        classList: ["tab", "tab-" + indexTab]
                    }, link);
                    this.activeTab = this.links[this.activeTabIndex];
                    this.activeTab.classList.add("active");
                    this.navigation.appendChild(tab);
                    indexTab++;
                }
            } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
            } finally {
                try {
                    if (!_iteratorNormalCompletion && _iterator.return) {
                        _iterator.return();
                    }
                } finally {
                    if (_didIteratorError) {
                        throw _iteratorError;
                    }
                }
            }

            this.container.appendChild(this.navigation);
        }
    }, {
        key: "toggleActiveTab",
        value: function toggleActiveTab(newActiveId) {
            this.activeTab.classList.toggle("active");
            this.activeTabIndex = newActiveId;
            this.activeTab = this.links[newActiveId];
            this.activeTab.classList.add("active");
        }
    }]);

    return Navigation;
}();

exports.default = Navigation;

/***/ }),

/***/ "./Player.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Layout = __webpack_require__("./Layout.js");

var _Layout2 = _interopRequireDefault(_Layout);

var _Navigation = __webpack_require__("./Navigation.js");

var _Navigation2 = _interopRequireDefault(_Navigation);

var _Header = __webpack_require__("./Header.js");

var _Header2 = _interopRequireDefault(_Header);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var tabs = [{
  title: "Discover",
  link: "discoverx"
}, {
  title: "Trending",
  link: "trenfing"
}, {
  title: "New Releases",
  link: "new"
}, {
  title: "My Movies",
  link: "mytracks"
}];

var Player = function () {
  function Player(startActiveLayer) {
    _classCallCheck(this, Player);

    this.container = document.getElementById("app");
    this.navigation = new _Navigation2.default(this.container, {
      classList: ["tabs-list"],
      tabs: tabs,
      activeTab: startActiveLayer
    });
    this.header = new _Header2.default(this.container, {
      src: "./img/ArcLight_logo-2.png"
    });

    this.layout = new _Layout2.default(this.container, {
      layersList: tabs,
      activeLayer: startActiveLayer
    });
    this.header.create();
    this.navigation.create();
    this.layout.create();
    this.currentActiveTab = 0;
  }

  _createClass(Player, [{
    key: "init",
    value: function init() {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this.navigation.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var link = _step.value;

          link.addEventListener("click", this.handleClick.bind(this));
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    }
  }, {
    key: "handleClick",
    value: function handleClick(event) {
      event.preventDefault();
      var newActiveTab = event.target;
      var newActiveId = parseInt(newActiveTab.getAttribute("data-id"), 10) - 1;
      this.layout.toggleLayer(newActiveId);
      this.navigation.toggleActiveTab(newActiveId);
      console.log(newActiveId);
    }
  }]);

  return Player;
}();

exports.default = Player;

/***/ }),

/***/ "./Scrollbar.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/Scrollbar.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
}

var Scrollbar = function () {
    function Scrollbar(container, items, slideWith) {
        _classCallCheck(this, Scrollbar);

        this.container = container;
        this.scroll = null;
        this.shiftX = null;
        this.sliderCoords = null;
        this.newLeftCoods = null;
        this.mouseDownFlag = false;
        this.items = items;
        this.slideWith = slideWith;
    }

    _createClass(Scrollbar, [{
        key: "create",
        value: function create() {
            this.scroll = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["scrollbar"]
            });
            var scrollWrap = (0, _Helpers.createElement)({
                tag: "div",
                classList: ["scrollbar-wrap"]
            }, this.scroll);
            this.container.appendChild(scrollWrap);
            this.sliderCoords = getCoords(this.scroll);
            this.scroll.addEventListener("mousedown", this.startDrag.bind(this));
            this.scroll.addEventListener("dragstart", this.endDrag.bind(this));
            document.addEventListener("mouseup", this.endDrag.bind(this));
        }
    }, {
        key: "addLinks",
        value: function addLinks(items) {
            var _this = this;

            var scrollItem = null;
            items.forEach(function (item) {
                scrollItem = (0, _Helpers.createElement)({
                    tag: "div",
                    classList: ["scrollbar-item"]
                });
                scrollItem.innerHTML = item;
                _this.scroll.appendChild(scrollItem);
            });
        }
    }, {
        key: "startDrag",
        value: function startDrag(event) {
            this.shiftX = event.pageX;
            document.addEventListener("mousemove", this.moveMouse.bind(this));
            this.mouseDownFlag = true;
        }
    }, {
        key: "endDrag",
        value: function endDrag() {
            this.mouseDownFlag = false;
        }
    }, {
        key: "moveMouse",
        value: function moveMouse(event) {
            if (this.mouseDownFlag !== false) {
                this.newLeftCoods = event.pageX - this.shiftX - this.sliderCoords.left;
                if (this.newLeftCoods < 0) {
                    this.newLeftCoods = 0;
                }
                this.scroll.style.left = -this.newLeftCoods + "px";
                this.slideWith.style.left = -this.newLeftCoods * 1.5 + "px";
                console.log(this.slideWith);
            }
        }
    }]);

    return Scrollbar;
}();

exports.default = Scrollbar;

/***/ }),

/***/ "./TicketReservation.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

__webpack_require__("./css/TicketReservation.scss");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TicketReservation = function () {
  function TicketReservation(props) {
    _classCallCheck(this, TicketReservation);

    this.countPlaces = props.countPlace;
    this.dataAboutMovie = props.data;
    this.hallScheme = props.hallScheme;
    this.places = [];
  }

  _createClass(TicketReservation, [{
    key: "create",
    value: function create() {
      console.log(this.hallScheme);
      var ticketReservWrapper = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["ticket-reserv-wrapper"]
      });
      var placesWrapper = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["places-wrap"]
      });
      var startPosition = 100;
      var topPlank = 270;
      var leftPlank = startPosition;
      var placeMargin = 35;
      for (var i = 0; i < this.hallScheme.length; i++) {
        for (var j = 0; j < this.hallScheme[i].length; j++) {
          if (this.hallScheme[i][j] !== 0) {
            var placeElement = (0, _Helpers.createElement)({
              tag: "div",
              classList: ["place"]
            });
            placeElement.style.top = topPlank + "px";
            placeElement.style.left = leftPlank + "px";
            placeElement.addEventListener("click", this.handePlaceClick.bind(this));
            this.places.push(placeElement);
            placesWrapper.appendChild(placeElement);
          }
          leftPlank += placeMargin;
        }
        leftPlank = startPosition;
        topPlank += placeMargin;
      }
      ticketReservWrapper.appendChild(placesWrapper);
      return ticketReservWrapper;
    }
  }, {
    key: "handePlaceClick",
    value: function handePlaceClick(event) {
      var currentPlace = event.target;
      currentPlace.classList.add("active");
    }
  }]);

  return TicketReservation;
}();

exports.default = TicketReservation;

/***/ }),

/***/ "./TopMovies.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Helpers = __webpack_require__("./Helpers.js");

var _MoviesHelper = __webpack_require__("./MoviesHelper.js");

var _MoviesHelper2 = _interopRequireDefault(_MoviesHelper);

var _MovieCard = __webpack_require__("./MovieCard.js");

var _MovieCard2 = _interopRequireDefault(_MovieCard);

var _Scrollbar = __webpack_require__("./Scrollbar.js");

var _Scrollbar2 = _interopRequireDefault(_Scrollbar);

__webpack_require__("./css/TopMovies.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TopMovies = function () {
  function TopMovies(container) {
    _classCallCheck(this, TopMovies);

    this.container = container;
    this.movies = [];
    this.scrollBarLinks = [];
    this.topMoviesLayer = null;
    this.scroll = null;
    this.topMoviesUrl = "&primary_release_year=2017&page=8";
  }

  _createClass(TopMovies, [{
    key: "create",
    value: function create() {
      this.topMoviesLayer = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["top-movies"]
      });
      var topMoviesLayerWrap = (0, _Helpers.createElement)({
        tag: "div",
        classList: ["top-movies-wrap"]
      }, this.topMoviesLayer);
      this.scroll = new _Scrollbar2.default(topMoviesLayerWrap, this.scrollBarLinks, this.topMoviesLayer);
      this.scroll.create();
      this.container.appendChild(topMoviesLayerWrap);
    }
  }, {
    key: "loadingMovies",
    value: function loadingMovies() {
      var _this = this;

      var movieHelper = new _MoviesHelper2.default();
      var movieItem = null;
      movieHelper.getData(movieHelper.getUrl() + "discover/movie" + movieHelper.getApiKey() + this.topMoviesUrl).then(function (data) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = data.results[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var movie = _step.value;

            movieItem = new _MovieCard2.default(_this.topMoviesLayer, movie);
            _this.scrollBarLinks.push(movie.original_title);
            _this.movies.push(movieItem);
            movieItem.create();
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        _this.scroll.addLinks(_this.scrollBarLinks);
      }).catch(function (e) {
        console.log(e);
      });
    }
  }]);

  return TopMovies;
}();

exports.default = TopMovies;

/***/ }),

/***/ "./css/BestMovies.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/BestMovies.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/Header.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Header.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Header.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Header.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/Layout.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Layout.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Layout.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Layout.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/Modal.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Modal.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/MovieCard.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/MovieCard.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/MovieCard.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/MovieCard.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/Navigation.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Navigation.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Navigation.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Navigation.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/Scrollbar.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Scrollbar.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Scrollbar.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/Scrollbar.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/TicketReservation.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TicketReservation.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/TopMovies.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TopMovies.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TopMovies.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/TopMovies.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./css/style.scss":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/style.scss");
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__("../node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(true) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/style.scss", function() {
			var newContent = __webpack_require__("../node_modules/css-loader/index.js!../node_modules/sass-loader/lib/loader.js!./css/style.scss");
			if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _Player = __webpack_require__("./Player.js");

var _Player2 = _interopRequireDefault(_Player);

__webpack_require__("./css/style.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var startActiveLayer = 0;
var player = new _Player2.default(startActiveLayer);
player.init();

/***/ })

/******/ });