// Global API configuration
var Api = new Restivus({
    useDefaultAuth: true,
    prettyJson: true,
    enableCors: true
});

// Maps to: /api/Registration
Api.addRoute('registrations', {authRequired: true}, {
    get: function () {
        var regs = [];
        Registrations.find({createdBy: this.userId}).forEach(function (reg) {
            regs.push(reg);
        });
        return regs;
    }
});

// Maps to: /api/Registration/:id
Api.addRoute('registrations/:id', {authRequired: true}, {
    get: function () {
        return Registrations.findOne({_id: this.urlParams.id, createdBy: this.userId});
    }
});
