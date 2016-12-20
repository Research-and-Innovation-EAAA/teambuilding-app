var Busboy = Meteor.npmRequire('busboy');
var Unzip = Meteor.npmRequire('unzip2');

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

// Maps to: /api/registrations/metadata
ApiV1.addRoute('registrations/metadata', {authRequired: true}, {
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

// Maps to: /api/smartwatchview
ApiV1.addRoute('smartwatchview', {authRequired: true}, {
    post: function () {
        console.log('Adding view data');

        var data = JSON.parse(this.bodyParams.data);

        SmartWatchView.insert({
            "date": this.bodyParams.date,
            "device": this.bodyParams.device,
            "userId": this.userId,
            "data": data
        });

        return {
            statusCode: 201
        };
    }
});

//picker
Picker.route("*",
    function (params, req, res, next) {
        //Authenticate user before further action
        console.log('x-user-id ', req.headers['x-user-id']);
        console.log('x-auth-token ', req.headers['x-auth-token']);
        var userSelector = {
            "_id": req.headers['x-user-id'],
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
        next();
    }
);
Picker.route(
    ApiV1config.apipath + "/" + ApiV1config.version + "/smartwatch",
    function (params, req, res, next) {
        console.log('x-user-id ', req.headers['x-user-id']);
        console.log('x-auth-token ', req.headers['x-auth-token']);

        var userSelector = {
            "_id": req.headers['x-user-id'],
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
        busboy.on('file', Meteor.bindEnvironment(function (fieldname, file, filename, encoding, mimetype) {
            console.log('Receiving file [' + fieldname + ']: filename: ' + filename + ', encoding: ' + encoding + ', mimetype: ' + mimetype);

            file.pipe(Unzip.Parse())
                .on('entry', Meteor.bindEnvironment(function (entry) {
                    console.log(entry);

                    var fileName = entry.path;
                    var type = entry.type; // 'Directory' or 'File'
                    var size = entry.size;
                    if (type === "File") {
                        var date = /_(\d*).csv/i.exec(fileName)[1];

                        // get stream to database
                        writeStream = SmartWatchFiles.upsertStream({
                            filename: fileName,
                            contentType: "text/csv",
                            metadata: {owner: req.headers['x-user-id'], date: date}
                        });

                        entry.pipe(writeStream);
                    } else {
                        entry.autodrain();
                    }
                }));

            file.on('end', function () {
                // res.end(Buffer.concat(bufs, bufSize));
                //          res.end();
                res.writeHead(200, {Connection: 'close'});
                res.end("Done uploading");
            });

        }));
        busboy.on('field', function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
            console.log('Field [' + fieldname + ']: value: ' + val);
        });
        busboy.on('finish', function () {
            console.log('Done parsing form!');
        });

        req.pipe(busboy);
    });


Picker.route(
    ApiV1config.apipath + "/" + ApiV1config.version + '/smartwatch/:date',
    Meteor.bindEnvironment(function (params, req, res, next) {
        console.log('x-user-id ', req.headers['x-user-id']);
        console.log('x-auth-token ', req.headers['x-auth-token']);

        var userSelector = {
            "_id": req.headers['x-user-id'],
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

        if (req.method == "GET") {
            console.log("download");

            var file = SmartWatchFiles.findOne({
                "metadata.date": params.date,
                "metadata.owner": req.headers['x-user-id']
            });
            console.log(file);
            if (file == null) {
                console.log('No file found!');
                res.writeHead(204, {Connection: 'close'});
                res.end("No Content found");
                return;
            }

            var fileStream = SmartWatchFiles.findOneStream({
                "metadata.date": params.date,
                "metadata.owner": req.headers['x-user-id']
            });

            res.writeHead(200, {
                'Content-Type': 'text/csv',
                'Content-Disposition': 'attachment; filename=file.csv'
            });

            fileStream.pipe(res);

            fileStream.on('error', function (err) {
                console.log('err:' + err);
            });

            fileStream.on('end', function () {
                res.end();
            });
        }
    })
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
                "/smartwatch": {
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
                "/smartwatch/{date}": {
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
                            "name": "date",
                            "in": "path",
                            "description": "Date of the file",
                            "type": "string",
                            "required": true
                        }
                    ],
                    "get": {
                        "produces": [
                            "text/csv"
                        ],
                        "responses": {
                            "200": {
                                "description": "File for specified date.",
                                "schema": {
                                    "type": "file"
                                }
                            }
                        }
                    }
                },
                "/smartwatchview": {
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
                            "name": "date",
                            "in": "formData",
                            "description": "Date of the file",
                            "type": "string",
                            "format": "date-time",
                            "required": true
                        },
                        {
                            "name": "data",
                            "in": "formData",
                            "description": "View data",
                            "type": "string",
                            "required": true
                        },
                    ],
                    "post": {
                        "responses": {
                            "200": {
                                "description": "Successfully uploaded view data", //TODO check if full data exist for this view data
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
                "/registrations/metadata": {
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
                                "description": "Response contains module annd field namess for registrations owned by user."
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
