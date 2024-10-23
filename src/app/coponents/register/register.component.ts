import { Component, OnInit } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { AuthService } from "../../services/auth/auth.service";
@Component({
  selector: "app-register",
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: "./register.component.html",
  styleUrl: "./register.component.css",
})
export class RegisterComponent implements OnInit {
  constructor(private _fb: FormBuilder, private _auth: AuthService) {}

  emptyUsername?: string;
  invalidEmail?: string;
  show: boolean = false;
  invalidPassword?: string;
  noMatch?: string;

  ngOnInit(): void {}

  registerForm: FormGroup = this._fb.group({
    userName: "Luks",
    email: "luka.matshebelele@gmail.com",
    password: "Lukhanyo#5",
    confirmPassword: "Lukhanyo#5"
  });

  isEmailValid() {}

  validatePassword() {}

  showPassword() {
    const password = this.registerForm.value.password;

    if (password == "") {
      this.invalidPassword = "The password can't be empty";
    } else {
      if (this.show) {
        this.show = false;
      } else {
        this.show = true;
      }
    }
  }

  doPasswordsMatch(){

  }

  async register() {
   
    // this._auth.register(this.registerForm.value).subscribe({
    //   next: () => {
    //     console.log("Signup successful!")
    //   },
    //   error: (err) => console.error("signup error")
    // })

    await this._auth.signUp(this.registerForm.value.email, this.registerForm.value.password).then(()=> console.log("awer!"))
  }
}
