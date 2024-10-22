import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormGroup, FormBuilder, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-login",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.css",
})
export class LoginComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

  isToast: boolean = false;
  invalidEmail?: string;

  ngOnInit(): void {}

  logInForm: FormGroup = this._fb.group({
    email: "",
    password: "",
  });

  logIn() {}

  isEmailValid() {}
  closeToast() {}
}
