'use strict';
/*
 'use strict' is not required but helpful for turning syntactical errors into true errors in the program flow
 http://www.w3schools.com/js/js_strict.asp
*/

/*
 Modules make it possible to import JavaScript files into your application.  Modules are imported
 using 'require' statements that give you a reference to the module.

  It is a good idea to list the modules that your application depends on in the package.json in the project root
 */
var util = require('util');
var http = require('http');

/*
 Once you 'require' a module you can reference the things that it exports.  These are defined in module.exports.

 For a controller in a127 (which this is) you should export the functions referenced in your Swagger document by name.

 Either:
  - The HTTP Verb of the corresponding operation (get, put, post, delete, etc)
  - Or the operationId associated with the operation in your Swagger document

  In the starter/skeleton project the 'get' operation on the '/hello' path has an operationId named 'hello'.  Here,
  we specify that in the exports of this module that 'hello' maps to the function named 'hello'
 */
module.exports = {
  //getdashboarddata: fnGetDashboardDataForClient,
  getdashboarddata: fnGetDashboardDataForClientDummy,

};


/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function fnGetDashboardDataForClient(req, response) {
  //var query = url.parse(req.url, true).query;
  var clientid = req.swagger.params.clientid.value || 'empty';
  console.log("clientid=" + clientid);
  var options = {
    host: 'default-dot-nmclvpoc.appspot.com',
    path: '/?productnum=' + clientid
  };
  console.log("\n\n\n" + options + "\n\n\n");
  var str = '';
  var callback = function(res) {
    //another chunk of data has been recieved, so append it to `str`
    res.on('data', function(chunk) {
      str += chunk;
    });
    //the whole response has been recieved, so we just print it out here
    res.on('end', function() {
      console.log(str);
      response.header('Access-Control-Allow-Origin', '*');
      //response.status(200).send(str);
      response.json(str);
    });
  }
  http.request(options, callback).end();
}

/*
  Functions in a127 controllers used for operations should take two parameters:

  Param 1: a handle to the request object
  Param 2: a handle to the response object
 */
function fnGetDashboardDataForClientDummy(req, res) {
  var client = getClient();
  client.Products = getProducts();
  var dashboardData = {
    "Client": client
  }
  /*var dashboardData = {
    "Client": {
       client_id: "123"
    }
  }*/
  //var dashboardData = "dummy";
  res.header('Access-Control-Allow-Origin', '*');
  res.json(dashboardData);

}

//proxy
function getProducts() {
  var products = [ { 
        "product_id_num":1,
      "product_num":100,
      "product_type_cde":1,
      "role_type_txt": "Insured",
      "payment_amount":500,
      "payment_freq":"Monthly",
      "owner_type_cde":1,
      "plan_txt":"Basic Med Life",
      "benefit_amt":2000,
      "total_value":15000,
      "dividend_amt":600,
      "loan_amt":1200
      },
      { 
        "product_id_num":1,
      "product_num":100,
      "product_type_cde":1,
      "role_type_txt": "Insured",
      "payment_amount":500,
      "payment_freq":"Monthly",
      "owner_type_cde":1,
      "plan_txt":"Basic Med Life",
      "benefit_amt":2000,
      "total_value":15000,
      "dividend_amt":600,
      "loan_amt":1200
      }
      ];
  return products;
}
function getClient() {
  var client = { 
        "client_id":1,
      "client_type_cde":1,
      "taxpayer_id":"222-22-2222",
      "full_name":"Ranjith Nair",
      "email":"rj@gmail.com",
      "birth_dte":"1/1/2000"
      };
  return client;
}
