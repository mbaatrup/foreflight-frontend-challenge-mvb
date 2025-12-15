import { Component } from "@angular/core";
import { FormElementBaseDirective } from "../form-element-base.directive";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { NgClass } from "@angular/common";

@Component({
    selector: 'app-form-checkbox',
    templateUrl: './form-checkbox.component.html',
    styleUrl: './form-checkbox.component.scss',
    imports: [ReactiveFormsModule, MatIconModule, NgClass]
})
export class FormCheckboxComponent extends FormElementBaseDirective { }