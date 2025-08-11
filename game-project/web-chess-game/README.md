# Web-Based Chess Game

This project is a fully functional web-based chess game that allows users to play against an AI opponent. The game is built using HTML, CSS, and JavaScript for the frontend, with a Node.js backend to handle game logic and AI moves.

## Project Structure

```
web-chess-game
├── backend
│   ├── app.js
│   ├── routes
│   │   └── chess.js
│   ├── services
│   │   └── ai.js
│   └── package.json
├── frontend
│   ├── index.html
│   ├── css
│   │   └── styles.css
│   ├── js
│   │   ├── app.js
│   │   └── chessboard.js
│   └── assets
├── README.md
└── .gitignore
```

## Local Running Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd web-chess-game
   ```

2. **Set Up the Backend**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```
   - Start the backend server:
     ```bash
     node app.js
     ```

3. **Set Up the Frontend**
   - Open the `frontend/index.html` file in your web browser to access the chess game.

## GitHub Deployment Instructions

1. **Create a New Repository on GitHub**
   - Go to GitHub and create a new repository.

2. **Push Your Local Code to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git remote add origin <repository-url>
   git push -u origin master
   ```

## EC2 Instance Setup Instructions

1. **Launch an EC2 Instance**
   - Go to the AWS Management Console and launch a new EC2 instance with an Ubuntu Server.

2. **Connect to Your EC2 Instance**
   ```bash
   ssh -i <your-key.pem> ubuntu@<your-ec2-public-dns>
   ```

3. **Install Node.js and npm**
   ```bash
   sudo apt update
   sudo apt install nodejs npm
   ```

4. **Clone Your Repository on the EC2 Instance**
   ```bash
   git clone <repository-url>
   cd web-chess-game/backend
   npm install
   ```

5. **Start the Backend Server**
   ```bash
   node app.js
   ```

6. **Access the Application**
   - Open your web browser and navigate to `http://<your-ec2-public-dns>:<port>` to access the chess game.

## License

This project is licensed under the MIT License. Feel free to modify and distribute as needed.