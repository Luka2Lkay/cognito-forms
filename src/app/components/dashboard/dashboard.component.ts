import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { NavComponent } from "../nav/nav.component";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterModule, NavComponent],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  constructor(
    private _auth: AuthService,
    private _router: Router,
  ) {}

  userInfo: any;
  
  ngOnInit(): void {

    this.getIdPayload();
  }

  getIdPayload() {
    this._auth.getIdPayload().subscribe({
      next: (res) => {
        this.userInfo = res;
      },
      error: () => {
        this._router.navigate(["/login"]);
      },
    });
  }

  logOut() {
    this._auth.logout().subscribe({
      next: () => {
        this._router.navigate(["/login"]);
      },
      error: (err) => {
        throw new Error(err);
      },
    });
  }
}
