import { Component, HostBinding, input, output } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

type ButtonType = 'submit' | 'button';
type ButtonColor = 'primary' | 'secondary';

@Component({
    selector: 'app-form-button',
    templateUrl: './form-button.component.html',
    styleUrl: './form-button.component.scss',
    imports: [MatIconModule]
})
export class FormButtonComponent {
    readonly text = input<string>('Submit');
    readonly type = input<ButtonType>('button');
    readonly color = input<ButtonColor>('primary');
    readonly clicked = output<void>();

    @HostBinding('class.primary')
    get isPrimary() {
        return this.color() === 'primary';
    }

    @HostBinding('class.secondary')
    get isSecondary() {
        return this.color() === 'secondary';
    }

    onClick(): void {
        this.clicked.emit();
    }
}
