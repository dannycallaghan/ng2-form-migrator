import {Component, FORM_DIRECTIVES, CORE_DIRECTIVES} from 'angular2/angular2';
import {ConversionService} from './conversion.service';
import {LoaderComponent} from './loader.component';

@Component({
	selector:	'form-migrator',
	templateUrl: 'app/form-migrator.component.html',
	styles:	[`
				textarea { height: 400px; }
			`],	
	directives: [FORM_DIRECTIVES, CORE_DIRECTIVES, LoaderComponent],
	providers: [ConversionService]
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
		this.converting = false;
		this.form.newData = value;	
	}
	
	private conversionError () {
		this.error = true;
		this.converting = false;	
	}
	
	constructor (private conversionService: ConversionService) {
		this.converting = false;
		this.error = false;
		this.form = {
			//oldData: '',
			oldData: '{"Name": "Leisure - Inspection File","Template": "{\"name\":\"Leisure - Inspection File\",\"guid\":\"01946a17-e49a-4301-8024-c662c986184b\",\"details\":{\"submit\":\"Save\",\"cancel\":\"Cancel\",\"lock\":\"Submit\",\"success\":\"Thank you. Your form has been saved.\",\"error\":\"Sorry, we could not save your form.\",\"submitSuccess\":\"Thank you. Your form has been submitted.\",\"submitError\":\"Sorry, we could not submit your form.\",\"canLock\":false},\"fields\":[{\"guid\":\"ecc37cdd-d645-49ef-8784-2cbf6c95dcc1\",\"label\":\"Date\",\"type\":\"datepicker\",\"value\":\"\",\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":1,\"sizeY\":1,\"col\":0,\"row\":0},{\"guid\":\"eff0406e-9483-45fa-a7a4-cf4aea544551\",\"label\":\"Time\",\"type\":\"timepicker\",\"value\":\"\",\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":1,\"sizeY\":1,\"col\":1,\"row\":0},{\"guid\":\"bfcc6120-da47-4d86-8224-0a9e3e723de7\",\"label\":\"Assisting Inspector\",\"type\":\"text\",\"value\":\"\",\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":1,\"sizeY\":1,\"col\":1,\"row\":2},{\"guid\":\"4f3caab6-2385-4b88-9b88-6207d6c58935\",\"label\":\"Inspection Type\",\"type\":\"checkbox\",\"value\":\"Ad-hoc\",\"required\":false,\"disabled\":false,\"options\":[{\"guid\":\"44d86b51-efee-49ab-8b7c-6ac50f961e97\",\"label\":\"Ad-hoc\",\"type\":\"\",\"value\":true,\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":2,\"sizeY\":1,\"col\":0},{\"guid\":\"48f3ae52-10c8-4ef7-9504-8cc837cd2e71\",\"label\":\"Monthly\",\"type\":\"\",\"value\":false,\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":2,\"sizeY\":1,\"col\":0},{\"guid\":\"e66a427a-c20d-498a-8751-4875901d2ff0\",\"label\":\"Quarterly\",\"type\":\"\",\"value\":false,\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":2,\"sizeY\":1,\"col\":0}],\"sizeX\":1,\"sizeY\":1,\"col\":0,\"row\":2,\"displayLabel\":true,\"allValues\":\"Ad-hoc,Monthly,Quarterly\"},{\"guid\":\"6f9dbdce-7ac1-4f70-8a36-3afb3744e8a9\",\"label\":\"Break\",\"type\":\"hr\",\"value\":\"\",\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":2,\"sizeY\":1,\"col\":0,\"row\":3},{\"guid\":\"d5fde03a-a0d4-4b7b-9333-ee97d618ed8f\",\"label\":\"Description\",\"type\":\"textarea\",\"value\":\"\",\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":2,\"sizeY\":1,\"col\":0,\"row\":4},{\"guid\":\"702ef555-2003-45b3-abac-a63fd7eb3984\",\"label\":\"Break\",\"type\":\"hr\",\"value\":\"\",\"required\":false,\"disabled\":false,\"options\":[],\"sizeX\":2,\"sizeY\":1,\"col\":0,\"row\":1}]}","CreatedDate": "2015-07-20T14:44:36.4553644+00:00","CreatedBy": "00000000-0000-0000-0000-000000000000","AllowedTenantIds": []}',
			newData: ''
		};	
	}
};