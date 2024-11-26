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


## How to Use the Website

### Step 1: Access the Main Website
- Navigate to [ConfoEase](https://confoease.onrender.com/).
- Upon landing, a default conference will be visible.

### Step 2: Register as a User
- Click the **Register** button on the top-right corner of the page.
- Complete the email verification process via OTP to proceed with registration.
- After verifying your email, provide additional details and set your password.
- Once registered, you will be assigned the **Admin** role for managing conference websites you create.

### Step 3: Create a Conference Website
- As an Admin, create a conference from your dashboard.
- Access your conference website via the route: `/conference/[Conference Name]`.
  > **Note**: Remember the name of your conference for future reference.

### Step 4: User Roles and Actions
#### On the Conference Website (`/conference/[Conference Name]`):
- **Admin**:
  - Create a new conference.
  - Change role of users registered for the conference.
  - Create, manage, and delete Reviewers.
  - Change user roles in the **User Registered** section.
  - Assign Reviewers to Papers submitted by Authors in the **Manage Papers** section.
- **Author**:
  - Submit research papers for the conference.
  - Track the status of submitted papers.
  - View the conference schedule.
- **Attendee**:
  - Register interest in attending the conference.
  - Access the conference schedule.
- **Reviewer**:
  - Assigned by Admin to review Authors' papers.
  - Can reject or accept papers.

### Additional Notes
- Roles (Admin, Author, Attendee, Reviewer) are specific to a particular conference.
  - Example: An Author registered for `/conference/HelloWorld` cannot access `/conference/WorldHello`.
- Deleting a Reviewer is managed in the **Manage Reviewer** section of the Admin dashboard.

### Key Features
- **Admin Dashboard**:
  - Centralized control for managing users, papers, and roles.
- **Role Management**:
  - Flexible system for assigning and updating user roles.
- **Paper Submission and Review**:
  - Streamlined workflow for submitting and reviewing research papers.

---

