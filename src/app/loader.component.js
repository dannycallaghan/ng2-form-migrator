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
var LoaderComponent = (function () {
    function LoaderComponent() {
    }
    LoaderComponent = __decorate([
        angular2_1.Component({
            selector: 'loader',
            template: '<div class="load"><img src="images/load.gif" /></div>',
            styles: ["\n\t\tdiv.load img {\n\t\t\tdisplay: block;\n\t\t\tmargin: 10px auto;\n\t\t}\n\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], LoaderComponent);
    return LoaderComponent;
})();
exports.LoaderComponent = LoaderComponent;
//# sourceMappingURL=loader.component.js.map