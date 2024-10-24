import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
import { Router } from "@angular/router";
@Component({
  selector: "app-confirmation",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./confirmation.component.html",
  styleUrl: "./confirmation.component.css",
})
export class ConfirmationComponent {
  constructor(
    private _fb: FormBuilder,
    private _auth: AuthService,
    private _router: Router
  ) {}

  confirmForm: FormGroup = this._fb.group({
    code: "",
  });

  confirm() {
    const { code } = this.confirmForm.value;
    this._auth.confirmSignUp("luka.matshebelele@gmail.com", code).subscribe({
      next: () => {
        this._router.navigate(["/dashboard"]);
      },
    });
  }
}
