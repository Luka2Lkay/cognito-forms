import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {}

  emptyUsername?: string;
  invalidEmail?: string;
  show: boolean = false;
  invalidPassword?: string;
  noMatch?: string;

  ngOnInit(): void {}

  registerForm: FormGroup = this._fb.group({
    userName: "Luks",
    email: "luka.matshebelele@gmail.com",
    password: "Lukhanyo#5",
    confirmPassword: "Lukhanyo#5",
  });

  isEmailValid() {}

  validatePassword() {}

  showPassword() {
    const password = this.registerForm.value.password;

    if (password == "") {
      this.invalidPassword = "The password can't be empty";
    } else {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }

  doPasswordsMatch() {}

  register() {
    this._auth.register(this.registerForm.value).subscribe({
      next: () => {
        this._router.navigate(["/confirm"]);
      },
      error: (err) => console.error("signup error"),
    });
  }
}
