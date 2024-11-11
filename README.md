# Cognito Forms

This application utilises AWS Cognito to implement core authentication functionalities. It supports user registration, login, password modification, and password recovery.

## Installation

**Prerequisites:**

_Install Angular_
Globally install the Angular CLI using the command `npm install -g @angular/cli`. Accept all default prompts and choose the SSR option during the installation process.

_Create AWS account_

1. _Log in_ to the AWS Management Console and search for "Cognito" in the top left search bar.

2. _Create User pool_:
   - _STEP 1_: Enable email verification and proceed to the next step.
   - _STEP 2_: Disable Multi-Factor Authentication (MFA) and - proceed to the next step.
   - _STEP 3_: Proceed to the next step without making any changes.
   - _STEP 4_: Select "Send email with Cognito" for email delivery and proceed to the next step.
   - _STEP 5_: Provide a name for your user pool and your app client. Then, proceed to the next step.
   - _STEP 6_: Click "Create user pool" to finalize the process.

**How to Run the Program:**

1. Run `git clone git@github.com:Luka2Lkay/cognito-forms.git`.
2. navigate to the cloned repository.
3. Open the terminal and execute `npm install`.
4. Run `ng g envinronments`.
5. In the environment.development.ts file, create the object: 

 <p>cognito: {</br>
     userPoolId: "your-user-pool-id",</br>
     userPoolWebClientId: "your-user-client-id",</br>
     region: "your-aws-region"</br>
}</p>

6. Run `ng serve -o`
