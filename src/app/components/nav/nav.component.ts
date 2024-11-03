import { Component } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router, RouterModule  } from "@angular/router";
@Component({
  selector: "app-nav",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./nav.component.html",
  styleUrl: "./nav.component.css",
})
export class NavComponent {
  constructor(private _auth: AuthService, private _router: Router) {}
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
