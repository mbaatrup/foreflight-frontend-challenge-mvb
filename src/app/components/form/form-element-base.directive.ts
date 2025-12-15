import { Directive, HostBinding, input } from "@angular/core";
import { FormControl } from "@angular/forms";

@Directive({})
export abstract class FormElementBaseDirective {
    control = input.required<FormControl>();
    readonly id = input<string>();

    @HostBinding('class.alert')
    get hasAlert() {
        return this.isInvalid();
    }

    isInvalid(): boolean {
        return this.control().invalid && this.control().touched;
    }
}
