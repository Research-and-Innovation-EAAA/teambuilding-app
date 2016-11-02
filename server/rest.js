// Global API configuration
var ApiV1 = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    enableCors: true,
    version: "v1"
});

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

ApiV1.addRoute('swagger.json', {authRequired: false}, {
    get: function () {
        var pat = /[^https?://](.[^\/]*)/g
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
