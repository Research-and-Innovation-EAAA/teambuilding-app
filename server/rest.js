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

function myFlat(input){
    var output = {};
    _.each(input, function(value, key, list){
        if (_.isArray(value)){
            output[key] = value.toString();
        }
        else {
            output[key] = value;
        }
    });

    output = Flat(output);

    return output;
}

// Maps to: /api/registrations/:event
ApiV1.addRoute('registrations/:event', {authRequired: true}, {
    get: function () {
        var admin = UserInfo.findOne({"userId": this.userId});
        if (!admin || !admin.admin) {
            return "Not an admin";
        }

        var event = Events.findOne({"password": this.urlParams.event});
        if (!event) {
            return "Event not found";
        }

        var regs = [];
        CustomModules.find({eventId: event._id}, {sort: {number: 1}}).forEach(function (mod) {
            Registrations.find({moduleId: mod._id}).forEach(function (reg) {
                reg = _.omit(reg, '_id', 'moduleId');

                var user = Meteor.users.findOne({"_id": reg.createdBy});

                if (user !== undefined){
                    reg.createdBy = user.emails[0].address;
                }

                regs.push(myFlat(reg));
            });
        });

        return regs;
    }
});

// Maps to: /api/registrations/:event/metadata
ApiV1.addRoute('registrations/:event/metadata', {authRequired: true}, {
    get: function () {
        var admin = UserInfo.findOne({"userId": this.userId});
        if (!admin || !admin.admin) {
            return "Not an admin";
        }

        var event = Events.findOne({"password": this.urlParams.event});
        if (!event) {
            return "Event not found";
        }

        var attributes = new Array();
        attributes.push("createdAt");
        attributes.push("createdBy");

        CustomModules.find({eventId: event._id}).forEach(function (doc) {

            var steps = doc.wizard.steps;

            for (var step in steps) {
                // one question steps
                var name = steps[step].stepTemplate.config.propertyName;
                if (!!name) {
                    if (!attributes[name]) {
                        attributes.push(name);
                    }
                    continue;
                }
                // more question steps
                else {
                    var flatdoc = _.flatten(steps[step].stepTemplate.config.questions);

                    for (var key in flatdoc) {
                        var name = flatdoc[key].propertyName;
                        if (!!name) {
                            if (!attributes[name]) {
                                attributes.push(name);
                            }
                        }
                    }
                }
            }
        });

        return attributes;
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
                "title": "Teambuilidng API",
                "description": "This API gives access to retrieve data registrations from the Teambuilding database",
                "termsOfService": "",
                "contact": {
                    "name": "Jakub Černík"
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
                            "description": "Email used to access Teambuilding App",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "password",
                            "in": "formData",
                            "description": "Password used to access Teambuilding App",
                            "type": "string",
                            "required": true
                        }
                    ],
                    "post": {
                        "responses": {
                            "200": {
                                "description": "Login using email and password succeeded and response contains authentication token and user id."
                            }
                        }
                    }
                },
                "/logout": {
                    "parameters": [
                        {
                            "name": "X-Auth-Token",
                            "in": "header",
                            "description": "Token used to access Teambuilding App",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "X-User-id",
                            "in": "header",
                            "description": "User identifier to access Teambuilding App",
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
                            "description": "Token used to access Teambuilding App",
                            "type": "string",
                            "required": true
                        },
                        {
                            "name": "X-User-id",
                            "in": "header",
                            "description": "User identifier to access Teambuilding App",
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
                                "description": "Response contains all registrations for selected event."
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
                                "description": "Response contains field namess for selected event."
                            }
                        }
                    }
                }
            }
        };
    }
});
