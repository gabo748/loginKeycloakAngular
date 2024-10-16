import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;
  isLoading = false;  // Nueva variable para controlar el estado del loader

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit(): void {
    if (this.signUpForm.valid) {
      this.isLoading = true;  // Activar el loader
      const { email, password, firstName, lastName } = this.signUpForm.value;
      this.authService.signUp(email, password, firstName, lastName).subscribe({
        next: (response) => {
          console.log('Registro exitoso:', response);
          this.isLoading = false;  // Desactivar el loader
          this.router.navigate(['/login']);
        },
        error: (error) => {
          console.error('Error en el registro:', error);
          this.isLoading = false;  // Desactivar el loader si hay error
        }
      });
    }
  }

  redirectToGoogle(): void {
    window.location.href = 'https://makiboland.xyz/realms/laboratorio3/account/';
  }
}