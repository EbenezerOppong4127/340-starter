project-root/
│
├── controllers/
│   └── baseController.js
├── routes/
│   └── static.js
├── views/
│   ├── index.ejs
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── navigation.ejs
├── public/
│   ├── css/
│   ├── js/
│   └── images/
├── .env
├── server.js

In routes/static.js, modify the dynamic route to use the baseController.

Updated routes/static.js

const express = require('express');
const router = express.Router();
const baseController = require("../controllers/baseController"); // Adjusted path to baseController

// Static Routes
// Set up "public" folder / subfolders for static files
router.use(express.static("public"));
router.use("/css", express.static(__dirname + "public/css"));
router.use("/js", express.static(__dirname + "public/js"));
router.use("/images", express.static(__dirname + "public/images"));

// Define dynamic routes
//router.get("/", (req, res) => {
//res.render("index"); // Render the EJS template for /index
//});

[//]: # (Updated routes/static.js)
// Define dynamic routes
router.get("/", baseController.buildHome); // Route now calls the controller method



module.exports = router;


Here's the restructured and organized documentation for your `README` file:

---

# CSE 340 Banner Image

## **Model-View-Controller (MVC) Implementation**

### **Conceptual Overview**
This section provides a high-level overview of the Model-View-Controller (MVC) architecture. A video accompanies this guide to explain the concept. For further clarity, refer to the provided transcript of the video.

---

## **Activity Overview**
The video provides a general overview of the activity but lacks detailed steps for implementation. Use this document for specific instructions to complete each process.

---

## **Steps to Get Organized**

1. **File Creation**:
    - Create `index.js` in the **database** folder.
    - Create `inventory-model.js` in the **models** folder.
    - Create `baseController.js` in the **controllers** folder.

---

## **Database Connection**

### **Overview**
The database connection is established using the `pg` (node-postgres) package. This ensures smooth communication between the application and the PostgreSQL database.

1. **Prepare the Environment**:
    - Open `package.json` and confirm `pg` is listed as a dependency.
    - Open the `.env` file (ensure the filename is `.env`, not `.envsample`).
    - Add the following to the `.env` file:
      ```plaintext
      NODE_ENV='development'
      ```  
      Save and close the file.

2. **Setup the Database Connection**:  
   Open the `index.js` file in the **database** folder and add the following code:

   ```javascript
   const { Pool } = require("pg");
   require("dotenv").config();

   let pool;

   if (process.env.NODE_ENV === "development") {
       pool = new Pool({
           connectionString: process.env.DATABASE_URL,
           ssl: { rejectUnauthorized: false },
       });

       module.exports = {
           async query(text, params) {
               try {
                   const res = await pool.query(text, params);
                   console.log("Executed query:", { text });
                   return res;
               } catch (error) {
                   console.error("Query error:", { text });
                   throw error;
               }
           },
       };
   } else {
       pool = new Pool({
           connectionString: process.env.DATABASE_URL,
       });

       module.exports = pool;
   }
   ```  

### **Code Explanation**
- **Lines 1-2**: Import `Pool` from `pg` and configure `dotenv` for environment variable management.
- **Lines 9-15**: Set up a connection pool for development mode with SSL.
- **Lines 18-31**: Export a query function for troubleshooting in development mode.
- **Lines 32-37**: Create and export a connection pool for production mode.

3. **Add Connection String to `.env`**:
    - Log in to your [Render](https://render.com) dashboard and copy the `External Database URL`.
    - Add the following to your `.env` file:
      ```plaintext
      DATABASE_URL=<your-copied-database-url>
      ```  

---

## **Inventory Model**

### **Purpose**
The `inventory-model.js` file interacts with the database to retrieve and manage classification and inventory data.

1. Open `inventory-model.js` in the **models** folder and add the following code:
   ```javascript
   const pool = require("../database/");

   /* ***************************
    *  Get all classification data
    * ************************** */
   async function getClassifications() {
       return await pool.query(
           "SELECT * FROM public.classification ORDER BY classification_name"
       );
   }

   module.exports = { getClassifications };
   ```  

### **Code Explanation**
- **Line 1**: Import the database connection file.
- **Line 6**: Define an asynchronous `getClassifications` function to fetch classification data from the database.
- **Line 10**: Export the function for use in other files.

---

## **Base Controller**

### **Purpose**
The `baseController.js` file manages general application logic, such as rendering the home page.

1. Open `baseController.js` in the **controllers** folder and add the following code:
   ```javascript
   const utilities = require("../utilities/");
   const baseController = {};

   baseController.buildHome = async function (req, res) {
       const nav = await utilities.getNav();
       res.render("index", { title: "Home", nav });
   };

   module.exports = baseController;
   ```  

### **Code Explanation**
- **Line 1**: Import `utilities/index.js` (to be created later).
- **Line 2**: Define an empty `baseController` object.
- **Line 4-7**: Create an asynchronous function `buildHome` to build and render the home page with a navigation bar.

---

## **Next Steps**

1. **Utilities Setup**:
    - Create the `index.js` file in a **utilities** folder.
    - Write the logic for `getNav()` to dynamically generate the navigation bar.

2. **Testing**:
    - Ensure all files are saved and free of errors.
    - Run your application and monitor the terminal for query execution logs.

3. **Deployment**:
    - For production environments, ensure SSL settings are removed from the database connection pool.

---

## **Final Notes**
- Keep this guide handy for future projects involving MVC implementation.
- Refer to the [node-postgres documentation](https://node-postgres.com) for advanced database queries and configurations.

---  

This documentation is ready for insertion into your `README.md`. Would you like additional formatting or sections?


