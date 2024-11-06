import { Component, OnInit } from "@angular/core";
import { RouterModule, Router } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: "app-email-reset-password",
  standalone: true,
  imports: [RouterModule, ReactiveFormsModule, NavComponent],
  templateUrl: "./email-reset-password.component.html",
  styleUrl: "./email-reset-password.component.css",
})
export class EmailResetPasswordComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  invalidEmail: boolean = false;

  emailForm: FormGroup = this._fb.group({
    email: "",
  });

  sendLink() {
    this._auth.resetPassword(this.emailForm.value.email).subscribe({
      next: () => {
        this._router.navigate(["/reset-password"]);
      },
      error: () => {
        setTimeout(() => {
          this.invalidEmail = false;
        }, 2000);

        this.invalidEmail = true;
      },
    });
  }
}
