import { isPlatformBrowser } from "@angular/common";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, Observable, Subject } from "rxjs";
import {
  AuthenticationDetails,
  CognitoAccessToken,
  CognitoIdToken,
  CognitoUser,
  CognitoUserAttribute,
  CognitoUserPool,
  CognitoUserSession,
} from "amazon-cognito-identity-js";
import { environment } from "../../../environments/environment";
import { User } from "../../interfaces/user";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userPool: CognitoUserPool;
  private cognitoUser: CognitoUser | null = null;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAthenticated$ = this.isAuthenticated.asObservable();
  public email$ = "";
  public idToken$: string = "";

  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
    });

    // if (isPlatformBrowser(this._platformId)) {
    //   this.idToken$ = localStorage.getItem("idToken");
    // }
  }
  logIn(data: User) {
    const authenticationDetails = new AuthenticationDetails({
      Username: data.email,
      Password: data.password,
    });

    return new Observable((observer) => {
      this.cognitoUser = new CognitoUser({
        Username: data.email,
        Pool: this.userPool,
      });

      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          if (this.cognitoUser) {
            this.setUser(this.cognitoUser);
          }

          observer.next();
        },
        onFailure: (err) => {
          observer.error(err);
        },
      });
    });
  }

  getlocalIdToken(): string{
    return this.idToken$;
  }

  register(data: User): Observable<void> {
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: data.email }),
    ];

    return new Observable((observer) => {
      this.userPool.signUp(
        data.email,
        data.password,
        attributes,
        [],
        (err, result) => {
          if (err) {
            observer.error(err.message);
          } else {
            this.email$ = data.email;
            observer.next();
            observer.complete();
          }
        }
      );
    });
  }

  confirmSignUp(email: string, code: string) {
    return new Observable((observer) => {
      this.cognitoUser = new CognitoUser({
        Username: email,
        Pool: this.userPool,
      });
      this.cognitoUser.confirmRegistration(code, false, (err, result) => {
        if (err) {
          observer.error(err);
        } else {
          observer.next();
          observer.complete();
        }
      });
    });
  }

  private setUser(user: CognitoUser): CognitoUser {
    return user;
  }

  getCurrentUser(): CognitoUser | null {
    return this.cognitoUser;
  }

  getSession(): Observable<CognitoUserSession> {
    const user = this.getCurrentUser();

    return new Observable((observer) => {
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          return observer.next(session);
        });
      } else {
        throw new Error("There user is not signed in!");
      }
    });
  }

  getAccessToken(): Observable<CognitoAccessToken> {
    const user = this.getCurrentUser();

    return new Observable((observer) => {
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          return observer.next(session.getAccessToken());
        });
      } else {
        throw new Error("There user is not signed in!");
      }
    });
  }

  getIdToken(): Observable<CognitoIdToken> {
    const user = this.getCurrentUser();
    return new Observable((observer) => {
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            return observer.error(err);
          }
          this.idToken$ = JSON.stringify(session.getIdToken())
      
          this.idToken$ = "hello"
          // console.log(this.idToken$)
          // localStorage.setItem("idToken", JSON.stringify(session.getIdToken()));
          localStorage.setItem("idToken", this.idToken$)
          return observer.next(session.getIdToken());
        });
      } else {
        throw new Error("The user is not signed in!");
      }
    });
  }

  checkSessionValidity(): Observable<boolean> {
    const user = this.getCurrentUser();

    return new Observable((observable) => {
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          if (err) {
            return observable.error(err);
          }
          return observable.next(session.isValid());
        });
      } else {
        throw new Error("The user is not signed in!");
      }
    });
  }
}
