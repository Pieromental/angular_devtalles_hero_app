import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: ``,
})
export class LoginPageComponent {
  constructor(private authService: AuthService, private router: Router) {}
  onLogin(): void {
    this.authService.login('fernando', 'piero').subscribe((user) => {
      this.router.navigateByUrl('/heroes');
    });
  }
}
