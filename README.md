# Music App

A feature-rich music application built using the MERN stack. The app provides JWT authentication and authorization, allows music search via Spotify Developer API, and supports nested comments with replies for individual songs. It also implements infinite loading for music search and pagination for comments.

![image](https://github.com/user-attachments/assets/af9a068e-c04e-4fb1-a297-b0a80919428b)

![image](https://github.com/user-attachments/assets/a8302afd-e8c9-4331-89df-8793d36c95bc)

![image](https://github.com/user-attachments/assets/ee8eff75-5ab0-451d-b5b1-7c857949d0f1)

## Project Demo

[Drive link:](https://drive.google.com/file/d/15VMkquWM53b0HqbCpFSmslac_IfGxRLh/view?usp=sharing)


## Features
- **User Authentication:** Secure user login and registration with JWT.
- **Music Search:** Integrated with Spotify Developer API for real-time music search.
- **Nested Comments:** Comment and reply functionality on individual songs.
- **Infinite Loading:** For seamless music search experience.
- **Pagination:** Load more functionality for comments.
- **State Management:** Managed using Context API for simplicity.
- **Modular Code:** Clean and maintainable structure for scalability.

## Project Structure
```
root-folder
├── backend
├── frontend
```
## Steps to Get Spotify Client ID and Client Secret

Follow these steps to obtain the Spotify Client ID and Client Secret for integrating the Spotify Developer API:

## Step 1: Create a Spotify Developer Account
1. Go to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard).
2. Log in using your Spotify account credentials. If you don’t have an account, create one by clicking **Sign Up**.

## Step 2: Create an App
1. Once logged in, click on **Create an App**.
2. Fill out the required fields:
   - **App Name**: Provide a name for your application.
   - **App Description**: Write a short description of your app.
3. Agree to the **Spotify Developer Terms of Service**.
4. Click **Create**.

## Step 3: View Client ID and Client Secret
1. After creating the app, you’ll be redirected to the app dashboard.
2. Here, you will find your **Client ID** directly on the dashboard.
3. To view the **Client Secret**:
   - Click on **Show Client Secret**.
   - Copy and save both the **Client ID** and **Client Secret** securely.

## Step 4: Configure Redirect URI (if required)
1. Go to the **Edit Settings** option on the app dashboard.
2. Under **Redirect URIs**, click **Add Redirect URI**.
3. Enter your app’s redirect URL (e.g., `http://localhost:5173/callback` for local development).
4. Save your changes.

## Step 5: Test Your Credentials
1. Use the **Client ID** and **Client Secret** to make API requests or generate an access token.
2. Refer to the [Spotify API documentation](https://developer.spotify.com/documentation/web-api/) for detailed usage.

By following these steps, you’ll successfully acquire the necessary credentials to integrate the Spotify API into your application.


### Environment Variables
#### Backend
Create a `.env` file in the `backend` folder with the following variables:
```
MONGO_URL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret_key>
PORT=<port_number>
SPOTIFY_CLIENT_ID=<your_spotify_client_id>
SPOTIFY_CLIENT_SECRET=<your_spotify_client_secret>
```

#### Frontend
Create a `.env` file in the `frontend` folder with the following variable:
```
VITE_API_URL=<backend_api_url> # http://localhost:3000
```

## Installation

### Prerequisites
- Node.js and npm installed.
- MongoDB instance running.

### Backend
1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

### Frontend
1. Navigate to the `frontend` folder:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```

## Usage
1. Open your browser and navigate to the frontend URL (e.g., `http://localhost:5173`).
2. Register or log in to start using the app.
3. Search for songs using the Spotify search bar.
4. Add comments or reply to existing comments on individual songs.

## Folder Structure
### Backend
```
backend
├── controllers
├── models
├── routes
├── middleware
├── utils
├── .env
├── index.js
```
- **controllers:** Contains logic for handling requests.
- **models:** MongoDB schemas and models.
- **routes:** API routes.
- **middleware:** Custom middleware for authentication.
- **utils:** Utility functions.

### Frontend
```
frontend
├── src
│   ├── assets
│   ├── components
│   ├── pages
│   ├── context
│   ├── services
│   ├── utils
│   ├── App.jsx
│   ├── index.css
│   ├── main.jsx
├── public
├── .env
```
- **components:** Reusable UI components.
- **pages:** Page-level components.
- **context:** Context API logic for state management.
- **services:** API service functions.

## Technologies Used
- **Frontend:** React.js, Vite, TailwindCSS
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT
- **API Integration:** Spotify Developer API
- **State Management:** Context API


