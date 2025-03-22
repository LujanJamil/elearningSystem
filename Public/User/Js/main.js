"use strict"
// GLOBAL VARIABLES
const $ = document;
const that = this;

// API ENDPOINT
const API_ENDPOINT = "http://localhost:8000/api/users/login";


// REGEX PATTERNS
const REGEX_PATTERNS = {
  mobile: /^\+\d{10,15}$/, // Matches mobile numbers in the format +1234567890
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password strength
};

/** 
 * LOGIN HANDLER CLASS
 * Handles login, validation, and secure commmunication with backend
*/
class LoginHandler {
  /**
   * Constructor to initialize the form and elements
   * @param {string} _Form_Id - form ID
   * @param {string} _Error_Id - Error message container
   * @param {string} _Success_Id - success message container
   * @param {string} _Loader_Id - Loading spinner container
   */
  constructor(_Form_Id, _Error_Id, _Success_Id, _Loader_Id) {
    this.loginForm = document.getElementById(_Form_Id);
    this.errorElement = document.getElementById(_Error_Id);
    this.successElement = document.getElementById(_Success_Id);
    this.loaderElement = document.getElementById(_Loader_Id);
    this.initialize();
  }

  /**
   *  INITIALIZE FORM SUBMISSION EVENT LISTENER
   */
  initialize() {
    this.loginForm.addEventListener("submit", (event) => this.submitFormLogin(event));
  }

  /**
 * Form submission asynchronously.
 * @param {Event} event - Form submission event
 */

  async submitFormLogin(event) {
    event.preventDefault(); // Prevent Default Form Submission
    try {
      // Collect Form data and store it in Form Object
      const _Form_Data = new FormData(this.loginForm);

      // Data Object to Plain Javscript
      const _Form_Object = Object.fromEntries(_Form_Data.entries());

      // Validate the form data before sent to the server
      const _ValidationError = this.ValidateFormData(_Form_Data);
      if (_ValidationError) {
        this.displayError(_ValidationError); // Show Validation
        return;
      }

      // Send Form Data Securely
      const response = await this.submitFormData(_Form_Object);
      const result = await response.json();
      console.log(result)

      // Send the validated Data to the server
      if (response.ok) {
        this.displaySuccess('Login has been successful!');
        this.registrationForm.reset();
        window.location.href = "login.html";
      } else {
        this.displayError(result.error || "Login has failed, please try again....")
      }

    } catch (error) {
      console.log(`An unexpected error has occurred during your login:", ${error}`);
      this.displayError(`An unexpected error occurred. Please try again later......`)
    } finally {
      this.hideLoader(); // Loader hiden by Default
    }
  }

  /**
   *  FORM VALIDATION WITH DEFINED INPUTS
   * @param {object} data - Form Data
   * @returns {string|null} - Validation error message or null if valid
   */
  ValidateFormData(data) {
    const _required_Fields = ["firstName", "lastName", "gender", "country", "mobile", "password", "confirmPassword"];
    // Check for empty fields
    // for (const _Field of _required_Fields) {
    //   if (!data[_Field]) {
    //     return `The ${_Field} field is required.`;
    //   }
    // }

    // Mobile number format
    // if (!REGEX_PATTERNS.mobile.test(data.mobile)) {
    //   return "Invalid mobile number format. Use the format +1234567890.";
    // }

    // Password strength
    //  if (!REGEX_PATTERNS.password.test(data.password)) {
    //   return "Password must include uppercase, lowercase, number, and special character, and be at least 8 characters long.";
    // }

    // Passwords match 
    if (data.createdPassword !== data.confirmPassword) {
      return "Password must be at least 8 characters long, include an uppercase letter, and a number.";
    }

    // Data is valid
    return null;

  }

  /**
  * Submit form data to the server securely.
  * @param {Object} data - Form data
  * @returns {Promise<Response} - Server response
  */
  async submitFormData(data) {
    return fetch(API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": 'application/json', // JSON format
        "X-CSRF-Token": this.getCSRFToken(), // CSRF token
      },
      body: JSON.stringify(data), // Convert the data to JSON
    })
  }

  /**
 * Retrieves CSRF token for secure requests.
 * @returns {string} - CSRF token
 */
  getCSRFToken() {
    const tokenMeta = document.querySelector('meta[name="csrf-token"]');
    return tokenMeta ? tokenMeta.getAttribute("content") : "";
  }

  /**
* Displays a success message.
* @param {string} message - Success message
*/
  displaySuccess(message) {
    this.successElement.textContent = message;
    this.successElement.style.display = "block";
    this.errorElement.style.display = "none"; // Hide error messages
  }

  /**
 * Displays an error message.
 * @param {string} message - Error message
 */

  displayError(message) {
    this.errorElement.textContent = message;
    this.errorElement.style.display = "block";
    this.successElement.style.display = "none"; // Hide success messages
  }

  /**
  * Shows the loading spinner.
  */
  showLoader() {
    this.loaderElement.classList.add('show');
  }

  /**
   * Hides the loading spinner.
   */
  hideLoader() {
    this.loaderElement.classList.add("hide");
  }

}


