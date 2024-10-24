import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit{

  constructor(private _auth: AuthService){}
  ngOnInit(): void {
    console.log(this._auth.getCurrentUser())
  }
}
