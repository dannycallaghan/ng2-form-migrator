import {Component} from 'angular2/angular2';

@Component({
	selector: 'loader',
	template: '<div class="load"><img src="images/load.gif" /></div>',
	styles: [`
		div.load img {
			display: block;
			margin: 10px auto;
		}
	`]
})
export class LoaderComponent {}