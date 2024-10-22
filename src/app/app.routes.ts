import { Routes } from "@angular/router";
import { DashboardComponent } from "./coponents/dashboard/dashboard.component";
import { LoginComponent } from "./coponents/login/login.component";
import { RegisterComponent } from "./coponents/register/register.component";

export const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
];
