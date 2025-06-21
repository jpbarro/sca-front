# Spy Cats Agency - Agent Management Dashboard

This project is a frontend application for the Spy Cats Agency (SCA), built with Next.js and TypeScript. It provides a simple, focused dashboard for SCA agents to perform CRUD (Create, Read, Update, Delete) operations on the agency's spy cat roster.

The application is designed to be clean, functional, and easily integrated with a backend API.

![image](https://github.com/user-attachments/assets/275c198c-226b-43e8-a829-458bacc6dbd6)
---

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You will need Node.js (version 18.x or later) and npm/yarn/pnpm installed on your machine.

### Installation & Setup

1.  **Clone the repository:**

2.  **Install dependencies:**
    ```shell
    npm install
    # or
    yarn install
    # or
    pnpm install
    ```

3.  **Set up environment variables:**
    Create a new file named `.env.local` in the root of your project and add the URL for your backend API:
    ```
    NEXT_PUBLIC_API_URL=http://localhost:8000
    ```
    *Replace `http://localhost:8000` with the actual address of your running backend server.*

4.  **Run the development server:**
    ```shell
    npm run dev
    # or
    yarn dev
    # or
    pnpm dev
    ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## ✨ Features

The dashboard provides full CRUD functionality for managing spy cat agents.

### 1. View All Agents
* On page load, the application fetches and displays a list of all spy cat agents in a clean, responsive table.
* The table shows each agent's Name, Years of Experience, Breed, and current Salary.
* A loading state is shown while the data is being fetched.
* An empty state message is displayed if no agents are found.

### 2. Add a New Agent
* Click the "Add New Agent" button to open a dialog form.
* The form includes fields for Name, Years of Experience, Breed, and Salary.
* Input validation is handled by **Zod**, providing clear error messages for each field if the input is invalid (e.g., name is too short, salary is not a positive number).
* The form makes an API call to the backend to create the new agent.
* The agent list automatically refreshes upon successful creation.

### 3. Edit an Agent's Salary
* Each row in the agent table has an "Edit" button.
* Clicking "Edit" opens a dialog focused specifically on updating that agent's salary.
* The form is pre-filled with the agent's current salary.
* Input is validated to ensure it's a positive number.
* An API call is made to update the salary, and the list refreshes on success.

### 4. Delete an Agent
* Each row also has a "Delete" button.
* Clicking "Delete" opens a confirmation dialog to prevent accidental dismissals.
* Upon confirmation, an API call is made to remove the agent from the database.
* The agent list refreshes to reflect the deletion.

### Technical Highlights
* **Framework:** Next.js with the App Router.
* **Language:** TypeScript for full type safety.
* **Styling:** components by `shadcn/ui`.
* **API Communication:** `axios` is used for all HTTP requests to the backend API.
* **Validation:** `zod` is used for robust and declarative schema-based validation on all forms.
* **Component-Based Architecture:** The application is broken down into reusable UI components and feature-specific components for maintainability and scalability.
