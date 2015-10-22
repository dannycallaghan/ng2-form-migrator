import {Injectable} from 'angular2/angular2';

@Injectable()
export class ConversionService {
	
	public getConvertedData (data): Promise<data> {
		
		/*
		return Promise.resolve(
			this.stripSlashes(data).then(
				this.convertToJson(data);
			)	
		);
		*/
		
		/*
		return Promise.resolve(() => {
			return this.stripSlashes(data);
		})
		*/
		
	
		return this.stripSlashes(data).then(data => {
			return this.convertToJson(data).then(data => {
				return Promise.resolve(data);
			});
		});
		
		//console.log(this.stripSlashes);
		
		
		//return Promise.resolve(this.stripSlashes(data));
	};
	
	private convertToJson(data): Promise<data> {
		//let result: Object = JSON.parse(data);
		let result: string = data;
		return Promise.resolve(result);
	}
	
	private stripSlashes (data): Promise<data> {
		let reg = new RegExp('\\\\"','g');
		let result = data.replace(reg,'HELLO');
		console.warn(result);
		return Promise.resolve(result);
	}
	
}