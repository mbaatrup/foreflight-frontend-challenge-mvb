import { Component, HostBinding, HostListener, inject, input, output, signal } from "@angular/core";
import { MatIconModule } from '@angular/material/icon';

import { Aircraft } from "../../models/aircraft";
import { NgClass } from "@angular/common";
import { Router } from "@angular/router";

@Component({
    selector: 'app-aircraft',
    templateUrl: './aircraft.component.html',
    styleUrl: './aircraft.component.scss',
    imports: [MatIconModule, NgClass]
})
export class AircraftComponent {
    private readonly router = inject(Router);
    readonly value = input.required<Aircraft>();
    readonly isOpen = input.required<boolean>();
    readonly favorite = input<boolean>(false);
    readonly clicked = output<string>();
    readonly removed = output<string>();
    readonly isFavorite = signal<boolean>(false);
    readonly isDeleting = signal<boolean>(false);

    @HostBinding('class.open')
    get open() {
        return this.isOpen();
    }

    @HostBinding('class.deleting')
    get deleting() {
        return this.isDeleting();
    }

    @HostListener('click')
    onClick() {
        this.clicked.emit(this.value().id);
    }

    onRemove(event: Event): void {
        event.stopPropagation();
        this.isDeleting.set(true);
        this.removed.emit(this.value().id);
    }

    onEdit(event: Event): void {
        event.stopPropagation();
        this.router.navigate(['/create'], { state: { aircraft: this.value(), update: true } })
    }

    onFavorite(event: Event): void {
        event.stopPropagation();

        // Mock
        this.isFavorite.set(!this.isFavorite());
    }
}