// INSTANTIATE THE LOGINHANDER
new LoginHandler("loginForm", "errorMessage", "successMessage", "loader");














































































// const API_ENDPOINT = "http://localhost:8000/api/users/login";
// /**
//    * Login an existing user
//    * @param {Object} credentials - { email, password }
//    */
//  async function loginUser(credentials) {
//     try {
//       const response = await fetch(`${API_ENDPOINT}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Login failed.");
//       }
//       const data = await response.json();
//       localStorage.setItem("token", data.token); // Save JWT token securely
//       alert("Login successful!");
//       window.location.href = "dashboard.html";
//     } catch (error) {
//       console.error("Login error:", error.message);
//       alert(`Error: ${error.message}`);
//     }
//   }
  
//   // Attach event listeners
//   document.addEventListener("DOMContentLoaded", () => {
//     const registerForm = document.getElementById("loginForm");
//     const loginForm = document.getElementById("loginForm");
  
//     if (registerForm) {
//       registerForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const userData = {
//           email: document.getElementById("email").value,
//           password: document.getElementById("password").value,
//         };
//         await registerUser(userData);
//       });
//     }
  
//     if (loginForm) {
//       loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const credentials = {
//           email: document.getElementById("email").value,
//           password: document.getElementById("password").value,
//         };
//         await loginUser(credentials);
//       });
//     }
//   });


// // const nextRegistrationBtn = document.getElementById("completeRegistrationBtn");
// // const mobileNumber = $.getElementById("mobile_code");
// // const backBtn = $.getElementById("backBtn");











// // Base API URL - replace with your backend URL
// const API_URL = "https://example.com/api";
// /**

//  * APIManager class: Handles API requests securely and asynchronously
//  */
// class APIManager {
//   constructor(baseUrl) {
//     this.baseUrl = baseUrl;
//   }

//   // Perform API requests
//   async request(endpoint, method = "GET", body = null, token = null) {
//     const headers = { "Content-Type": "application/json" };
//     if (token) headers.Authorization = `Bearer ${token}`;

//     try {
//       const response = await fetch(`${this.baseUrl}${endpoint}`, {
//         method,
//         headers,
//         body: body ? JSON.stringify(body) : null,
//       });

//       // Throw error for non-OK responses
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Error: ${response.status} - ${errorData.message || response.statusText}`);
//       }

//       return await response.json(); // Return parsed JSON data
//     } catch (error) {
//       console.error("API Request Failed:", error.message);
//       return null; // Return null on error to handle gracefully
//     }
//   }
// }

// /**
//  * UserInterface class: Handles dynamic UI updates
//  */
// class UserInterface {
//   constructor(apiManager) {
//     this.apiManager = apiManager; // Dependency injection of APIManager
//     this.token = localStorage.getItem("token"); // Retrieve token if logged in
//   }

//   // Initialize the UI on page load
//   async initialize() {
//     try {
//       const userStatus = await this.apiManager.request("/user/status", "GET", null, this.token);
//       if (userStatus) {
//         if (userStatus.role === "guest") {
//           this.renderGuestUI();
//         } else if (userStatus.role === "registered") {
//           this.renderRegisteredUI(userStatus);
//         }
//       } else {
//         // Default to guest UI if status cannot be retrieved
//         this.renderGuestUI();
//       }
//     } catch (error) {
//       console.error("Initialization Error:", error.message);
//       this.renderGuestUI(); // Fallback to guest UI
//     }
//   }

//   // Render guest user interface
//   renderGuestUI() {
//     const mainContainer = document.getElementById("main-container");
//     mainContainer.innerHTML = `
//       <h1>Welcome to the Learning Platform</h1>
//       <p>Please <a href="/register">register</a> or <a href="/login">log in</a> to access more features.</p>
//       <div id="course-list"></div>
//     `;
//     this.fetchAndRenderCourses(); // Fetch public courses for guest users
//   }

