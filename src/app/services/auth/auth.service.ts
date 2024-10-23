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
  private cognitoClient: CognitoIdentityClient;
  private user: CognitoUser | null = null;
  private isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAthenticated$ = this.isAuthenticated.asObservable();

  constructor() {
    this.userPool = new CognitoUserPool({
      UserPoolId: environment.cognito.userPoolId,
      ClientId: environment.cognito.userPoolWebClientId,
    });

    this.cognitoClient = new CognitoIdentityClient({
      region: environment.cognito.region,
      credentials: fromCognitoIdentityPool({
        identityPoolId: environment.cognito.userPoolId
      })
    })
  }

  logIn() {}

  // {
  //   Username: username,
  //   Password: password,
  //   Email: email,
  //   ...(additionalAttributes || {}), // Add optional additional attributes
  // }

  async signUp(email: string, password: string){
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email }),
    ];
    try {
      const signUpResponse = await this.userPool.signUp(
        email,
        password,
      [],
        attributes,(err, result) => {
          if(err) {
            console.log(err)
          }
        }
    );

      console.log('Sign-up successful:', signUpResponse);
      return signUpResponse; // Return the sign-up response data
    } catch (error) {
      console.error('Sign-up failed:', error);
      throw error; // Re-throw the error for handling in the component
    }
  }

  register(data: User): Observable<void> {
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: data.email }),
    ];

    return new Observable((observer) => {
      this.userPool.signUp(
        data.userName,
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
}
