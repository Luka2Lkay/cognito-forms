import { Component, OnInit } from "@angular/core";
import { NavComponent } from "../nav/nav.component";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-update-password",
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: "./update-password.component.html",
  styleUrl: "./update-password.component.css",
})
export class UpdatePasswordComponent implements OnInit {
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  changePasswordForm: FormGroup = this._fb.group({
    oldPassword: "",
    newPassword: "",
  });

  changePassword() {
    const { oldPassword, newPassword } = this.changePasswordForm.value;

    this._auth.changePassword(oldPassword, newPassword).subscribe({
      next: (res) => {
        this._router.navigate(["/login"]);
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