//   // Render registered user interface
//   renderRegisteredUI(userStatus) {
//     const mainContainer = document.getElementById("main-container");
//     mainContainer.innerHTML = `
//       <h1>Welcome, ${userStatus.name}!</h1>
//       <p>You have not paid for any courses yet. Browse available courses below.</p>
//       <div id="course-list"></div>
//     `;
//     this.fetchAndRenderCourses(); // Fetch public courses for registered users
//   }

//   // Fetch and render courses dynamically
//   async fetchAndRenderCourses() {
//     try {
//       const courses = await this.apiManager.request("/courses");
//       if (courses) {
//         this.renderCourses(courses);
//       } else {
//         console.error("Failed to fetch courses");
//         alert("Unable to load courses. Please try again later.");
//       }
//     } catch (error) {
//       console.error("Course Fetch Error:", error.message);
//       alert("An error occurred while loading courses. Please try again.");
//     }
//   }

//   // Render course cards
//   renderCourses(courses) {
//     const courseList = document.getElementById("course-list");
//     courseList.innerHTML = courses
//       .map(
//         (course) => `
//         <div class="course-card">
//           <h2>${course.title}</h2>
//           <p>${course.description}</p>
//           <button onclick="app.viewCourse(${course.id})">View Course</button>
//         </div>
//       `
//       )
//       .join("");
//   }

//   // Handle course viewing for guests and registered users
//   viewCourse(courseId) {
//     if (this.token) {
//       alert("You need to pay to access this course."); // Notify registered users
//     } else {
//       alert("Please register or log in to access this course."); // Notify guest users
//     }
//   }
// }

// /**
//  * App class: Initializes the application
//  */
// class App {
//   constructor() {
//     this.apiManager = new APIManager(API_URL); // Initialize APIManager
//     this.ui = new UserInterface(this.apiManager); // Initialize UserInterface
//   }

//   // Start the app
//   start() {
//     this.ui.initialize();
//   }

//   // Proxy viewCourse method for global access
//   viewCourse(courseId) {
//     this.ui.viewCourse(courseId);
//   }
// }

// // Initialize and start the app
// const app = new App();
// document.addEventListener("DOMContentLoaded", () => app.start());

























// // const API_URL = "https://example.com/api"; // Replace with your actual backend URL

// // // API Manager Class
// // class APIManager {
// //   constructor(baseUrl) {
// //     this.baseUrl = baseUrl;
// //   }

// //   // Generic request method
// //   async request(endpoint, method = "GET", body = null, token = null) {
// //     const headers = { "Content-Type": "application/json" };
// //     if (token) headers.Authorization = `Bearer ${token}`;

// //     try {
// //       const response = await fetch(`${this.baseUrl}${endpoint}`, {
// //         method,
// //         headers,
// //         body: body ? JSON.stringify(body) : null,
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         throw new Error(errorData.message || `Error ${response.status}`);
// //       }

// //       return await response.json();
// //     } catch (error) {
// //       console.error("API Error:", error.message);
// //       return null;
// //     }
// //   }
// // }

// // // User Interface Class
// // class UserInterface {
// //   constructor(apiManager) {
// //     this.apiManager = apiManager;
// //     this.token = localStorage.getItem("token") || null;
// //   }

// //   async initialize() {
// //     const userStatus = await this.getUserStatus();
// //     if (!userStatus) {
// //       this.renderGuestUI();
// //     } else if (userStatus.role === "registered") {
// //       this.renderRegisteredUI(userStatus);
// //     } else {
// //       this.renderGuestUI();
// //     }
// //   }

// //   async getUserStatus() {
// //     try {
// //       return await this.apiManager.request("/user/status", "GET", null, this.token);
// //     } catch {
// //       return null;
// //     }
// //   }

// //   renderGuestUI() {
// //     const container = document.getElementById("app");
// //     container.innerHTML = `
// //       <h1>Welcome to E-Learning</h1>
// //       <p>Please <a href="/register">register</a> or <a href="/login">log in</a>.</p>
// //       <div id="courses"></div>
// //     `;
// //     this.fetchAndRenderCourses();
// //   }

// //   renderRegisteredUI(user) {
// //     const container = document.getElementById("app");
// //     container.innerHTML = `
// //       <h1>Welcome, ${user.name}</h1>
// //       <p>You have not paid for any courses yet. Browse available courses below.</p>
// //       <div id="courses"></div>
// //     `;
// //     this.fetchAndRenderCourses();
// //   }

