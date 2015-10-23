var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var angular2_1 = require('angular2/angular2');
var conversion_service_1 = require('./conversion.service');
var loader_component_1 = require('./loader.component');
var FormMigratorComponent = (function () {
    function FormMigratorComponent(conversionService) {
        this.conversionService = conversionService;
        this.converting = false;
        this.error = false;
        this.form = {
            oldData: '',
            newData: ''
        };
    }
    FormMigratorComponent.prototype.convert = function () {
        this.error = false;
        if (this.form.oldData && this.form.oldData.length) {
            this.converting = true;
            this.conversionService
                .getConvertedData(this.form.oldData)
                .then(this.conversionComplete.bind(this), this.conversionError.bind(this));
        }
    };
    ;
    FormMigratorComponent.prototype.conversionComplete = function (value) {
        var _this = this;
        var newData = typeof value === 'string' ? value : JSON.stringify(value);
        // Look, this was a ball ache to do - at least make it look as though it was!
        window.setTimeout(function () {
            _this.converting = false;
            _this.form.newData = newData;
            _this.form.oldData = '';
        }, 2000);
    };
    FormMigratorComponent.prototype.conversionError = function () {
        this.error = true;
        this.converting = false;
    };
    FormMigratorComponent = __decorate([
        angular2_1.Component({
            selector: 'form-migrator',
            templateUrl: 'app/form-migrator.component.html',
            styles: ["\n\t\t\t\ttextarea { height: 400px; }\n\t\t\t"],
            directives: [angular2_1.FORM_DIRECTIVES, angular2_1.CORE_DIRECTIVES, loader_component_1.LoaderComponent],
            providers: [conversion_service_1.ConversionService],
            pipes: [angular2_1.JsonPipe]
        }), 
        __metadata('design:paramtypes', [conversion_service_1.ConversionService])
    ], FormMigratorComponent);
    return FormMigratorComponent;
})();
exports.FormMigratorComponent = FormMigratorComponent;
;
//# sourceMappingURL=form-migrator.component.js.map