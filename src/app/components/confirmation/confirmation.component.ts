import { Component } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";

@Component({
  selector: "app-confirmation",
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: "./confirmation.component.html",
  styleUrl: "./confirmation.component.css",
})
export class ConfirmationComponent {
  constructor(private _fb: FormBuilder) {}

  confirmForm: FormGroup = this._fb.group({
    code: "",
  });

  confirm(){

  }
}
