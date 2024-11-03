import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router, RouterModule } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [RouterModule, FooterComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}

  userInfo: any;
  ngOnInit(): void {}

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

  redirectToUpdateProfile() {
    this._router.navigate(["/update-password"])
  }
}
