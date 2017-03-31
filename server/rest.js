var Busboy = Meteor.npmRequire('busboy');
var Unzip = Meteor.npmRequire('unzip2');
var Flat = Meteor.npmRequire('flat');

// Global API configuration
var ApiV1config = {
    useDefaultAuth: true,
    prettyJson: true,
    enableCors: true,
    apipath: "/api",
    version: "v1"
};
var ApiV1 = new Restivus(ApiV1config);

// Maps to: /api/registrations/:event
ApiV1.addRoute('registrations/:event', {authRequired: true}, {
    get: function () {
        var isAdmin = UserInfo.findOne({"userId":this.userId}).admin;
        if (!isAdmin){
            return "Not an admin";
        }

        var event = Events.findOne({"password": this.urlParams.event});
        if (!event){
            return "Event not found";
        }

        var regs = [];
        Registrations.find({eventId: event._id}).forEach(function (reg) {
            regs.push(Flat(reg));
        });
        return regs;
    }
});

// Maps to: /api/registrations/:event/metadata
ApiV1.addRoute('registrations/:event/metadata', {authRequired: true}, {
    get: function () {
        var isAdmin = UserInfo.findOne({"userId":this.userId}).admin;
        if (!isAdmin){
            return "Not an admin";
        }

        var event = Events.findOne({"password": this.urlParams.event});
        if (!event){
            return "Event not found";
        }

        // TODO get field names for a specific event, maybe use /db.collection.aggregate/

        var modules = {};
        Registrations.find({createdBy: this.userId}).forEach(function(doc){
            var flatdoc = Flat(doc);
            for (var key in flatdoc){
                var name = doc.moduleId;
                if (!modules[name]) {
                    modules[name] = [];
                }
                if(modules[name].indexOf(key) < 0){
                    modules[name].push(key);
                }
            }
        });
        return modules;
    }
});

// Maps to: /api/registrations/:id
ApiV1.addRoute('registrations/:id', {authRequired: true}, {
    get: function () {
        return Registrations.findOne({_id: this.urlParams.id, createdBy: this.userId});
    }
});


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
                            "name": "email",
                            "in": "formData",
                            "description": "Email used to access How-R-you",
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
                "/registrations/{event}": {
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
                            "name": "event",
                            "in": "path",
                            "description": "Event code",
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
                "/registrations/{event}/metadata": {
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
                            "name": "event",
                            "in": "path",
                            "description": "Event code",
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
