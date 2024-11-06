import { CommonEngine } from "@angular/ssr";
import { Injectable, Inject, PLATFORM_ID } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
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
import { Session } from "node:inspector";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userPool: CognitoUserPool;
  private cognitoUser: CognitoUser | null = null;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAthenticated$ = this.isAuthenticated.asObservable();
  public email$ = "";
  public userSe$: string | null = "";
  public idToken$: string | null = "";
  private sessionToken$: string | null = "";

  constructor(@Inject(PLATFORM_ID) private _platformId: Object) {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
    });

    this.cognitoUser = this.userPool.getCurrentUser();

    if (this.cognitoUser) {
      this.initialiseSessionToken(this.cognitoUser);
    }
  }

  initialiseSessionToken(user: CognitoUser) {
    if (user) {
      user.getSession((err: any, session: CognitoUserSession) => {
        if (!err) {
          // console.log(session.getIdToken())
          this.sessionToken$ = session.getIdToken().getJwtToken();
        }
      });
    }
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

          this.getIdToken().subscribe({
            next: (res) => {
              this.setIdToken(res);
            },
          });
          observer.next();
        },
        onFailure: (err) => {
          observer.error(err);
        },
      });
    });
  }

  // getIdPayload(): Observable<any> {

  //   return new Observable((observer) => {
  //     if (this.idToken$) {
  //       return observer.next(JSON.parse(this.idToken$).payload);
  //     }
  //     // return observer.error("no token!");
  //   });
  // }

  getIdPayload(): Observable<any> {
    const user = this.getCurrentUser();
    return new Observable((observer) => {
      if (user) {
        user.getSession((err: any, session: CognitoUserSession) => {
          observer.next(session.getIdToken().payload);
        });
      }
      // return observer.error("no token!");
    });
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

  private setIdToken(token: CognitoIdToken): CognitoIdToken {
    return token;
  }

  getCurrentUser(): CognitoUser | null {
    return this.cognitoUser;
  }

  private refreshToken() {
    const user = this.getCurrentUser();

    if (user) {
    }
    // user.refreshSession
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
          return observer.next(session.getIdToken());
        });
      } else {
        return observer.error("error!");
      }
    });
  }

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const user = this.getCurrentUser();

    return new Observable((observer) => {
      if (user) {
        user.changePassword(oldPassword, newPassword, (err, result) => {
          if (err) {
            return observer.error(err);
          }

          return observer.next(result);
        });
      } else {
        return observer.error("user not logged in!");
      }
    });
  }

  resetPassword(email: string): Observable<string> {
    this.cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Observable((observer) => {
      if (this.cognitoUser) {
        this.cognitoUser.forgotPassword({
          onSuccess: () => {
            observer.next("sent reset code");
          },
          onFailure: (err) => {
            observer.error(err);
          },
        });
      }
    });
  }

  confirmPassword(email: string, code: string, newPassword: string) {
    this.cognitoUser = new CognitoUser({
      Username: email,
      Pool: this.userPool,
    });

    return new Observable((obsever) => {
      if (this.cognitoUser) {
        this.cognitoUser.confirmPassword(code, newPassword, {
          onSuccess: () => {
            obsever.next("Password changed!");
          },
          onFailure: (err) => {
            obsever.error(err);
          },
        });
      }
    });
  }

  logout(): Observable<any> {
    const user = this.getCurrentUser();

    return new Observable((observer) => {
      console.log("mxm");
      if (user) {
        user.signOut();
        observer.next();
      }
    });
  }
}
