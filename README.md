# lambda-api-template
This is a node template for a simple API running over AWS Lambda.

## This is a template, it means that you MUST adapt the project to your need. 

If you want this code to run in a Lambda function behind an API Gateway, you need to configure the **integration templates**. 

Apart from code changes. That includes:
* Replace all "resource" placeholder with your entities.
* Fill up the dummy handlers and create more if needed.
* Create the needed resources on `resource.js`.
* Adapt the jest tests and write more.

In order to deploy this to API Gateway with Lambda please note the following:
- This is aimed to work with REST API type
- The resources must not be proxy resources (/{proxy+}) it's just ok with normal path parameter resources ({resource})
- There isn't needed any kind of mapping templates or other configuration more than creating the resorces and the methods
- To configure an API-KEY you need to attach it to an usage plan and with the API itself (and send the apikey in x-api-key header)
