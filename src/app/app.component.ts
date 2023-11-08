import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ubbnet-angular';

  constructor(private router: Router) {}

  isActive(route: string): boolean {
    return this.router.url === route;
  }
}
