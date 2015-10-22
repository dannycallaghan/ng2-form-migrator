# ng2-form-migrator

An internal tool for [tillr](http://tillr.io) to convert JSON from one format to another.

We had an internal Form Builder than generated a JSON object that was later read by custom Angular directives to render a form. I then decided to use [formly](http://angular-formly.com) instead. Obviously, the JSON needed to change, and this tool allows us to convert the old format to the formly-friendly one.

This is also my first attempt at building an 'app' using Angular 2 (and TypeScript).
