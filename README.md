# lambda-api-template
This is a node template for a simple API running over AWS Lambda.

## This is a template, it means that youu MUST adapt the project to your need. 

If you want this code to run in a Lambda function behind an API Gateway, you need to configure the **integration templates**. 

Apart from code changes. That includes:
* Replace all "resource" placeholder with your entities.
* Fill up the dummy handlers and create more if needed.
* Create the needed resources on `resource.js`.
* Adapt the jest tests and write more.
