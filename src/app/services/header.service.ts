import { Injectable } from "@angular/core";
import { BehaviorSubject, Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class HeaderService {
    private readonly title = new BehaviorSubject<string>('');
    readonly title$ = this.title.asObservable();

    private readonly icon = new BehaviorSubject<string>('');
    readonly icon$ = this.icon.asObservable();

    private readonly buttonTarget = new BehaviorSubject<string>('');
    readonly buttonTarget$ = this.buttonTarget.asObservable();

    private readonly canGoBack = new BehaviorSubject<boolean>(true);
    readonly canGoBack$ = this.canGoBack.asObservable();

    private readonly goBackClicked = new Subject<void>();
    readonly goBackClicked$ = this.goBackClicked.asObservable();

    setTitle(value: string): void {
        this.title.next(value);
    }

    setIcon(value: string): void {
        this.icon.next(value);
    }

    setButtonTarget(value: string): void {
        this.buttonTarget.next(value);
    }

    setCanGoBack(value: boolean): void {
        this.canGoBack.next(value);
    }

    setGoBackClicked(): void {
        this.goBackClicked.next();
    }

    reset() {
        this.title.next('');
        this.icon.next('');
        this.buttonTarget.next('');
        this.canGoBack.next(true);
    }
}
