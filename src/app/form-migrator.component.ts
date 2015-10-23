import {Component, FORM_DIRECTIVES, CORE_DIRECTIVES, JsonPipe} from 'angular2/angular2';
import {ConversionService} from './conversion.service';
import {LoaderComponent} from './loader.component';
import {SortService} from './sort.service';

@Component({
	selector:	'form-migrator',
	templateUrl: 'app/form-migrator.component.html',
	styles:	[`
				textarea { height: 400px; }
			`],	
	directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, LoaderComponent],
	providers: [ConversionService, SortService],
	pipes: [JsonPipe]
})
export class FormMigratorComponent {
	public form: Object;
	public converting: boolean;
	public error: boolean;
	
	public convert () {
		this.error = false;
		if (this.form.oldData && this.form.oldData.length) {
			this.converting = true;
			this.conversionService
				.getConvertedData(this.form.oldData)
				.then(this.conversionComplete.bind(this), this.conversionError.bind(this));	
		}
	};
	
	private conversionComplete (value) {
		let newData:string = typeof value === 'string' ? value : JSON.stringify(value);
		// Look, this was a ball ache to do - at least make it look as though it was!
		window.setTimeout(() => {
			this.converting = false;
			this.form.newData = newData;
			this.form.oldData = '';
		}, 1500);
	}
	
	private conversionError () {
		this.error = true;
		this.converting = false;	
	}
	
	constructor (private conversionService: ConversionService) {
		this.converting = false;
		this.error = false;
		this.form = {
			oldData: '',
			newData: ''
		};	
	}
};