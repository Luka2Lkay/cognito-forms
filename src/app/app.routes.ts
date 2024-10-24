import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";

export const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  {path: "confirm", component: ConfirmationComponent}
];