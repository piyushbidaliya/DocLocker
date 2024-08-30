This project is a React application that provides user authentication (sign-in, sign-up, and logout) and file storage capabilities using Firebase. Users can upload documents, view their uploaded documents, share them via email, and delete them as needed.

Features
User Authentication: Users can create accounts, log in, and log out using Firebase Authentication.
Document Upload: Users can upload documents to Firebase Storage.
Document Management: Users can view, download, share, and delete their uploaded documents.
Email Sharing: Users can share documents via email.

Technologies Used
React: JavaScript library for building user interfaces.
Firebase: Backend services for authentication, storage, and more.
Firebase Authentication
Firebase Storage
React Router: For navigation and routing within the application.
UUID: For generating unique identifiers for uploaded documents.
Tailwind CSS: For styling the user interface.

Setup and Installation
Clone the repository:
git clone https://github.com/piyushbidaliya/DocLocker.git
cd react-firebase-dashboard
Install dependencies:
npm install
Set up Firebase:
Create a Firebase project in the Firebase Console.
Enable Authentication (Email/Password).
Enable Firebase Storage.
Configure Firebase:
Create a .env file in the root of your project and add your Firebase configuration:
env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
Run the application:
npm start
The application should now be running on http://localhost:3000.

Usage
Authentication
Register: Users can create a new account.
Login: Users can log in using their email and password.
Logout: Users can log out of their account.
Dashboard
Upload Documents: Users can upload documents using the file input.
View Documents: Uploaded documents are listed with options to download, share, or delete.
Share Documents: Users can share documents by entering an email address.
Delete Documents: Users can delete documents they no longer need.

Project Structure
src/
├── assets/                     # Images and other assets
├── authContext/                # Context API for authentication
├── components/                 # Reusable React components (DashBoard)
├── firebase/                   # Firebase configuration and services
├── pages/                      # Main pages (Login, Register, Home)
├── App.js                      # Main application component
├── index.js                    # Application entry point
└── styles/                     # Global styles
Contributing
If you'd like to contribute to this project, feel free to fork the repository and submit a pull request. Contributions are welcome!
