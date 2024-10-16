import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  hidePassword = true;
  isLoading = false;  // Nueva variable para controlar el estado del loader

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.isLoading = true;  // Activar el loader
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response) => {
          console.log('Inicio de sesión exitoso:', response);
          this.isLoading = false;  // Desactivar el loader cuando la llamada sea exitosa
          this.router.navigate(['/home']);
        },
        error: (error) => {
          console.error('Error en inicio de sesión:', error);
          this.isLoading = false;  // Desactivar el loader si hay error
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  redirectToGoogle(): void {
    window.location.href = 'https://makiboland.xyz/realms/laboratorio3/account/';  // Reemplaza con la URL de autenticación de Google
  }
}