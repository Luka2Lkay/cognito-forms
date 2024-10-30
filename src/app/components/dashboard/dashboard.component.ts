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
  constructor(
    private _auth: AuthService,
    private _router: Router,
    @Inject(PLATFORM_ID) private _platformId: Object
  ) {}

  userInfo: any;

  ngOnInit(): void {
    
    this.getIdPayload();
  }

  getSession() {
    this._auth.getSession().subscribe({
      next: (res) => console.log(res),
    });
    this._auth.idToken$;
  }

  getAccessToken() {
    this._auth.getAccessToken().subscribe({
      next: (res) => {
     
        console.log(res);
      },
      error: () => {
        this._router.navigate(["/login"]);
      },
    });
  }

  getIdPayload() {
    this._auth.getIdPayload().subscribe({
      next: (res) => {
        this.userInfo = res
      },
      error: () =>{
        
        this._router.navigate(["/login"])
      }
    })
  }

  checkSessionValidity() {
    this._auth.checkSessionValidity().subscribe({
      next: (res) => console.log(res),
      error: (error) => {
        console.log(error)
        // this._router.navigate(["/login"]);
      },
    });
  }
}
