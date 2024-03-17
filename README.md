# InventoryApp

InventoryApp is a web application designed to manage inventory efficiently and effectively. Built with Express.js, EJS, MongoDB, Multer, and Cloudinary, this application demonstrates the power of combining these technologies to create a dynamic and responsive inventory management system.

## Live Demo

Check out the live demo of the application here: [InventoryApp Live](https://inventoryapp-production-8f28.up.railway.app/)

## Features

- **Inventory Management**: Add, update, and delete inventory items.
- **File Upload**: Upload images for inventory items using Multer.
- **Cloud Storage**: Images are stored in Cloudinary, demonstrating cloud storage integration.
- **Dynamic Templating**: EJS as a view engine for dynamic content rendering.
- **Responsive Design**: A clean and responsive interface for managing inventory across different devices.

## Technologies Used

- **Backend**: Express.js
- **Database**: MongoDB
- **View Engine**: EJS
- **File Upload**: Multer for handling multipart/form-data
- **Cloud Storage**: Cloudinary for image uploads
- **Hosting**: The application is hosted on Railway.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MongoDB account and a cluster
- Cloudinary account for image upload

### Installation

1. Clone the repository:

```sh
git clone https://github.com/darkside1337/inventoryapp.git
cd inventoryapp
```

2. npm install

3. set up env file

```sh
NODE_ENV=development
PORT=5000
DB_URI=mongodb+srv://<your_mongodb_username>:<your_mongodb_password>@cluster0.rgbjhur.mongodb.net/InventoryApp?retryWrites=true&w=majority&appName=Cluster0
CLOUDINARY_CLOUD_NAME=drah7v8c0
CLOUDINARY_API_KEY=734533327244722
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>


```

4- Run the app using

```
npm start

```
