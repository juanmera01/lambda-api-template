'use strict';

const enableLoggingDebug = process.env.EnableLoggingDebug == "true";

exports.handler = async (event, context) => {
    enableLoggingDebug && console.debug("Running set-config handler");

    const resource = event.pathParameters["resource"];

    // new version checking
    if (!event.body) {
        console.error("Request body is missing");
        throw {
            statusCode: 400
        }
    }
    let requestBody = event.body;

    // Do your thing

    const response = {
        statusCode: 200,
        headers: {
            'Content-Type': 'applicaiton/json',
            'Content-Length': JSON.stringify(requestBody).length
        },
        body: requestBody
    };
    return response;
}