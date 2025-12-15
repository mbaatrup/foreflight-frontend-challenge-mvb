import { Component, input } from "@angular/core";
import { FormElementBaseDirective } from "../form-element-base.directive";
import { MatIconModule } from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";

type ButtonDirection = 'left' | 'right';

@Component({
    selector: 'app-form-number',
    templateUrl: './form-number.component.html',
    styleUrl: './form-number.component.scss',
    imports: [ReactiveFormsModule, MatIconModule]
})
export class FormNumberComponent extends FormElementBaseDirective {
    readonly max = input<number>();
    readonly min = input<number>();
    readonly step = input.required<number>();
    readonly bigStep = input<number>();

    changeValueByAmount(amount: number | undefined, direction: ButtonDirection) {
        if (amount === undefined) {
            return;
        }

        if (direction === 'left') {
            amount *= -1;
        }

        const min = this.min();
        if (min !== undefined && (+this.control().value + amount) < min) {
            return;
        }

        const max = this.max();
        if (max !== undefined && (+this.control().value + amount) > max) {
            return;
        }

        this.control().setValue(+this.control().value + amount);
    }
}
