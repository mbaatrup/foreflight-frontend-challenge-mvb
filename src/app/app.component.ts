import { Component, inject, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { HeaderService } from './services/header.service';

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, HeaderComponent],
    templateUrl: './app.component.html',
    styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
    private readonly headerService = inject(HeaderService);
    private readonly router = inject(Router);

    ngOnInit(): void {
        this.router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.headerService.reset();
            }
        });
    }
}
