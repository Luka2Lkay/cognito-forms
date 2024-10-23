import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "../../services/auth/auth.service";
@Component({
  selector: "app-confirmation",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./confirmation.component.html",
  styleUrl: "./confirmation.component.css",
})
export class ConfirmationComponent {
  constructor(private _fb: FormBuilder, private _auth: AuthService) {}

  confirmForm: FormGroup = this._fb.group({
    code: "",
  });

  confirm(){
    const {code} = this.confirmForm.value

    console.log(code)
  }
}
