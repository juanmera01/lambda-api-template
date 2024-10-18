'use strict';

const enableLoggingDebug = process.env.EnableLoggingDebug == "true";

exports.handler = async (event, context) => {
	enableLoggingDebug && console.debug("Running options-root handler");
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Allow': "OPTIONS"
		},
		body: JSON.stringify(
			{
				"title": "Template API runnning over lambda function",
				"links": []
			}
		)
	}
}