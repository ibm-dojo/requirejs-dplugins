/**
 * Promise plugin.
 *
 * This plugin returns an ES6 compliant Promise implementation. It returns the implementation from the
 * browser if there is one. If the browser does not support Promise, this plugin returns the lie.js
 * Promise shim.
 *
 * @example:
 *      To create a promise:
 *      ```
 *      require(["requirejs-dplugins/Promise!"], function (Promise){
 *         var promise = new Promise(function (resolve, reject) {
 *             ...
 *         });
 *      });
 *      ```
 *
 * @module requirejs-dplugins/Promise
 */
/* global Promise */
define(["require"], function (require) {
	return {
		load: function (name, req, onload, config) {
			config = config || {};
			if (config.isBuild) {
				onload();
			} else if (typeof Promise === "function") {
				onload(Promise);
			} else {
				// Use absolute path to allow map configuration.
				// Also use a variable to avoid RequireJS detection at build time so it is not included in the
				// layer.
				var lieId = "lie/dist/lie";
				require([lieId], function (lie) {
					onload(lie);
				});
			}
		}
	};
});
