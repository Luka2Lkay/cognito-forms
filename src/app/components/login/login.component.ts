import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Router } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _router: Router, private _auth: AuthService) {}

  isToast: boolean = false;
  invalidEmail?: string;

  ngOnInit(): void {}

  logInForm: FormGroup = this._fb.group({
    email: "luka.matshebelele@gmail.com",
    password: "Lukhanyo#2",
  });

  logIn() {

    this._auth.logIn(this.logInForm.value).subscribe({
      next: () => {
        this._router.navigate(["/dashboard"]);
      },
      error: (error) => console.log(error.message)
    })
  }

  isEmailValid() {}
  closeToast() {}

  redirectToResetPassword() {
    this._router.navigate(["/email/reset-password"]);
  }
}
