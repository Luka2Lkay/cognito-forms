import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
  constructor(private _fb: FormBuilder) {}

  emptyUsername?: string;
  invalidEmail?: string;
  show: boolean = false;
  invalidPassword?: string;
  noMatch?: string;

  ngOnInit(): void {}

  registerForm: FormGroup = this._fb.group({
    userName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });

  isEmailValid() {}

  validatePassword() {}

  showPassword() {}

  doPasswordsMatch(){

  }

  register() {}
}
