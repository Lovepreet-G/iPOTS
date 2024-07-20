# iAccess Program for iPOTS

## Introduction

The iAccess program enhances the accessibility of the iPOTS platform, ensuring an inclusive user experience for individuals with medical conditions and specific accommodation needs. It focuses on user-friendly interfaces, comprehensive data management, and seamless integration with existing iPOTS features.

## Technology Stack

- **Frontend**: React, Bootstrap
- **Backend**: PHP, MySQL (Database)

## Pages and Features

#### Sign-Up Page
- Allows user registration with fields for first name, last name, username, date of birth (DOB), allergies, and password.
- Includes a user consent form.

#### Login Page
- Authenticates users with username and password.

#### Home Page
- Provides five main options: Accessibility Category, Medical Condition, My Library, Legal, Dictionary.

#### Accessibility Category Page
- Mandatory location selection (Home, Work, School, Transit, Medical, All).
- Offers accessibility options tailored to selected locations (e.g., hearing, pain, vision).
- Detailed accommodation information with descriptions and examples.
- Bookmark feature to save accommodations to My Library.

#### Medical Condition Page
- Mandatory location selection (Home, Work, School, Transit, Medical, All).
- Allows alphabetical selection and search functionality (text and audio) for medical conditions.
- Displays medical conditions starting with the selected letter.
- Redirects to the Accessibility Category page with specific accessibility options.

#### My Library Page
- Displays bookmarked accommodations.

#### Legal Page
- Displays legal terms and conditions.

#### Dictionary Page
- Allows alphabetical selection and search functionality for medical conditions.
- Provides detailed definitions of selected medical conditions.

#### Profile Info Page
- Displays and allows editing of profile information.
- Includes a logout option.

## Database Tables

#### Users Table
- **Fields**: user_id(PK), username, firstname, lastname, email, password, medicalcondition, allergies, dob.

#### Accommodations Table
- **Fields**: accommodation_id(PK), disability_category, medical_condition, location, location_purpose, accommodation, description, article, website, example.

#### Medical Conditions Table
- **Fields**: medical_id(PK), term, definition.

#### My Accessibility Table
- **Fields**: myaccessibilty_id(PK), user_id(FK), accommodation_id(FK).
