import { Component } from "@angular/core";
import { FormElementBaseDirective } from "../form-element-base.directive";
import { ReactiveFormsModule } from "@angular/forms";

@Component({
    selector: 'app-form-textarea',
    templateUrl: './form-textarea.component.html',
    styleUrl: './form-textarea.component.scss',
    imports: [ReactiveFormsModule]
})
export class FormTextareaComponent extends FormElementBaseDirective { }