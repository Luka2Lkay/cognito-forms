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
import {CognitoIdentityClient} from "@aws-sdk/client-cognito-identity"
import {fromCognitoIdentityPool} from "@aws-sdk/credential-provider-cognito-identity"
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private userPool: CognitoUserPool;
  // private cognitoClient: CognitoIdentityClient;
  private cognitoUser: CognitoUser | null = null;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAthenticated$ = this.isAuthenticated.asObservable();

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
    });

    // this.cognitoClient = new CognitoIdentityClient({
    //   region: environment.cognito.region,
    //   credentials: fromCognitoIdentityPool({
    //     identityPoolId: environment.cognito.userPoolId
    //   })
    // })
  }

  logIn() {}

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
            observer.next();
            observer.complete();
          }
        }
      );
    });
  }

  confirmSignUp(email: string, code: string){
    return new Observable((observer) => {

      this.cognitoUser = new CognitoUser({Username: email, Pool: this.userPool})
      this.cognitoUser.confirmRegistration(code, false,(err, result) => {
        if(err){
          observer.error(err)
        } else{
          observer.next();
          observer.complete();
        }
      })

    })
  }
}
