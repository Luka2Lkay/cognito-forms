import { Component, OnInit, Inject, PLATFORM_ID } from "@angular/core";
import { AuthService } from "../../services/auth/auth.service";
import { RouterModule } from "@angular/router";
import { Router } from "@angular/router";
import { isPlatformBrowser } from "@angular/common";
@Component({
  selector: "app-dashboard",
  standalone: true,
  imports: [RouterModule],
  templateUrl: "./dashboard.component.html",
  styleUrl: "./dashboard.component.css",
})
export class DashboardComponent implements OnInit {
  // idToken: string = "";

  constructor(
    private _auth: AuthService,
    private _router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {
    // if (isPlatformBrowser(this._platformId)) {
    //   this.idToken = localStorage.getItem("tokenId") || "";
    // }
  }

  ngOnInit(): void {
    console.log(this._auth.getIdToken().subscribe({
      next: (res) => console.log(res)
    }));
    this.getIdToken();
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
      next: (res) => {
        console.log(res)
        // this.idToken = res.getJwtToken();
        // localStorage.setItem("tokenId", this.idToken);
        // console.log(this.idToken);
      },
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
      },
    });
  }
}
