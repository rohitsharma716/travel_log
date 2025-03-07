﻿# Travel Log Application

A full-stack application for tracking your travel locations with user authentication and interactive features.

## Demo
[![Travel Log Demo](https://img.youtube.com/vi/AXrlpUtfnYA/0.jpg)](https://youtu.be/AXrlpUtfnYA)

Click the image above to watch the video demo.

## Features

### 1. Interactive Map
- Click on map to add new locations
- View all locations with custom markers
- Hover over markers to see details
- Click markers for detailed information

### 2. User Authentication
- Secure login and registration system
- User-specific data management
- Profile management with login time tracking
- Password-protected location adding

### 3. Location Management
- Add new locations with detailed information:
  - Title
  - Description
  - Comments
  - Rating (1-10)
  - Visit Date
  - Coordinates (automatically captured)
- Mark locations as:
  - Visited
  - Bucket List

### 4. User Interface
- Collapsible forms
- Responsive design
- Interactive buttons and animations
- Grid view for all locations
- Detailed view for each location

### 5. Navigation
- Switch between map and list views
- User menu in top right corner
- Easy access to all features

## Technical Stack

### Frontend
- React.js
- Mapbox GL
- React Router
- CSS3 with animations

### Backend
- Node.js
- Express
- MongoDB
- Mongoose

## Getting Started


1. Clone the repository
```bash
git clone https://github.com/rohitsharma716/travel_log.git
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In server directory, create .env file
DATABASE_URL=mongodb://localhost/travel-log
CORS_ORIGIN=http://localhost:3000
```

4. Start the application
```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm start
```

## Usage

1. Register/Login with your credentials
2. Click on the map to add new locations
3. Use the form to enter location details
4. View all locations in list view
5. Mark places as visited or add to bucket list
6. Click on markers to view/edit details

## Screenshots

[Add your application screenshots here]

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
