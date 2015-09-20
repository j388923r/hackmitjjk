Clarifai API Client for node.js
==================



[Clarifai](http://www.clarifai.com) provides an API for image recognition. This node.js module makes it easy to incorporate Clarifai image tagging and other capabilities into your node.js backend. It wraps [Clarifai's REST API](http://developer.clarifai.com). Please refer to that documentation for a complete description of capabilites. This documentation assumes you are familiar with that material.

Table of Contents
================
**Get started**

1. [Setup](#setup)
1. [Online documentation](#documentation)

Setup
-------------
To setup your project, follow these steps:

 1. Download the file clarifai_node.js
 2. In your node.js program require the *clarifai_node.js* module, adjusting the path to your setup. For example, if you put clarifai_node.js in the same directory that your node.js program runs in, then the following line will include it.

```javascript
var Clarifai = require('./clarifai_node.js');
```
3. Initialize the client with your Client ID and Client Secret. You can find them in the [Applications](https://developer.clarifai.com/applications) section of your developer profile. Note that Client IDs and Client Secrets come in pairs, with each pair associated with a single application.

```javascript
Clarifai.initAPI("your Client Id", "your Client Secret" );
```

Note that if you put your Client ID and Client Secret in environment variables CLIENT_ID and CLIENT_SECRET respectively, then the following call will pick them up and initialize the API.

```javascript
Clarifai.initAPI(process.env.CLIENT_ID, process.env.CLIENT_SECRET);
```

If you don't have module stdio, install it.
```
$ npm install stdio
```

Now you're ready to make calls to the Clarifai API.

At a command prompt in the folder where you downloaded the Clarifai node.js API client, run the supplied sample program. NOTE: the sample program assumes you have set the environment variables CLIENT_ID and CLIENT_SECRET. Review the source for examples of how to use the API client.

```
$ node clarifai_sample.js
```

Invoke the sample with --help to see a couple of convenience features.

```
$ node clarifai_sample.js --help
USAGE: node clarifai_sample.js [OPTION1] [OPTION2]... arg1 arg2...
The following options are supported:
  --print-results 	print results
  --print-http    	print HTTP requests and responses
  -v, --verbose   	verbose output
```
Documentation
================

This documentation is limited to incorporating the node.js client module into your backend. For a complete information on the API, check [our developer site](http:/developer.clarifai.com). 

Callbacks
----------------------
Methods on the API take a parameter which is a callback function. The callback function will eventually be called when the response to the request is available, or an unrecoverable error occurs.

Local Ids
----------------------
The API methods that process images accept a parameter *localId* which a list of ids you use to identify the specific images you submit to the API. If you supply this parameter, the API returns your local_id in the results for each image. You can pass null if you don't need a unique id associated with each image.

Non-default Models
----------------------
By default, the API classifies images and accepts feedback against the default Clarifai model. In some circumstances, you may be given access to an alternate model. To use a non-default model, call *setModel* with the name of your model. 

```javascript
Clarifai.setModel( "your-model-name" )
```

Error Handling
----------------------
It is possible for requests to encounter errors that the API cannot recover from and must surface to your program. The asynchronous nature of the interface complicates the way that your program can understand the error. To help with this situation, when you receive an error result the API populates a results dictionary with an entry for each image passed to the API method. Each dictionary entry has the members "status_code" and "local_id". Examining the results object should allow you to determine which images caused an error.

Queuing Requests
----------------------
The REST API requires an access token to be presented in all requests (except for requesting a new access token). These access tokens expire periodically. When the access token expires, the API is effectively unavailable to your application until a new one is retrieved. Because this node.js client is handling the request for a new access token automatically, we queue any requests that arrive while a) the access token is invalid and b) the access token request and response are in flight. Once the new access token is received, we unspool the queued requests. This should be completely transparent to you unless something goes awry with the retrieval of a valid access token.

Throttling
----------------------
At various times the server will instruct the client to temporarily stop submitting requests for intervals on the order of many seconds. Because the client cannot submit requests during this period, they are refused with an error indicating that the server is throttling the client. Specifically, the result_code member of the result object will be "ERROR_THROTTLED". To help you manage workload while accomodating the occasional throttled state, the API allows you to register a callback that will be notified when the API state has changed to Throttled and also when the Throttled state ends and normal API request submissions can resume. We recommend that you register a throttle event listener in order to better handle the transitions from normal operation to Throttled and back.

Thread Safety
----------------------
Note this version of the Clarifai node.js API client is *not* thread safe. There is shared state in the client module that precludes concurrent use by muliple threads.




