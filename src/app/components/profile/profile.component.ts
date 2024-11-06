import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { Router, RouterModule } from "@angular/router";
import { FooterComponent } from "../footer/footer.component";
import { NavComponent } from "../nav/nav.component";

@Component({
  selector: "app-profile",
  standalone: true,
  imports: [RouterModule, FooterComponent, NavComponent],
  templateUrl: "./profile.component.html",
  styleUrl: "./profile.component.css",
})
export class ProfileComponent implements OnInit {
  constructor(private _auth: AuthService, private _router: Router) {}

  userInfo: any;
  ngOnInit(): void {}

  redirectToUpdatePassword() {
    this._router.navigate(["/update-password"]);
  }
}
