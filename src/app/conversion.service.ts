import {Injectable, provide} from 'angular2/angular2';

export class ConversionService {

	private template:Object;
	private auxData:Object;
	
	public getConvertedData (data): Promise<data> {
		
		return this.stripSlashes(data).then(data => {
			return this.convertToJson(data).then(data => {
				return this.setTemplate(data).then(data => {
					return this.changeQuotes(data).then(data => {
						return this.convertToJson(data).then(data => {
							return this.sortFields(data).then(data => {
								return this.convertFieldsToFormly(data).then(data => {
									return this.changeDetailsToSettings(data).then(data => {
										return this.convertToString(data).then(data => {
											return this.editAuxData().then(() => {
												return this.returnResult().then((data) => {
													return Promise.resolve(data);
												});
											});
										})
									});
								});
							});
						});
					});
				});
			});
		});
		
	};
	
	private returnResult (): Promise<data> {
		let result:Object = {};
		
		result = this.auxData;
		result.Template = this.template;
		return Promise.resolve(result); 
	}
	
	private editAuxData (): Promise<data> {
		let result:Object = {};
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
	}
	
	private convertToString (data): Promise<data> {
		let newString:string;
		newString = JSON.stringify(data);
		this.template = newString;
		return Promise.resolve();
	}
	
	private changeDetailsToSettings (data): Promise<data> {
		let settings:Object = {};
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
	}
	
	private getTypeTemplate (obj) {
		let newObj:Object = {
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
			} else if (obj.col === 1) {
				newObj.data.align = 'right';
				newObj.className = 'formly-builder-element col-xs-6 pull-right';
			}
		}
		return newObj;
	}

	private defaultType (obj) {
		let newObj:Object = this.getTypeTemplate(obj);

		newObj.type = obj.type === 'text' ? 'input' : obj.type;
    	
    	if (obj.type === 'datepicker') {
			newObj.defaultValue = obj.value || null;	
		} else if (obj.type === 'timepicker'){
			if (obj.value) {
				newObj.defaultValue = obj.value;	
			}
		} else if (obj.type !== 'hr'){
			newObj.defaultValue = obj.value || '';
		}
		
  		return newObj;
    }

    private selectType (obj) {
    	let newObj:Object = this.getTypeTemplate(obj);

    	newObj.type = 'tlrSelect';
    	newObj.data.prompt = obj.prompt;
    	
		if (obj.value && obj.value !== 'null') {
			newObj.defaultValue = obj.options[parseInt(obj.value, 10) - 1].option;
		} else {
			newObj.defaultValue = null;
		}
		
		obj.options.forEach((item) => {
    		let option:Object = {
    			name: item.option 
    		};
    		newObj.templateOptions.options.push(option);
    	});
  		
  		return newObj;	
    }

    private radioType (obj) {
		let newObj:Object = this.getTypeTemplate(obj);

    	newObj.type = 'radio';
    	newObj.defaultValue = obj.value.toString();
    
    	obj.options.forEach((item, index) => {
    		let option:Object = {
    			name: item.option,
    			value: (index + 1).toString()
    		};
    		newObj.templateOptions.options.push(option);
    	});
  		
  		return newObj;	
    }
	
	private checkboxType (obj) {
		let newObj:Object = this.getTypeTemplate(obj);

    	newObj.type = obj.displayLabel && obj.displayLabel === true ? 'tlrMultiCheckbox' : 'checkbox';
		
		if (newObj.type === 'tlrMultiCheckbox') {
			newObj.defaultValue = [];
			obj.options.forEach((item) => {
				let option:Object = {
					name: item.label,
				};
				let values:Array = [];
				newObj.templateOptions.options.push(option);
				if (item.value && item.value === true) {
					newObj.defaultValue.push(item.label); 	
				}
			});
		} else {
			if (obj.options[0].value) {
				newObj.defaultValue = obj.options[0].value;
			}
		}
	
  		return newObj;	
    }
	

	private toFormlyType (obj) {
		let newObj:Object = {};
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
				// do nothing
		}
		return newObj;
	}

	private convertFieldsToFormly (data): Promise<data> {
		let newFields:Array = [];
		let newFieldsWrapper:Array = [{
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
		data.fields.forEach(item => {
			newFieldsWrapper[0].fieldGroup.push(this.toFormlyType(item));
		});
		data.fields = newFieldsWrapper;
		return Promise.resolve(data);
	}
	
	private sortFields (data): Promise<data> {
		if (!data.fields) {
			Promise.reject();	
		}
		data.fields.sort(this.fieldSorter(['row', 'col']));
		return Promise.resolve(data);
	}

	private setTemplate (data): Promise<data> {
		if (!data.Template) {
			return Promise.reject();
		}
		this.template = data.Template;
		delete data.Template;
		this.auxData = data;
		return Promise.resolve(this.template); 	
	}
	
	private convertToJson (data): Promise<data> {
		try {
			return Promise.resolve(JSON.parse(data));	
		} catch (e) {
			return Promise.reject(e);
		}
	}

	private changeQuotes (data): Promise<data> {
		let result:string = data.replace(/'/g, '"');
		return Promise.resolve(result);
	}
	
	private stripSlashes (data): Promise<data> {
		let reg:Object = new RegExp('\\\\"','g');
		let result:string = data.replace(reg,'\'');
		return Promise.resolve(result);
	}
	
	/*
	From chriskelly's answer here:
	http://stackoverflow.com/questions/6913512/how-to-sort-an-array-of-objects-by-multiple-fields
	*/
	private fieldSorter (fields) {
		return function (a, b) {
			return fields
				.map(function (o) {
					var dir = 1;
					if (o[0] === '-') {
					dir = -1;
					o=o.substring(1);
					}
					if (a[o] > b[o]) return dir;
					if (a[o] < b[o]) return -(dir);
					return 0;
				})
				.reduce(function firstNonZeroValue (p,n) {
					return p ? p : n;
				}, 0);
		};
	}
	
}