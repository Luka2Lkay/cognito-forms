import { Component, OnInit } from '@angular/core';
import { NavComponent } from "../nav/nav.component";
import { ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-update-password',
  standalone: true,
  imports: [NavComponent, ReactiveFormsModule],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent implements OnInit {

  constructor(private _fb: FormBuilder){}

  ngOnInit(): void {
    
  }

  changePasswordForm: FormGroup = this._fb.group({
    oldPassword: "",
    newPassword: ""
  })

  changePassword(){
    console.log(this.changePasswordForm.value)
  }
}
