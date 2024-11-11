# Cognito Forms

This application utilises AWS Cognito to implement core authentication functionalities. It supports user registration, login, password modification, and password recovery.

## Installation

**Prerequisites:**

*Install Angular*
Globally install the Angular CLI using the command `npm install -g @angular/cli`. Accept all default prompts and choose the SSR option during the installation process.

*Create AWS account*

1. *Log in* to the AWS Management Console and search for "Cognito" in the top left search bar.

2. *Create User pool*:
     *STEP 1*: Enable email verification and proceed to the next step.
     *STEP 2*: Disable Multi-Factor Authentication (MFA) and proceed to the next step.
     *STEP 3*: Proceed to the next step without making any changes.
     *STEP 4*: Select "Send email with Cognito" for email delivery and proceed to the next step.
     *STEP 5*: Provide a name for your user pool and your app client. Then, proceed to the next step.
     *STEP 6*: Click "Create user pool" to finalize the process.

     












