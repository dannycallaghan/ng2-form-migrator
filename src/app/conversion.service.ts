import {Injectable} from 'angular2/angular2';

@Injectable()
export class ConversionService {

	private template:Object;
	private auxData:Object;
	
	public getConvertedData (data): Promise<data> {
		
		return this.stripSlashes(data).then(data => {
			return this.convertToJson(data).then(data => {
				return this.setTemplate(data).then(data => {
					return this.changeQuotes(data).then(data => {
						return this.convertToJson(data).then(data => {
							//return this.sortFields(data).then(data => {
								return this.convertToFormly(data).then(data => {
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

	private defaultType (obj) {
		// TODO - Check if setting certain properties to a falsey value
    	// is OK or should the properties not exist?

    	let newObj:Object = {};

    	newObj.type = obj.type || 'input'
    	newObj.data = {
    		format: 'element'
    	};
    	newObj.templateOptions = {
    		label: obj.label || '',
    		options: obj.options || [],
    		required: obj.required || false,
    		valueProp: 'name'
    	}
    	newObj.key = obj.guid;
    	newObj.defaultValue = obj.value || ''; // TODO - Check
    	newObj.className = 'formly-builder-element col-xs-12 col-sm-12' // TODO
  		
  		return newObj;
    }

    private selectType (obj) {
    	// TODO - Check if setting certain properties to a falsey value
    	// is OK or should the properties not exist?

    	let newObj:Object = {};

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
    	}
    	newObj.key = obj.guid;
    	newObj.defaultValue = obj.value || ''; // TODO - Check
    	newObj.className = 'formly-builder-element col-xs-12 col-sm-12' // TODO

    	obj.options.forEach((item) => {
    		let option:Object = {
    			name: item.option 
    		};
    		newObj.templateOptions.options.push(option);
    	});
  		
  		return newObj;	
    }

    private radioType (obj) {
		// TODO - Check if setting certain properties to a falsey value
    	// is OK or should the properties not exist?

    	let newObj:Object = {};

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
    	}
    	newObj.key = obj.guid;
    	newObj.defaultValue = obj.value || ''; // TODO - Check
    	newObj.className = 'formly-builder-element col-xs-12 col-sm-12' // TODO

    	obj.options.forEach((item) => {
    		let option:Object = {
    			name: item.option,
    			value: item.option.toString() 
    		};
    		newObj.templateOptions.options.push(option);
    	});
  		
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
				// TODO
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

	private convertToFormly (data): Promise<data> {
		let newFields:Array = [];
		let newFieldsWrapper:Array = [{
			fieldGroup: []
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
		data.fields.sort((a, b) => {
			if (a.row < b.row) return -1;
			if (a.row > b.row) return 1;
			return 0;
		});
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
	
}