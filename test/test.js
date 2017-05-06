const assert = require('assert')

describe('Node Js Simple Tests', function(done){


    it("Very Basic HTTP Server for a single request! Terminates when receives a single GET at http://localhost:3000", function(done){
        console.log("Starting Test1")
        var http = require('http')
        function requestHandler (request, response){  
            console.log("URL:",request.url,"Method",request.method )
            if ( request.url = "/"){
                response.end('TEST1: Hello World from Node.js Server!')
                console.log("Closing Test1")
                server.close(done)
            }
            else{
                response.statusCode = 404;
                response.end("Not Found!")
            }
        }
        var server = http.createServer(requestHandler)
        server.listen( 3000 , (err) => {  
            if (err) {
                return console.log('ERROR from Node.js Server:', err)
            }
        })
    })

    it("Very Basic HTTP Server for a two request! Terminates when receives a single POST at http://localhost:3000/login", function(done){
        console.log("Starting Test2")
        var http = require('http')
        var fs = require('fs')
        function requestHandler (request, response){
            console.log("URL:",request.url,"Method",request.method )
            if (request.url == "/"){
                var buffer = fs.readFileSync("hello.html")
                response.end(buffer)           
            }
            else if (request.url == "/login" && request.method == "GET"){
                var buffer = fs.readFileSync("login.html")
                response.end(buffer)
            }
            else if (request.url == "/login" && request.method == "POST"){
                var buffer = fs.readFileSync("login.html")
                response.end(buffer)
                console.log("Closing Test2")
                server.close(done)
            }
            else{
                response.statusCode = 404;
                response.end("Not Found!")
            }
        }
        var server = http.createServer(requestHandler)
        server.listen( 3000 , (err) => {  
            if (err) {
                return console.log('ERROR from Node.js Server:', err)
            }
        })
    })

    it("Very Basic HTTP Server with Login Page! Terminates when receives POST with test/test user/pass!", function(done){
        console.log("Starting Test3")
        var http = require('http')
        var fs = require('fs')
        var authenticated = false;
        function requestHandler (request, response){
            console.log("URL:",request.url,"Method",request.method )
            //console.log("Headers",request.headers)
            var body = ""
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                console.log("Body:",body)
                if(request.method == "GET" && request.url == "/"){
                    var buffer = fs.readFileSync("hello.html")
                    response.end(buffer) 
                }
                else if(request.method == "GET" && request.url == "/login"){
                    var buffer = fs.readFileSync("login.html")
                    response.end(buffer) 
                }
                else if (request.method == "POST" && request.url == "/login"){
                    var querystring = require('querystring');
                    var post = querystring.parse(body);
                    console.log("POST JSON:",post)
                    if (post.userid == "test" && post.password == "test"){
                        var buffer = fs.readFileSync("auth_success.html")
                        response.end(buffer)
                        console.log("Closing Test3")
                        server.close(done)
                    }
                    else{
                        var buffer = fs.readFileSync("auth_fail.html")
                        response.end(buffer)                         
                    }
                }                
                else{
                    response.statusCode = 404;
                    response.end("Not Found!")
                }
            })
        }
        var server = http.createServer(requestHandler)
        server.listen( 3000 , (err) => {  
            if (err) {
                return console.log('ERROR from Node.js Server:', err)
            }
        })
    })

    it.only("Very Basic HTTP Server with Login Page! Uses Cookies for authentication after login!", function(done){
        console.log("Starting Test3")
        var http = require('http')
        var fs = require('fs')
        var authenticated = false;
        function requestHandler (request, response){
            console.log("URL:",request.url,"Method",request.method)
            console.log("Cookie:",request.headers.cookie)
            //console.log("Headers",request.headers)
            var body = ""
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                console.log("Body:",body)
                if(request.method == "GET" && request.url == "/"){
                    var buffer = fs.readFileSync("hello.html")
                    response.end(buffer) 
                }
                else if(request.method == "GET" && request.url == "/login"){
                    var buffer = fs.readFileSync("login.html")
                    response.end(buffer) 
                }
                else if (request.method == "POST" && request.url == "/login"){
                    var querystring = require('querystring');
                    var post = querystring.parse(body);
                    console.log("POST JSON:",post)
                    if (post.userid == "test" && post.password == "test"){
                        var buffer = fs.readFileSync("auth_success.html")
                        response.writeHead(200, {
                            'Set-Cookie': 'userid=123',
                            'Set-Cookie': 'mykey=' + Math.random().toString(),
                            'Content-Type': 'text/html'
                        });
                        response.end(buffer)
                        console.log("Closing Test3")
                    }
                    else{
                        var buffer = fs.readFileSync("auth_fail.html")
                        response.end(buffer)                         
                    }
                }                
                else{
                    response.statusCode = 404;
                    response.end("Not Found!")
                }
            })
        }
        var server = http.createServer(requestHandler)
        server.listen( 3000 , (err) => {  
            if (err) {
                return console.log('ERROR from Node.js Server:', err)
            }
        })
    })

})
