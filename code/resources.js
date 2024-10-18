'use strict';

const enableLoggingDebug = process.env.EnableLoggingDebug == "true";

const supportedResources = {
	"/": {
		methods: {
            "get": require("./get-resource").handler,
			"options": require("./options-root").handler
		}
	},
    "/{resource}": {
		pathParams: ["resource"],
		methods: {
			"get": require("./get-resource").handler,
            "post": require("./set-resource").handler,
			"options": require("./options-resource").handler
		}
	},
}

// ------------------ FROM HERE TO BELOW YOU DON'T NEED TO ADAPT ENYTHING ---------------------------

module.exports = {
	getHandler: function (event) {
		if (!(
			event &&
			event.resource &&
			event.httpMethod &&
			event.headers
		)) {
			console.error("Invalid event")
			throw {
				statusCode: 400,
			}
		}
		const resource = supportedResources[event.resource];
		if (resource && typeof resource.methods[event.httpMethod.toLowerCase()] == "function") {
			enableLoggingDebug && console.debug("Matching resource found", resource);
			if ((!resource.pathParams) || (
				event.pathParameters &&
				resource.pathParams.every(pp => { return (typeof event.pathParameters[pp] == "string" && event.pathParameters[pp].length > 0) })
			)) {
				return resource.methods[event.httpMethod.toLowerCase()]
			} else {
				console.error("Path parameters not satisfied", resource.pathParams, event.pathParameters)
				throw {
					statusCode: 400
				}
			}
		} else if (resource) {
			throw {
				statusCode: 405,
				headers: {
					"Allow": Object.keys(resource.methods).map(a => { return a.toUpperCase() }).join(",")
				}
			}
		} else {
			console.error("Unsupported resource")
			throw {
				statusCode: 403
			}
		}
	}
}