import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
} from "amazon-cognito-identity-js";
import { environment } from "../../../environments/environment";
import { User } from "../../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
   private userPool: CognitoUserPool;
  private user: CognitoUser | null = null;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAthenticated$ = this.isAuthenticated.asObservable();

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
     });
  }

  logIn() {}

  register(data: User): Observable<void> {
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: data.email }),
    ];

    return new Observable((observer) => {
      console.log(environment)
  //     this.userPool.signUp(
  //       data.userName,
  //       data.password,
  //       attributes,
  //       [],
  //       (err, result) => {
  //         if (err) {
  //           observer.error(err);
  //         } else {
  //           observer.next();
  //           observer.complete();
  //         }
  //       }
  //     );
    });
  }
}
