'use strict';
const {getHandler} = require('./resources');

const enableLoggingDebug = process.env.EnableLoggingDebug == "true";

/*
*
* It's not needed to do anything here, this handler is generic
*
*/
exports.handler = async (event, context) => {
	enableLoggingDebug && console.debug("Running event: ", JSON.stringify(event));
	let returnValue = {}
	try {
		const resourceHandler = await getHandler(event);
		returnValue = await resourceHandler(event, context);
	} catch (e) {
		console.error("Error trapped", e);
		returnValue = {
			statusCode: e.statusCode ? e.statusCode : 500,
			headers: e.headers ? e.headers : {}
		}		
	}
	enableLoggingDebug && console.debug("Returning: ", JSON.stringify(returnValue));
	return returnValue;
};