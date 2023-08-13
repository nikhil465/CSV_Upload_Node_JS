# CSV Upload App

The CSV Upload app is a web application built using Node.js and Express that allows users to upload CSV files, view the data from uploaded CSV files, and perform various actions such as sorting, searching, and pagination on the displayed data. This README provides an overview of the app's architecture, features, and setup instructions.

## Features

1. **CSV File Upload:** Users can upload CSV files containing tabular data.
2. **Data Display:** Uploaded CSV data is displayed in a tabular format.
3. **Sorting:** Users can sort the displayed data by clicking on column headers.
4. **Search:** Users can search for specific values within the displayed data.
5. **Pagination:** Data is displayed in pages, with options to navigate between pages.
6. **Logging:** App logs are generated for monitoring and debugging purposes.

## Prerequisites

Before running the app, ensure that you have the following installed:

- Node.js (v14.x or higher)
- MongoDB (Make sure the MongoDB server is running)

## Getting Started

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd csv-upload-app
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the project root and define the following environment variables:

   ```plaintext
   CSV_ENVIRONMENT=development
   CSV_ASSET_PATH=./assets
   CSV_DB=csv_upload_development
   ```

   You can adjust these values based on your preferences.

4. Start the app:

   ```bash
   npm start
   ```

   The app will start on port 8000 by default. Access it in your browser at `http://localhost:8000`.

## Usage

1. **Upload CSV:** On the homepage, click "Upload a CSV File" and select a CSV file to upload.
2. **View Uploaded Files:** The list of uploaded CSV files will be displayed on the homepage. Click on a filename to view its data.
3. **View CSV Data:** The uploaded CSV data will be displayed in a table. You can sort columns, search for values, and navigate through pages.

## Folder Structure

- `config`: Contains app configuration files.
- `controllers`: Defines the app's route controllers.
- `models`: Defines the data models (Mongoose schemas) for MongoDB.
- `public`: Contains static assets like stylesheets and client-side scripts.
- `routes`: Defines the app's express routes.
- `uploads`: The folder where uploaded CSV files are stored.
- `views`: Contains EJS templates for rendering HTML views.
- `index.js`: The main entry point of the app.

## Logging

App logs are stored in the `production_logs` directory. Log rotation is configured to create a new log file every day.

## Credits

This app was created by Nikhil Lomate as a demonstration of building a CSV file upload and data display functionality using Node.js, Express, and MongoDB.

## License

This project is licensed under the [MIT License](LICENSE).
