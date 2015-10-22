import {Component} from 'angular2/angular2';

@Component({
	selector:	'foo-com',
	template:	`
				<svg class="spinner" width="65px" height="65px" viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
					<circle class="circle" fill="none" stroke-width="6" stroke-linecap="round" cx="33" cy="33" r="30"></circle>
				</svg>
				`,
	styles: [`
			@import url(http://fonts.googleapis.com/css?family=RobotoDraft:500);
			.spinner {
				font-family: 'RobotoDraft', sans-serif;
				padding: 20px;
				
				-webkit-animation: rotation 1.4s linear infinite;
				animation: rotation 1.4s linear infinite;
				stroke: #e51c23;
			}
			
			@-webkit-keyframes rotation {
				0% {
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
				}
			
				100% {
					-webkit-transform: rotate(270deg);
					transform: rotate(270deg);
				}
			}
			
			@keyframes rotation {
				0% {
					-webkit-transform: rotate(0deg);
					transform: rotate(0deg);
				}
				
				100% {
					-webkit-transform: rotate(270deg);
					transform: rotate(270deg);
				}
			}
			
			.circle {
				stroke-dasharray: 187;
				stroke-dashoffset: 0;
				-webkit-transform-origin: center;
				-ms-transform-origin: center;
				transform-origin: center;
				-webkit-animation: turn 1.4s ease-in-out infinite;
				animation: turn 1.4s ease-in-out infinite;
			}
			
			@-webkit-keyframes turn {
				0% {
					stroke-dashoffset: 187;
				}
				
				50% {
					stroke-dashoffset: 46.75;
					-webkit-transform: rotate(135deg);
					transform: rotate(135deg);
				}
				
				100% {
					stroke-dashoffset: 187;
					-webkit-transform: rotate(450deg);
					transform: rotate(450deg);
				}
			}
			
			@keyframes turn {
				0% {
					stroke-dashoffset: 187;
				}
				
				50% {
					stroke-dashoffset: 46.75;
					-webkit-transform: rotate(135deg);
					transform: rotate(135deg);
				}
				
				100% {
					stroke-dashoffset: 187;
					-webkit-transform: rotate(450deg);
					transform: rotate(450deg);
				}
			}
			
			svg:nth-child(1){stroke:#e51c23;}	
			`]
})
export class FooComponent {};