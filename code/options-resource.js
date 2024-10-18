'use strict';

const enableLoggingDebug = process.env.EnableLoggingDebug == "true";

exports.handler = async (event, context) => {
	enableLoggingDebug && console.debug("Running options-resource handler");
	const selfURL = event.headers["x-original-url"] || `https://${event.headers.host}/`
	
	// Return the file contents and headers
	return {
		statusCode: 200,
		headers: {
			'Content-Type': 'application/json',
			'Allow': "GET,POST,OPTIONS"
		},
		body: JSON.stringify(
			{
				"title": "Template API runnning over lambda function",
				"links": [
					{
						"rel": "fetch",
						"title": "Fetch resource",
						"href": selfURL,
						"mediaType": "applicaiton/json",
					},
                    {
                        "rel": "set",
                        "title": "Set resource",
                        "href": selfURL,
                        "mediaType": "application/json",
                        "schema": {
                            "type": "object",
                            "properties": {
                                "resource": {
                                    "description": "Some stuff",
                                    "type": "string"
                                }
                            },
                            "required": ["resource"]
                        }
                    }
				]
			}
		)
	}
}