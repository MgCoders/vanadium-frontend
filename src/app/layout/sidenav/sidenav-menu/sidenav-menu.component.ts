import { Component, Input } from '@angular/core';
import { AuthService } from '../../../_services/auth.service';

@Component({
  selector: 'my-app-sidenav-menu',
  styles: [],
  templateUrl: './sidenav-menu.component.html'
})

export class AppSidenavMenuComponent {

  constructor(private authService: AuthService) {
  }

  isAdmin() {
    return this.authService.isAuthenticatedAndAdmin();
  }
}
