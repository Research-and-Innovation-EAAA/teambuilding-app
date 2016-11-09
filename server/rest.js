var Busboy = Meteor.npmRequire('busboy');

// Global API configuration
var ApiV1config = {
    useDefaultAuth: true,
    prettyJson: true,
    enableCors: true,
    apipath: "/api",
    version: "v1"
};
var ApiV1 = new Restivus(ApiV1config);

// Maps to: /api/registrations
ApiV1.addRoute('registrations', {authRequired: true}, {
    get: function () {
        var regs = [];
        Registrations.find({createdBy: this.userId}).forEach(function (reg) {
            regs.push(reg);
        });
        return regs;
    }
});

// Maps to: /api/registrations/:id
ApiV1.addRoute('registrations/:id', {authRequired: true}, {
    get: function () {
        return Registrations.findOne({_id: this.urlParams.id, createdBy: this.userId});
    }
});

//picker
var pickerAuthorized = Picker.filter(function (req, res) {
    return true;
});
pickerAuthorized.route(
    ApiV1config.apipath + "/" + ApiV1config.version + "/upload",
    function (params, req, res, next) {
        console.log('x-user-id ', req.headers['x-user-id']);
        console.log('x-auth-token ', req.headers['x-auth-token']);
        var userSelector = {
            "_id": req.headers['x-user-id'],
            // "token": req.headers['x-auth-token']
            "services.resume.loginTokens.hashedToken": Accounts._hashLoginToken(req.headers['x-auth-token'])
        };
        console.log("userSelector: ", userSelector);
        var user = Meteor.users.findOne(userSelector);
        console.log("User: ", user);
        if (!user) {
            res.writeHead(401, {Connection: 'close'});
            res.end("Not authorized");
            return;
        }

        var busboy = new Busboy({headers: req.headers});
        busboy.on('file', function (fieldname, file, filename, encoding, mimetype) {
            console.log('Receiving file [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

            if (mimetype != 'application/octet-stream') {
                console.log('Wrong file type!');
                res.writeHead(415, {Connection: 'close'});
                res.end("Wrong file type, must be CSV in a ZIP file!");
                return;
            }

            file.on('data', function (data) {
                console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
            });
            file.on('end', function () {
                console.log('File [' + fieldname + '] Finished');
            });

        });
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('Field [' + fieldname + ']: value: ' + inspect(val));
        });
        busboy.on('finish', function () {
            console.log('Done parsing form!');
            res.writeHead(200, {Connection: 'close'});
            res.end("Done uploading");
        });
        req.pipe(busboy);
    });
pickerAuthorized.route(
    ApiV1config.apipath +
    "/" + ApiV1config.version
    + '/download', function (params, req, res, next) {
        console.log("download");
        res.end("download");
    }
);


ApiV1.addRoute('swagger.json', {authRequired: false}, {
    get: function () {
        var pat = /[^https?://][^/]*/i;
        var absurl = Meteor.absoluteUrl();
        var urlarr = pat.exec(absurl);
        var host = urlarr[0];

        return {
            "swagger": "2.0",
            "info": {
                "version": "1.0.0",
                "title": "How-R-you API",
                "description": "This API gives access to retrieve data registrations from the How-R-you database",
                "termsOfService": "http://how-r-you.dk/index.php/da/privatliv-og-betingelser",
                "contact": {
                    "name": "Morten Mathiasen"
                },
                "license": {
                    "name": "MIT"
                }
            },
            "consumes": [
                "application/x-www-form-urlencoded",
                "application/json"
            ],
            "host": host,
            "basePath": "/api/v1",
            "paths": {
                "/login": {
                    "parameters": [
                        {
                            "name": "username",
                            "in": "formData",
                            "description": "Username used to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "password",
                            "in": "formData",
                            "description": "Password used to access How-R-you",
                            "type": "string",
                            "required": true
                        }
                    ],
                    "post": {
                        "responses": {
                            "200": {
                                "description": "Login using username and password succeeded and reponse contains authentication token and user id."
                            }
                        }
                    }
                },
                "/logout": {
                    "parameters": [
                        {
                            "name": "X-Auth-Token",
                            "in": "header",
                            "description": "Token used to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "X-User-id",
                            "in": "header",
                            "description": "User identifier to access How-R-you",
                            "type": "string",
                            "required": true
                        }
                    ],
                    "post": {
                        "responses": {
                            "200": {
                                "description": "Logout has successfully disabled retrieved authentication token and user id."
                            }
                        }
                    }
                },
                "/upload": {
                    "parameters": [
                        {
                            "name": "X-Auth-Token",
                            "in": "header",
                            "description": "Token used to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "X-User-id",
                            "in": "header",
                            "description": "User identifier to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "payload",
                            "in": "formData",
                            "description": "File to upload to How-R-you server",
                            "type": "file",
                            "format": "binary",
                            "required": true
                        }
                    ],
                    "post": {
                        "responses": {
                            "200": {
                                "description": "Logout has successfully disabled retrieved authentication token and user id."
                            }
                        }
                    }
                },
                "/registrations": {
                    "parameters": [
                        {
                            "name": "X-Auth-Token",
                            "in": "header",
                            "description": "Token used to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "X-User-id",
                            "in": "header",
                            "description": "User identifier to access How-R-you",
                            "type": "string",
                            "required": true
                        }
                    ],
                    "get": {
                        "responses": {
                            "200": {
                                "description": "Response contains all registrations owned by user."
                            }
                        }
                    }
                },
                "/registrations/{id}": {
                    "parameters": [
                        {
                            "name": "X-Auth-Token",
                            "in": "header",
                            "description": "Token used to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "X-User-id",
                            "in": "header",
                            "description": "User identifier to access How-R-you",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "id",
                            "in": "path",
                            "description": "ID",
                            "type": "string",
                            "required": true
                        }
                    ],
                    "get": {
                        "responses": {
                            "200": {
                                "description": "Response contains users registration for requested ID."
                            }
                        }
                    }
                }
            }
        };
    }
});
