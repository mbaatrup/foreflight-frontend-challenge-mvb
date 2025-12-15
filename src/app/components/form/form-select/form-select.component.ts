import { Component, input, signal } from "@angular/core";
import { FormElementBaseDirective } from "../form-element-base.directive";
import { ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";

export interface SelectOption {
    value: string;
    name: string;
}

@Component({
    selector: 'app-form-select',
    templateUrl: './form-select.component.html',
    styleUrl: './form-select.component.scss',
    imports: [ReactiveFormsModule, MatIconModule]
})
export class FormSelectComponent extends FormElementBaseDirective {
    readonly options = input.required<SelectOption[]>();
    readonly placeHolder = input<string>('');
    readonly isOpen = signal<boolean>(false);
}
