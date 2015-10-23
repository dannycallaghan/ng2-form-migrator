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
        var _this = this;
        return this.stripSlashes(data).then(function (data) {
            return _this.convertToJson(data).then(function (data) {
                return _this.setTemplate(data).then(function (data) {
                    return _this.changeQuotes(data).then(function (data) {
                        return _this.convertToJson(data).then(function (data) {
                            //return this.sortFields(data).then(data => {
                            return _this.convertToFormly(data).then(function (data) {
                                console.info(typeof data);
                                return Promise.resolve(data);
                            });
                            //});
                        });
                    });
                });
            });
        });
    };
    ;
    ConversionService.prototype.defaultType = function (obj) {
        // TODO - Check if setting certain properties to a falsey value
        // is OK or should the properties not exist?
        var newObj = {};
        newObj.type = obj.type || 'input';
        newObj.data = {
            format: 'element'
        };
        newObj.templateOptions = {
            label: obj.label || '',
            options: obj.options || [],
            required: obj.required || false,
            valueProp: 'name'
        };
        newObj.key = obj.guid;
        newObj.defaultValue = obj.value || ''; // TODO - Check
        newObj.className = 'formly-builder-element col-xs-12 col-sm-12'; // TODO
        return newObj;
    };
    ConversionService.prototype.selectType = function (obj) {
        // TODO - Check if setting certain properties to a falsey value
        // is OK or should the properties not exist?
        var newObj = {};
        newObj.type = 'tlrSelect';
        newObj.data = {
            format: 'element',
            prompt: 'Select' // TODO - Check
        };
        newObj.templateOptions = {
            label: obj.label || '',
            required: obj.required || false,
            valueProp: 'name',
            options: []
        };
        newObj.key = obj.guid;
        newObj.defaultValue = obj.value || ''; // TODO - Check
        newObj.className = 'formly-builder-element col-xs-12 col-sm-12'; // TODO
        obj.options.forEach(function (item) {
            var option = {
                name: item.option
            };
            newObj.templateOptions.options.push(option);
        });
        return newObj;
    };
    ConversionService.prototype.radioType = function (obj) {
        // TODO - Check if setting certain properties to a falsey value
        // is OK or should the properties not exist?
        var newObj = {};
        newObj.type = 'tlrSelect';
        newObj.data = {
            format: 'element',
            prompt: 'Select' // TODO - Check
        };
        newObj.templateOptions = {
            label: obj.label || '',
            required: obj.required || false,
            valueProp: 'name',
            options: []
        };
        newObj.key = obj.guid;
        newObj.defaultValue = obj.value || ''; // TODO - Check
        newObj.className = 'formly-builder-element col-xs-12 col-sm-12'; // TODO
        obj.options.forEach(function (item) {
            var option = {
                name: item.option,
                value: item.option.toString()
            };
            newObj.templateOptions.options.push(option);
        });
        return newObj;
    };
    ConversionService.prototype.toFormlyType = function (obj) {
        var newObj = {};
        switch (obj.type) {
            case 'text':
                newObj = this.defaultType(obj);
                break;
            case 'datepicker':
                newObj = this.defaultType(obj);
                break;
            case 'timepicker':
                newObj = this.defaultType(obj);
                break;
            case 'hr':
                newObj = this.defaultType(obj);
                break;
            case 'textarea':
                newObj = this.defaultType(obj);
                break;
            case 'heading':
                newObj = this.defaultType(obj);
                break;
            case 'copy':
                newObj = this.defaultType(obj);
                break;
            case 'checkbox':
                // TODO
                break;
            case 'select':
                newObj = this.selectType(obj);
                break;
            case 'radio':
                newObj = this.radioType(obj);
                break;
            default:
        }
        return newObj;
    };
    ConversionService.prototype.convertToFormly = function (data) {
        var _this = this;
        var newFields = [];
        var newFieldsWrapper = [{
                fieldGroup: []
            }];
        if (!data.fields) {
            Promise.reject();
        }
        data.fields.forEach(function (item) {
            newFieldsWrapper[0].fieldGroup.push(_this.toFormlyType(item));
        });
        data.fields = newFieldsWrapper;
        return Promise.resolve(data);
    };
    ConversionService.prototype.sortFields = function (data) {
        if (!data.fields) {
            Promise.reject();
        }
        data.fields.sort(function (a, b) {
            if (a.row < b.row)
                return -1;
            if (a.row > b.row)
                return 1;
            return 0;
        });
        return Promise.resolve(data);
    };
    ConversionService.prototype.setTemplate = function (data) {
        if (!data.Template) {
            return Promise.reject();
        }
        this.template = data.Template;
        delete data.Template;
        this.auxData = data;
        return Promise.resolve(this.template);
    };
    ConversionService.prototype.convertToJson = function (data) {
        try {
            return Promise.resolve(JSON.parse(data));
        }
        catch (e) {
            return Promise.reject(e);
        }
    };
    ConversionService.prototype.changeQuotes = function (data) {
        var result = data.replace(/'/g, '"');
        return Promise.resolve(result);
    };
    ConversionService.prototype.stripSlashes = function (data) {
        var reg = new RegExp('\\\\"', 'g');
        var result = data.replace(reg, '\'');
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