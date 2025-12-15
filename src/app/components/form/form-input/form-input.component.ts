import { Component } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { FormElementBaseDirective } from "../form-element-base.directive";

@Component({
    selector: 'app-form-input',
    styleUrl: './form-input.component.scss',
    templateUrl: './form-input.component.html',
    imports: [ReactiveFormsModule]
})
export class FormInputComponent extends FormElementBaseDirective { }