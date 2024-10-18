

const { getHandler } = require("../resources");

const noPathParameters = {
    httpMethod: "get",
    resource: "/resource"
};

const noMethodEvent = {
    resource: "/{resource}",
    pathParameters: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }
};

const unsupportedResource = {
    httpMethod: "get",
    resource: "/not-a-resource",
    pathParameters: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }

};

const badPathParams1 = {
    httpMethod: "get",
    resource: "/{resource}",
    pathParameters: {
        "notaresource": "any"
    },
    headers: { "host": "a.host.com" }

};

const badPathParams2 = {
    httpMethod: "get",
    resource: "/{resource}",
    pathParameters: {
        "resource": ""
    },
    headers: { "host": "a.host.com" }

};

const badPathParams3 = {
    httpMethod: "post",
    resource: "/{resource}",
    body: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }

};

const unsupportedMethodEvent = {
    httpMethod: "put",
    resource: "/{resource}",
    pathParameters: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }

};

const getRoot = {
    httpMethod: "GET",
    resource: "/",
    headers: { "host": "a.host.com" }

};

const optionsRoot = {
    httpMethod: "OPTIONS",
    resource: "/",
    headers: { "host": "a.host.com" }
};

const optionsResource = {
    httpMethod: "options",
    resource: "/{resource}",
    pathParameters: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }

};

const setOneResource = {
    httpMethod: "post",
    resource: "/{resource}",
    pathParameters: {
        "resource": "any"
    },
    body: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }

};

const setOneResourceWithoutBody = {
    httpMethod: "post",
    resource: "/{resource}",
    pathParameters: {
        "resource": "any"
    },
    headers: { "host": "a.host.com" }

};

describe("Low level event validity tests", () => {
    test("No event", async () => {
        let e;
        try {
            await getHandler();
            e = new NoErrorThrownError("Should throw an error on no event")
        } catch (err) {
            expect(err.statusCode).toEqual(400);
        }
        if (e) throw e;
    });
    test("No path parameters", async () => {
        let e;
        try {
            await getHandler(noPathParameters);
            e = new NoErrorThrownError("Should throw an error on no path parameters")
        } catch (err) {
            expect(err.statusCode).toEqual(400);
        }
        if (e) throw e;
    });
    test("No method", async () => {
        let e;
        try {
            await getHandler(noMethodEvent);
            e = new NoErrorThrownError("Should throw an error on no method")
        } catch (err) {
            expect(err.statusCode).toEqual(400);
        }
        if (e) throw e;
    });
    test("Bad resource", async () => {
        let e;
        try {
            await getHandler(unsupportedResource);
            e = new NoErrorThrownError("Should throw an error on unsupported resource")
        } catch (err) {
            expect(err.statusCode).toEqual(403);
        }
        if (e) throw e;
    });
    test("Bad path params 1", async () => {
        let e;
        try {
            await getHandler(badPathParams1);
            e = new NoErrorThrownError("Should throw an error on bad path params")
        } catch (err) {
            expect(err.statusCode).toEqual(400);
        }
        if (e) throw e;
    });
    test("Bad path params 2", async () => {
        let e;
        try {
            await getHandler(badPathParams2);
            e = new NoErrorThrownError("Should throw an error on bad path parameters")
        } catch (err) {
            expect(err.statusCode).toEqual(400);
        }
        if (e) throw e;
    });
    test("Bad path params 3", async () => {
        let e;
        try {
            await getHandler(badPathParams3);
            e = new NoErrorThrownError("Should throw an error on bad path parameters")
        } catch (err) {
            expect(err.statusCode).toEqual(400);
        }
        if (e) throw e;
    });
    test("Unsupported method", async () => {
        let e;
        try {
            await getHandler(unsupportedMethodEvent);
            e = new NoErrorThrownError("Should throw an error on unsupported method")
        } catch (err) {
            expect(err.statusCode).toEqual(405);
        }
        if (e) throw e;
    });
});


describe("options tests", () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { EnableLoggingDebug: "true", ...OLD_ENV }; // Make a copy
    });

    afterEach(() => {
        process.env = OLD_ENV; // Restore old environment
    });
    test("Options /", async () => {
        const handler = require("../index.js").handler;
        const response = await handler(optionsRoot);
        expect(response.statusCode).toEqual(200);
        expect(response.headers["Allow"]).toEqual("OPTIONS")
        expect(response.body).toEqual(JSON.stringify({
            "title": "Template API runnning over lambda function",
            "links": []
        }
        ))
    });
    test("Options resource", async () => {
        const handler = require("../index.js").handler;
        const response = await handler(optionsResource);
        expect(response.statusCode).toEqual(200);
        expect(response.headers["Allow"]).toEqual("GET,POST,OPTIONS")
        expect(response.body).toEqual(JSON.stringify({
            "title": "Template API runnning over lambda function",
            "links": [
                {
                    "rel": "fetch",
                    "title": "Fetch resource",
                    "href": "https://a.host.com/",
                    "mediaType": "applicaiton/json",
                },
                {
                    "rel": "set",
                    "title": "Set resource",
                    "href": "https://a.host.com/",
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

        ))
    });
});

describe("Content tests", () => {
    const OLD_ENV = process.env;
    beforeEach(() => {
        jest.resetModules() // Most important - it clears the cache
        process.env = { EnableLoggingDebug: "untrue", ...OLD_ENV }; // Make a copy
    });
    
    afterEach(() => {
        process.env = OLD_ENV; // Restore old environment
    });
    test("Get root", async () => {
        //        process.env.EnableLoggingDebug = "true"
        const handler = require("../index.js").handler;
        const response = await handler(getRoot);
        expect(response.statusCode).toEqual(200);
        expect(response.headers["Content-Length"]).toEqual(JSON.stringify({ "Hello": "world" }).length)
        expect(response.headers["Content-Type"]).toEqual("applicaiton/json")
        expect(response.headers["Content-Range"]).toBeUndefined()
        expect(response.body).toEqual({ "Hello": "world" })
    });
    test("Set one resource", async () => {
        //        process.env.EnableLoggingDebug = "true"
        const handler = require("../index.js").handler;

        const response = await handler(setOneResource);
        expect(response.statusCode).toEqual(200);
        expect(response.headers["Content-Length"]).toEqual(JSON.stringify({ "resource": "any" }).length)
        expect(response.headers["Content-Type"]).toEqual("applicaiton/json")
        expect(response.body).toEqual({ "resource": "any" });

    });
    test("Set one resource without body", async () => {
        //        process.env.EnableLoggingDebug = "true"
        const handler = require("../index.js").handler;

        const response = await handler(setOneResourceWithoutBody);
        expect(response.statusCode).toEqual(400);
        
    });

});