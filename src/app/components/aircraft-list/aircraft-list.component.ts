import { Component, inject, OnInit, signal } from '@angular/core';

import { Aircraft } from '../../models/aircraft';
import { AircraftService } from '../../services/aircraft.service';
import { AircraftComponent } from "../aircraft/aircraft.component";
import { HeaderService } from '../../services/header.service';
import { Router } from '@angular/router';
import { CreateAircraftDto } from '../../models/create-aircraft-dto';
import { UpdateAircraftDto } from '../../models/update-aircraft-dto';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-aircraft-list',
	imports: [AircraftComponent, MatIconModule],
	templateUrl: './aircraft-list.component.html',
	styleUrl: './aircraft-list.component.scss',
})
export class AircraftListComponent implements OnInit {
	private readonly aircraftService = inject(AircraftService);
	private readonly headerService = inject(HeaderService);
	private readonly router = inject(Router);
	private openId: string | undefined | null;
	readonly aircrafts = signal<Aircraft[]>([]);
	readonly loading = signal<boolean>(false);
	readonly error = signal<string | null>(null);

	constructor() {
		const nav = this.router.getCurrentNavigation();
		const update = nav?.extras.state?.['update'];
		const aircraft: Aircraft = nav?.extras.state?.['newAircraft'];

		if (aircraft == null) {
			return;
		}

		if (update) {
			this.updateAircraft(aircraft.id, aircraft);
		} else {
			this.createAircraft(aircraft);
		}
	}

	ngOnInit(): void {
		this.headerService.setTitle('My Aircrafts');
		this.headerService.setIcon('add');
		this.headerService.setButtonTarget('/create');
		this.headerService.setCanGoBack(false);
		this.loadAircrafts();
	}

	loadAircrafts(): void {
		this.loading.set(true);
		this.error.set(null);

		this.aircraftService.getAllAircraft().subscribe({
			next: (data) => {
				// Hack - for demonstration purposes only
				data.forEach((x: Aircraft) => x.nextMaintenanceDate = x.nextMaintenanceDate.split('T')[0]);

				this.aircrafts.set(data);
				this.loading.set(false);
			},
			error: (err) => {
				this.error.set(
					'Failed to load aircraft. Please make sure the backend is running.'
				);
				this.loading.set(false);
				console.error('Error loading aircraft:', err);
			},
		});
	}

	createAircraft(aircraft: CreateAircraftDto): void {
		this.aircraftService.createAircraft(aircraft).subscribe({
			next: (value: Aircraft) => {
				this.aircrafts.update(arr => [...arr, value]);
			},
			error: (err) => {
				console.error('Failed to add aircraft:', err);
			}
		})
	}

	updateAircraft(id: string, aircraft: UpdateAircraftDto) {
		this.aircraftService.updateAircraft(id, aircraft).subscribe({
			next: () => {
				this.aircrafts.update(list =>
					list.map(a =>
						a.id === id ? { ...a, ...aircraft } : a
					)
				);
			}, error: (err) => {
				console.error('Failed to update aircraft:', err);
			}
		})
	}

	removeAircraft(id: string): void {
		this.aircraftService.deleteAircraft(id).subscribe({
			next: () => {
				this.aircrafts.update(arr => arr.filter(aircraft => aircraft.id !== id));
			},
			error: (err) => {
				console.error('Failed to delete aircraft:', err);
			}
		});
	}

	isOpen(id: string): boolean {
		return id === this.openId;
	}

	setOpenId(id: string): void {
		if (this.openId === id) {
			this.openId = null;

			return;
		}

		this.openId = id;
	}
}
