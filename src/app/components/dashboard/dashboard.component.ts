import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}
  ngOnInit(): void {
    this.checkSessionValidity();
  }

  getSession() {
    this._auth.getSession().subscribe({
      next: (res) => console.log(res),
    });
  }

  getAccessToken() {
    this._auth.getAccessToken().subscribe({
      next: (res) => console.log(res),
      error: () => {
        this._router.navigate(["/login"]);
      },
    });
  }

  getIdToken() {
    this._auth.getIdToken().subscribe({
      next: (res) => console.log(res),
      error: () => {
        this._router.navigate(["/login"]);
      },
    });
  }

  checkSessionValidity() {
    this._auth.checkSessionValidity().subscribe({
      next: (res) => console.log(res),
      error: () => {
        this._router.navigate(["/login"]);
      }
    })
  }
}
