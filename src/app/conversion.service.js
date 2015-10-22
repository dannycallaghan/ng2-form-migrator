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
var ConversionService = (function () {
    function ConversionService() {
    }
    ConversionService.prototype.getConvertedData = function (data) {
        /*
        return Promise.resolve(
            this.stripSlashes(data).then(
                this.convertToJson(data);
            )
        );
        */
        var _this = this;
        /*
        return Promise.resolve(() => {
            return this.stripSlashes(data);
        })
        */
        return this.stripSlashes(data).then(function (data) {
            return _this.convertToJson(data).then(function (data) {
                return Promise.resolve(data);
            });
        });
        //console.log(this.stripSlashes);
        //return Promise.resolve(this.stripSlashes(data));
    };
    ;
    ConversionService.prototype.convertToJson = function (data) {
        //let result: Object = JSON.parse(data);
        var result = data;
        return Promise.resolve(result);
    };
    ConversionService.prototype.stripSlashes = function (data) {
        var reg = new RegExp('\\\\"', 'g');
        var result = data.replace(reg, 'HELLO');
        console.warn(result);
        return Promise.resolve(result);
    };
    ConversionService = __decorate([
        angular2_1.Injectable(), 
        __metadata('design:paramtypes', [])
    ], ConversionService);
    return ConversionService;
})();
exports.ConversionService = ConversionService;
//# sourceMappingURL=conversion.service.js.map