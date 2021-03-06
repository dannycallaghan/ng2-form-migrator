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
                            return _this.sortFields(data).then(function (data) {
                                return _this.convertFieldsToFormly(data).then(function (data) {
                                    return _this.changeDetailsToSettings(data).then(function (data) {
                                        return _this.convertToString(data).then(function (data) {
                                            return _this.editAuxData().then(function () {
                                                return _this.returnResult().then(function (data) {
                                                    return Promise.resolve(data);
                                                });
                                            });
                                        });
                                    });
                                });
                            });
                        });
                    });
                });
            });
        });
    };
    ;
    ConversionService.prototype.returnResult = function () {
        var result = {};
        result = this.auxData;
        result.Template = this.template;
        return Promise.resolve(result);
    };
    ConversionService.prototype.editAuxData = function () {
        var result = {};
        result = {
            Name: this.auxData.Name,
            CreatedDate: this.auxData.CreatedDate,
            CreatedBy: this.auxData.CreatedBy,
            AllowedTenantIds: this.auxData.AllowedTenantIds,
            IsActive: true,
            OldVersionIds: []
        };
        this.auxData = result;
        return Promise.resolve();
    };
    ConversionService.prototype.convertToString = function (data) {
        var newString;
        newString = JSON.stringify(data);
        this.template = newString;
        return Promise.resolve();
    };
    ConversionService.prototype.changeDetailsToSettings = function (data) {
        var settings = {};
        settings = {
            displaySteps: false,
            create: {
                save: data.details.lock,
                cancel: data.details.cancel,
                submit: data.details.submit,
                success: data.details.success,
                error: data.details.error,
                submitSuccess: data.details.submitSuccess,
                submitError: data.details.submitError
            },
            manage: {
                save: 'Save',
                cancel: 'Cancel',
                submit: 'Submit',
                success: 'Thank you. Your form has been saved.',
                error: 'Sorry, we could not save your form.',
                submitSuccess: 'Thank you. Your form has been submitted.',
                submitError: 'Sorry, we could not submit your form.'
            },
            canSubmit: data.details.canLock,
            sameMessages: true,
            sameButtons: true
        };
        data.settings = settings;
        delete data.details;
        return Promise.resolve(data);
    };
    ConversionService.prototype.getTypeTemplate = function (obj) {
        var newObj = {
            data: {
                format: 'element'
            },
            key: obj.guid,
            className: 'formly-builder-element col-xs-12 col-sm-12',
            templateOptions: {
                label: obj.label || '',
                required: obj.required || false,
                valueProp: 'name',
                placeholder: obj.placeholder || '',
                options: []
            }
        };
        if (obj.sizeX === 1) {
            if (obj.col === 0) {
                newObj.data.align = 'left';
                newObj.className = 'formly-builder-element col-xs-6 clear';
            }
            else if (obj.col === 1) {
                newObj.data.align = 'right';
                newObj.className = 'formly-builder-element col-xs-6 pull-right';
            }
        }
        return newObj;
    };
    ConversionService.prototype.defaultType = function (obj) {
        var newObj = this.getTypeTemplate(obj);
        newObj.type = obj.type === 'text' ? 'input' : obj.type;
        if (obj.type === 'datepicker') {
            newObj.defaultValue = obj.value || null;
        }
        else if (obj.type === 'timepicker') {
            if (obj.value) {
                newObj.defaultValue = obj.value;
            }
        }
        else if (obj.type !== 'hr') {
            newObj.defaultValue = obj.value || '';
        }
        return newObj;
    };
    ConversionService.prototype.selectType = function (obj) {
        var newObj = this.getTypeTemplate(obj);
        newObj.type = 'tlrSelect';
        newObj.data.prompt = obj.prompt;
        if (obj.value && obj.value !== 'null') {
            newObj.defaultValue = obj.options[parseInt(obj.value, 10) - 1].option;
        }
        else {
            newObj.defaultValue = null;
        }
        obj.options.forEach(function (item) {
            var option = {
                name: item.option
            };
            newObj.templateOptions.options.push(option);
        });
        return newObj;
    };
    ConversionService.prototype.radioType = function (obj) {
        var newObj = this.getTypeTemplate(obj);
        newObj.type = 'radio';
        newObj.defaultValue = obj.value.toString();
        obj.options.forEach(function (item, index) {
            var option = {
                name: item.option,
                value: (index + 1).toString()
            };
            newObj.templateOptions.options.push(option);
        });
        return newObj;
    };
    ConversionService.prototype.checkboxType = function (obj) {
        var newObj = this.getTypeTemplate(obj);
        newObj.type = obj.displayLabel && obj.displayLabel === true ? 'tlrMultiCheckbox' : 'checkbox';
        if (newObj.type === 'tlrMultiCheckbox') {
            newObj.defaultValue = [];
            obj.options.forEach(function (item) {
                var option = {
                    name: item.label,
                };
                var values = [];
                newObj.templateOptions.options.push(option);
                if (item.value && item.value === true) {
                    newObj.defaultValue.push(item.label);
                }
            });
        }
        else {
            if (obj.options[0].value) {
                newObj.defaultValue = obj.options[0].value;
            }
        }
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
                newObj = this.checkboxType(obj);
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
    ConversionService.prototype.convertFieldsToFormly = function (data) {
        var _this = this;
        var newFields = [];
        var newFieldsWrapper = [{
                fieldGroup: [],
                data: {
                    format: 'step',
                    label: 'Step'
                },
                className: 'formly-builder-step row'
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
        data.fields.sort(this.fieldSorter(['row', 'col']));
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
        var final = result.replace(/([A-z])(")([A-z])/g, '$1\'$3');
        return Promise.resolve(final);
    };
    ConversionService.prototype.stripSlashes = function (data) {
        var reg = new RegExp('\\\\"', 'g');
        var result = data.replace(reg, '\'');
        return Promise.resolve(result);
    };
    /*
    From chriskelly's answer here:
    http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
    */
    ConversionService.prototype.fieldSorter = function (fields) {
        return function (a, b) {
            return fields
                .map(function (o) {
                var dir = 1;
                if (o[0] === '-') {
                    dir = -1;
                    o = o.substring(1);
                }
                if (a[o] > b[o])
                    return dir;
                if (a[o] < b[o])
                    return -(dir);
                return 0;
            })
                .reduce(function firstNonZeroValue(p, n) {
                return p ? p : n;
            }, 0);
        };
    };
    return ConversionService;
})();
exports.ConversionService = ConversionService;
//# sourceMappingURL=conversion.service.js.map