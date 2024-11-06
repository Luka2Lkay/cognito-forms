import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { Component, OnInit, PLATFORM_ID, Inject } from "@angular/core";
import { NavComponent } from "../nav/nav.component";
import { AuthService } from "../../services/auth/auth.service";
import { RouterModule, Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-reset-password",
  standalone: true,
  imports: [NavComponent, RouterModule, ReactiveFormsModule],
  templateUrl: "./reset-password.component.html",
  styleUrl: "./reset-password.component.css",
})
export class ResetPasswordComponent implements OnInit {
  email: string = "";
  constructor(
    private _auth: AuthService,
    private _fb: FormBuilder,
    private _router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    if (isPlatformBrowser(this._platformId)) {
      this.email = sessionStorage.getItem("email") || "";
    }
  }

  codeSent: boolean = false;
  notMatching: boolean = false;

  ngOnInit(): void {
    this.codeSentMessage();
    console.log(this.email);
  }

  resetPasswordForm: FormGroup = this._fb.group({
    newPassword: "",
    confirmPassword: "",
    code: "",
  });

  codeSentMessage() {
    setTimeout(() => {
      this.codeSent = false;
    }, 2000);

    this.codeSent = true;
  }

  resetPassword() {
    const { newPassword, confirmPassword, code } = this.resetPasswordForm.value;

    if (newPassword === confirmPassword) {
      this._auth.confirmPassword(this.email, code, newPassword).subscribe({
        next: () => {
          this._router.navigate(["/login"]);
        },
      });
    } else {

      setTimeout(() => {
        this.notMatching = false;
      }, 2000)

      this.notMatching = true;
    }
  }
}
