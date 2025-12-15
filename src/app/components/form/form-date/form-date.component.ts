import { Component } from "@angular/core";
import { FormElementBaseDirective } from "../form-element-base.directive";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-form-date',
    templateUrl: './form-date.component.html',
    styleUrl: './form-date.component.scss',
    imports: [ReactiveFormsModule]
})
export class FormDateComponent extends FormElementBaseDirective { }