// //   async fetchAndRenderCourses() {
// //     try {
// //       const courses = await this.apiManager.request("/courses", "GET");
// //       if (courses) {
// //         this.renderCourses(courses);
// //       } else {
// //         alert("Failed to fetch courses.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching courses:", error.message);
// //       alert("An error occurred while fetching courses.");
// //     }
// //   }

// //   renderCourses(courses) {
// //     const container = document.getElementById("courses");
// //     container.innerHTML = courses
// //       .map(
// //         (course) => `
// //       <div class="course">
// //         <h2>${course.title}</h2>
// //         <p>${course.description}</p>
// //         <button onclick="app.viewCourse(${course.id})">View Course</button>
// //       </div>`
// //       )
// //       .join("");
// //   }

// //   viewCourse(courseId) {
// //     if (this.token) {
// //       alert("Please pay to access this course.");
// //     } else {
// //       alert("Please register or log in first.");
// //     }
// //   }
// // }

// // // Main App Class
// // class App {
// //   constructor() {
// //     this.apiManager = new APIManager(API_URL);
// //     this.ui = new UserInterface(this.apiManager);
// //   }

// //   start() {
// //     this.ui.initialize();
// //   }

// //   viewCourse(courseId) {
// //     this.ui.viewCourse(courseId);
// //   }
// // }

// const nextRegistrationBtn = document.getElementById("completeRegistrationBtn");

// // REGEX PATTERNS
// const REGEX_PATTERNS = {
//   mobile: /^\+\d{10,15}$/, // Matches mobile numbers in the format +1234567890
//   password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password strength
// };
// nextRegistrationBtn.addEventListener('click', () => {
//     const mobileNumber = $.getElementById("mobile_code").value;
//       // Mobile number format
//     if (!REGEX_PATTERNS.mobile.test(mobileNumber)) {
//       return "Invalid mobile number format. Use the format +1234567890.";
//     }
// })


// // const app = new App();
// // document.addEventListener("DOMContentLoaded", () => app.start());


// const API_ENDPOINT_USER_REGISTER = "http://localhost:3000/api/users/login";

//   /**
//    * Login an existing user
//    * @param {Object} credentials - { email, password }
//    */
//   async function loginUser(credentials) {
//     try {
//       const response = await fetch(`${API_ENDPOINT_USER_REGISTER}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(credentials),
//       });
//       if (!response.ok) {
//         const error = await response.json();
//         throw new Error(error.message || "Login failed.");
//       }
//       const data = await response.json();
//       localStorage.setItem("token", data.token); // Save JWT token securely
//       alert("Login successful!");
//       window.location.href = "register.html";
//     } catch (error) {
//       console.error("Login error:", error.message);
//       alert(`Error: ${error.message}`);
//     }
//   }


//   /**
//    * Logout the user by clearing storage
//    */
//   function logoutUser() {
//     localStorage.removeItem("token");
//     alert("You have been logged out.");
//     window.location.href = "index.html";
//   }
  
//   // Attach event listeners
//   document.addEventListener("DOMContentLoaded", () => {
//     const loginForm = document.getElementById("loginForm");
  
//     if (loginForm) {
//       loginForm.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         const credentials = {
//           email: document.getElementById("email").value,
//           password: document.getElementById("password").value,
//         };
//         await loginUser(credentials);
//       });
//     }
//   });






































// "use strict"
// // GLOBAL VARIABLES
// const $ = document;
// const that = this;

// // API ENDPOINT
// const API_ENDPOINTS = "http://localhost:8000/api/users/register";

// // REGEX PATTERNS
// const REGEX_PATTERNS = {
//   mobile: /^\+\d{10,15}$/, // Matches mobile numbers in the format +1234567890
//   password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password strength
// };

// /** 
//  * LOGIN HANDLER CLASS
//  * Handles login, validation, and secure commmunication with backend
// */
// class LoginHandler {
//   /**
//    * Constructor to initialize the form and elements
//    * @param {string} _Form_Id - form ID
//    * @param {string} _Error_Id - Error message container
//    * @param {string} _Success_Id - success message container
//    * @param {string} _Loader_Id - Loading spinner container
//    */
//   constructor(_Form_Id, _Error_Id, _Success_Id, _Loader_Id) {
//     this.LoginForm = document.getElementById(_Form_Id);
//     this.errorElement = document.getElementById(_Error_Id);
//     this.successElement = document.getElementById(_Success_Id);
//     this.loaderElement = document.getElementById(_Loader_Id);
//     this.initialize();
//   }

