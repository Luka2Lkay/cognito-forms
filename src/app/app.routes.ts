import { Routes } from "@angular/router";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ConfirmationComponent } from "./components/confirmation/confirmation.component";
import { ProfileComponent } from "./components/profile/profile.component";
import { UpdatePasswordComponent } from "./components/update-password/update-password.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";

export const routes: Routes = [
  { path: "", redirectTo: "/register", pathMatch: "full" },
  { path: "profile", component: ProfileComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "confirm", component: ConfirmationComponent },
  { path: "update-password", component: UpdatePasswordComponent },
  {path: "reset-password", component: ResetPasswordComponent}
];
