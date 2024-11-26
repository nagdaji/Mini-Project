# ConfoEase - README

## Overview
ConfoEase is a web platform designed for creating and managing conference websites. It allows users to create dedicated conference pages where attendees, authors, and reviewers can interact based on their assigned roles. Below is a guide to help you navigate and use the platform.

## Developer Setup

Follow these steps to set up the project locally:

1. **Clone the Repository**:
   - Open your git bash terminal or command prompt and run:
     ```bash
     git clone https://github.com/nagdaji/Mini-Project.git
     ```

2. **Navigate to the Project Directory**:
   - Move into the cloned directory:
     ```bash
     cd Mini-Project
     ```

3. **Install Dependencies**:
   - Install the required Node.js modules:
     ```bash
     npm install
     ```

4. **Start the Development Server**:
   - Start the project using Vite's development server:
     ```bash
     npm run dev
     ```
   - This will start the server, and you can access the application in your browser at the URL provided in the terminal (e.g., `http://localhost:5173`).

---


# ConfoEase – User Guide

## How to Use the Website

1. **Landing on the Website**:
   - Visit the main website at [https://confoease.onrender.com/](https://confoease.onrender.com/).
   - A default conference will be displayed on the main page.

2. **Registration**:
   - Click the **Register** button located in the top-right corner.
   - Verify your email by entering the OTP sent to your registered email address. This step is mandatory for further registration.
   - After email verification, proceed to provide additional details and set your password.

3. **Admin Role Assignment**:
   - Once registered, you will be assigned the **Admin** role for the conference website you create.

4. **Creating a Conference Website**:
   - As an Admin, create a new conference through the dashboard.
   - Access your newly created conference website by navigating to:
     ```
     /conference/[Conference Name]
     ```
     Replace `[Conference Name]` with the name of the conference you created.
     > **Note**: Remember the name of the conference you create in the Admin dashboard for future reference.

5. **Roles and Functionalities**:
   - On the new conference website (`/conference/[Conference Name]`), users can register as **Authors** or **Attendees**:
     - **Authors**:
       - Submit research papers for the conference.
       - Track the status of submitted papers.
       - View the conference schedule.
     - **Attendees**:
       - Register to attend the conference.
       - View the conference schedule.
     - **Reviewers**:
       - Assigned by the Admin to verify and review the papers submitted by Authors.
   - The **Admin** can:
     - Create and manage Reviewers.
     - Assign Reviewers to Authors in the **Manage Papers** section.
     - Change user roles in the **User Registered** section by updating the role column in the displayed table.
     - Delete Reviewers through the **Manage Reviewer** section.

6. **Role-Specific Access**:
   - User roles (Admin, Author, Attendee, Reviewer) are specific to a particular conference.
   - For example, an Author registered for `/conference/HelloWorld` cannot log in to `/conference/WorldHello`.

7. **Managing Papers and Reviewers**:
   - Assign Reviewers to papers submitted by Authors through the **Manage Papers** section of the Admin dashboard.
   - Delete Reviewers using the **Manage Reviewer** section.

---