//   /**
//    *  INITIALIZE FORM SUBMISSION EVENT LISTENER
//    */
//   initialize() {
//     this.registrationForm.addEventListener("submit", (event) => this.submitFormRegistration(event));
//   }

//   /**
//  * Form submission asynchronously.
//  * @param {Event} event - Form submission event
//  */

//   async submitFormRegistration(event) {
//     event.preventDefault(); // Prevent Default Form Submission
//     try {
//       // Collect Form data and store it in Form Object
//       const _Form_Data = new FormData(this.registrationForm);

//       // Data Object to Plain Javscript
//       const _Form_Object = Object.fromEntries(_Form_Data.entries());

//       // Validate the form data before sent to the server
//       const _ValidationError = this.ValidateFormData(_Form_Data);
//       if (_ValidationError) {
//         this.displayError(_ValidationError); // Show Validation
//         return;
//       }

//       // Send Form Data Securely
//       const response = await this.submitFormData(_Form_Object);
//       const result = await response.json();
//       console.log(result)

//       // Send the validated Data to the server
//       if (response.ok) {
//         this.displaySuccess('Registration has been successful!');
//         this.registrationForm.reset();
//         window.location.href = "login.html";
//       } else {
//         this.displayError(result.error || "Registration has failed, please try again....")
//       }

//     } catch (error) {
//       console.log(`An unexpected error has occurred during your registration:", ${error}`);
//       this.displayError(`An unexpected error occurred. Please try again later......`)
//     } finally {
//       this.hideLoader(); // Loader hiden by Default
//     }
//   }

//   /**
//    *  FORM VALIDATION WITH DEFINED INPUTS
//    * @param {object} data - Form Data
//    * @returns {string|null} - Validation error message or null if valid
//    */
//   ValidateFormData(data) {
//     const _required_Fields = ["firstName", "lastName", "gender", "country", "mobile", "password", "confirmPassword"];
//     // Check for empty fields
//     // for (const _Field of _required_Fields) {
//     //   if (!data[_Field]) {
//     //     return `The ${_Field} field is required.`;
//     //   }
//     // }

//     // Mobile number format
//     // if (!REGEX_PATTERNS.mobile.test(data.mobile)) {
//     //   return "Invalid mobile number format. Use the format +1234567890.";
//     // }

//     // Password strength
//     //  if (!REGEX_PATTERNS.password.test(data.password)) {
//     //   return "Password must include uppercase, lowercase, number, and special character, and be at least 8 characters long.";
//     // }

//     // Passwords match 
//     if (data.createdPassword !== data.confirmPassword) {
//       return "Password must be at least 8 characters long, include an uppercase letter, and a number.";
//     }

//     // Data is valid
//     return null;

//   }

//   /**
//   * Submit form data to the server securely.
//   * @param {Object} data - Form data
//   * @returns {Promise<Response} - Server response
//   */
//   async submitFormData(data) {
//     return fetch(API_ENDPOINT, {
//       method: "POST",
//       headers: {
//         "Content-Type": 'application/json', // JSON format
//         "X-CSRF-Token": this.getCSRFToken(), // CSRF token
//       },
//       body: JSON.stringify(data), // Convert the data to JSON
//     })
//   }

//   /**
//  * Retrieves CSRF token for secure requests.
//  * @returns {string} - CSRF token
//  */
//   getCSRFToken() {
//     const tokenMeta = document.querySelector('meta[name="csrf-token"]');
//     return tokenMeta ? tokenMeta.getAttribute("content") : "";
//   }

//   /**
// * Displays a success message.
// * @param {string} message - Success message
// */
//   displaySuccess(message) {
//     this.successElement.textContent = message;
//     this.successElement.style.display = "block";
//     this.errorElement.style.display = "none"; // Hide error messages
//   }

//   /**
//  * Displays an error message.
//  * @param {string} message - Error message
//  */

//   displayError(message) {
//     this.errorElement.textContent = message;
//     this.errorElement.style.display = "block";
//     this.successElement.style.display = "none"; // Hide success messages
//   }

//   /**
//   * Shows the loading spinner.
//   */
//   showLoader() {
//     this.loaderElement.classList.add('show');
//   }

//   /**
//    * Hides the loading spinner.
//    */
//   hideLoader() {
//     this.loaderElement.classList.add("hide");
//   }

// }


// new LoginHandler();
