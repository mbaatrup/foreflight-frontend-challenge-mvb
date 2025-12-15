import { Component, inject, OnInit, signal } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from "@angular/router";
import { MatIconModule } from "@angular/material/icon";

import { HeaderService } from "../../services/header.service";
import { AircraftService } from "../../services/aircraft.service";
import { Aircraft } from "../../models/aircraft";
import { FormInputComponent } from "../form/form-input/form-input.component";
import { FormSelectComponent, SelectOption } from "../form/form-select/form-select.component";
import { FormDateComponent } from "../form/form-date/form-date.component";
import { FormNumberComponent } from "../form/form-number/form-number.component";
import { FormCheckboxComponent } from "../form/form-checkbox/form-checkbox.component";
import { FormTextareaComponent } from "../form/form-textarea/form-textarea.component";
import { FormButtonComponent } from "../form/form-button/form-button.component";

@Component({
    selector: 'app-aircraft-form-create',
    templateUrl: './aircraft-form-create.component.html',
    styleUrl: './aircraft-form-create.component.scss',
    imports: [
        ReactiveFormsModule,
        MatIconModule,
        FormInputComponent,
        FormSelectComponent,
        FormDateComponent,
        FormNumberComponent,
        FormCheckboxComponent,
        FormTextareaComponent,
        FormButtonComponent
    ]
})
export class AircraftFormCreateComponent implements OnInit {
    private readonly headerService = inject(HeaderService)
    private readonly router = inject(Router);
    private readonly aircraftService = inject(AircraftService);
    private readonly previousUrl: string | undefined;
    private readonly update = false;
    private id = '';
    readonly aircraftTypes = signal<SelectOption[]>([]);
    readonly maxInteriorCondition = 100;
    readonly maxSeats = 10;

    form = new FormGroup({
        tailNumber: new FormControl<string>('', Validators.required),
        type: new FormControl<string>('', Validators.required),
        seats: new FormControl<number>(1),
        petFriendly: new FormControl<boolean>(false),
        interiorCondition: new FormControl<number>(0),
        nextMaintenance: new FormControl<string>('', Validators.required),
        serialNumber: new FormControl<string | null>(null),
        comments: new FormControl<string | null>(null),
    });

    get tailNumber(): FormControl {
        return this.form.get('tailNumber') as FormControl;
    }
    get type(): FormControl {
        return this.form.get('type') as FormControl;
    }
    get seats(): FormControl {
        return this.form.get('seats') as FormControl;
    }
    get petFriendly(): FormControl {
        return this.form.get('petFriendly') as FormControl;
    }
    get interiorCondition(): FormControl {
        return this.form.get('interiorCondition') as FormControl;
    }
    get nextMaintenance(): FormControl {
        return this.form.get('nextMaintenance') as FormControl;
    }
    get serialNumber(): FormControl {
        return this.form.get('serialNumber') as FormControl;
    }
    get comments(): FormControl {
        return this.form.get('comments') as FormControl;
    }

    constructor() {
        const nav = this.router.getCurrentNavigation();
        const config = nav?.extras.state?.['aircraft'];
        this.update = nav?.extras.state?.['update'];
        this.previousUrl = nav?.previousNavigation?.finalUrl?.toString();

        if (config) {
            this.prepopulateForm(config);
        }
    }

    ngOnInit(): void {
        this.headerService.setTitle('Create Aircraft');
        this.headerService.goBackClicked$.subscribe(() => this.onCancel());
        this.loadAircraftTypes();
    }

    loadAircraftTypes(): void {
        this.aircraftService.getAircraftTypes().subscribe({
            next: (data) => {
                this.aircraftTypes.set(data.map(x => { return { value: x.name, name: x.name } }));
            },
            error: (err) => {
                console.error('Failed to load aircraft types.', err);
            },
        });
    }

    private prepopulateForm(config: Aircraft): void {
        this.id = config.id;
        this.tailNumber.setValue(config.tailNumber);
        this.type.setValue(config.aircraftType);
        this.seats.setValue(config.numberOfSeats);
        this.petFriendly.setValue(config.isSuitedForPets);
        this.interiorCondition.setValue(Math.round(config.interiorCondition * this.maxInteriorCondition));
        this.nextMaintenance.setValue(config.nextMaintenanceDate);
        this.serialNumber.setValue(config.serialNumber);
        this.comments.setValue(config.comments);
    }

    onSubmit(): void {
        this.form.markAllAsTouched();

        if (!this.form.valid) {
            return;
        }

        const newAircraft: Aircraft = {
            id: this.id,
            aircraftType: this.type.value,
            tailNumber: this.tailNumber.value,
            isSuitedForPets: this.petFriendly.value,
            nextMaintenanceDate: this.nextMaintenance.value,
            numberOfSeats: this.seats.value,
            interiorCondition: this.interiorCondition.value / this.maxInteriorCondition,
            serialNumber: this.serialNumber.value,
            comments: this.comments.value,
        }

        const state = { newAircraft: newAircraft, update: this.update };
        this.router.navigate([this.previousUrl ?? '/'], { state: state })
    }

    onCancel(): void {
        this.router.navigate([this.previousUrl ?? '/']);
    }
}
