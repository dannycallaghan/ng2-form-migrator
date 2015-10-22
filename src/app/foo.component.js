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
var FooComponent = (function () {
    function FooComponent() {
    }
    FooComponent = __decorate([
        angular2_1.Component({
            selector: 'foo-com',
            template: "\n\t\t\t\t<svg class=\"spinner\" width=\"65px\" height=\"65px\" viewBox=\"0 0 66 66\" xmlns=\"http://www.w3.org/2000/svg\">\n\t\t\t\t\t<circle class=\"circle\" fill=\"none\" stroke-width=\"6\" stroke-linecap=\"round\" cx=\"33\" cy=\"33\" r=\"30\"></circle>\n\t\t\t\t</svg>\n\t\t\t\t",
            styles: ["\n\t\t\t@import url(http://fonts.googleapis.com/css?family=RobotoDraft:500);\n\t\t\t.spinner {\n\t\t\t\tfont-family: 'RobotoDraft', sans-serif;\n\t\t\t\tpadding: 20px;\n\t\t\t\t\n\t\t\t\t-webkit-animation: rotation 1.4s linear infinite;\n\t\t\t\tanimation: rotation 1.4s linear infinite;\n\t\t\t\tstroke: #e51c23;\n\t\t\t}\n\t\t\t\n\t\t\t@-webkit-keyframes rotation {\n\t\t\t\t0% {\n\t\t\t\t\t-webkit-transform: rotate(0deg);\n\t\t\t\t\ttransform: rotate(0deg);\n\t\t\t\t}\n\t\t\t\n\t\t\t\t100% {\n\t\t\t\t\t-webkit-transform: rotate(270deg);\n\t\t\t\t\ttransform: rotate(270deg);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t@keyframes rotation {\n\t\t\t\t0% {\n\t\t\t\t\t-webkit-transform: rotate(0deg);\n\t\t\t\t\ttransform: rotate(0deg);\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t100% {\n\t\t\t\t\t-webkit-transform: rotate(270deg);\n\t\t\t\t\ttransform: rotate(270deg);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t.circle {\n\t\t\t\tstroke-dasharray: 187;\n\t\t\t\tstroke-dashoffset: 0;\n\t\t\t\t-webkit-transform-origin: center;\n\t\t\t\t-ms-transform-origin: center;\n\t\t\t\ttransform-origin: center;\n\t\t\t\t-webkit-animation: turn 1.4s ease-in-out infinite;\n\t\t\t\tanimation: turn 1.4s ease-in-out infinite;\n\t\t\t}\n\t\t\t\n\t\t\t@-webkit-keyframes turn {\n\t\t\t\t0% {\n\t\t\t\t\tstroke-dashoffset: 187;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t50% {\n\t\t\t\t\tstroke-dashoffset: 46.75;\n\t\t\t\t\t-webkit-transform: rotate(135deg);\n\t\t\t\t\ttransform: rotate(135deg);\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t100% {\n\t\t\t\t\tstroke-dashoffset: 187;\n\t\t\t\t\t-webkit-transform: rotate(450deg);\n\t\t\t\t\ttransform: rotate(450deg);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\t@keyframes turn {\n\t\t\t\t0% {\n\t\t\t\t\tstroke-dashoffset: 187;\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t50% {\n\t\t\t\t\tstroke-dashoffset: 46.75;\n\t\t\t\t\t-webkit-transform: rotate(135deg);\n\t\t\t\t\ttransform: rotate(135deg);\n\t\t\t\t}\n\t\t\t\t\n\t\t\t\t100% {\n\t\t\t\t\tstroke-dashoffset: 187;\n\t\t\t\t\t-webkit-transform: rotate(450deg);\n\t\t\t\t\ttransform: rotate(450deg);\n\t\t\t\t}\n\t\t\t}\n\t\t\t\n\t\t\tsvg:nth-child(1){stroke:#e51c23;}\t\n\t\t\t"]
        }), 
        __metadata('design:paramtypes', [])
    ], FooComponent);
    return FooComponent;
})();
exports.FooComponent = FooComponent;
;
//# sourceMappingURL=foo.component.js.map