import { Component, inject, OnInit } from "@angular/core";
import { MatIconModule } from "@angular/material/icon";

import { HeaderService } from "../../services/header.service";
import { RouterLink } from "@angular/router";

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
    imports: [MatIconModule, RouterLink]
})
export class HeaderComponent implements OnInit {
    private readonly headerService = inject(HeaderService);
    icon = '';
    title = '';
    link = '';
    canGoBack = true;

    ngOnInit(): void {
        this.headerService.icon$.subscribe(x => this.icon = x);
        this.headerService.title$.subscribe(x => this.title = x);
        this.headerService.buttonTarget$.subscribe(x => this.link = x);
        this.headerService.canGoBack$.subscribe(x => this.canGoBack = x);
    }

    goBack(): void {
        this.headerService.setGoBackClicked();
    }
}
