'use strict';

const enableLoggingDebug = process.env.EnableLoggingDebug == "true";

exports.handler = async (event, context) => {
	enableLoggingDebug && console.debug("Running get-resource handler");

	let resource;
	if(event.pathParameters){
		resource = event.pathParameters["resource"];
	}
	if(resource){
		// Do something with concrete resource
	}

	// Fetch whatever resource you want to response with
	let echoResponse = {
		"Hello": "world"
	};

	// Return the resoult
	const response = {
		statusCode: 200,
		headers: {
			'Content-Type': 'applicaiton/json',
			'Content-Length': JSON.stringify(echoResponse).length
		},
		body: echoResponse
	}
	return response;
}