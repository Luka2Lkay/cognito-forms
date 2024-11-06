import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit } from "@angular/core";
import { NavComponent } from "../nav/nav.component";
import { AuthService } from "../../services/auth/auth.service";
import { RouterModule} from "@angular/router";
@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [NavComponent, RouterModule, ReactiveFormsModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.css",
})
export class ResetPasswordComponent implements OnInit {
  constructor(private _auth: AuthService, private _fb: FormBuilder) {}

  ngOnInit(): void {}

  resetPasswordForm: FormGroup = this._fb.group({
    newPassword: "",
    confirmPassword: ""
  })

  resetPassword() {
    this._auth.resetPassword("luka.matshebelele@gmail.com").subscribe({
      next: (res) => {
        console.log(res);
      },
      error: () => {
        throw new Error("reset error!");
      },
    });
  }
}
