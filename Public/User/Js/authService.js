"use strict"
// GLOBAL VARIABLES
const $ = document;
const that = this;

// API ENDPOINT
const API_ENDPOINT = "http://localhost:8000/api/users/register";

// REGEX PATTERNS
const REGEX_PATTERNS = {
  mobile: /^\+\d{10,15}$/, // Matches mobile numbers in the format +1234567890
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, // Password strength
};

/** 
 * REGISTRATION HANDLER CLASS
 * Handles registration, validation, and secure commmunication with backend
*/
class RegistrationHandler {
  /**
   * Constructor to initialize the form and elements
   * @param {string} _Form_Id - form ID
   * @param {string} _Error_Id - Error message container
   * @param {string} _Success_Id - success message container
   * @param {string} _Loader_Id - Loading spinner container
   */
  constructor(_Form_Id, _Error_Id, _Success_Id, _Loader_Id) {
    this.registrationForm = document.getElementById(_Form_Id);
    this.errorElement = document.getElementById(_Error_Id);
    this.successElement = document.getElementById(_Success_Id);
    this.loaderElement = document.getElementById(_Loader_Id);
    this.initialize();
  }

  /**
   *  INITIALIZE FORM SUBMISSION EVENT LISTENER
   */
  initialize() {
    this.registrationForm.addEventListener("submit", (event) => this.submitFormRegistration(event));
  }

  /**
 * Form submission asynchronously.
 * @param {Event} event - Form submission event
 */

  async submitFormRegistration(event) {
    event.preventDefault(); // Prevent Default Form Submission
    try {
      // Collect Form data and store it in Form Object
      const _Form_Data = new FormData(this.registrationForm);

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
        this.displaySuccess('Registration has been successful!');
        this.registrationForm.reset();
        window.location.href = "login.html";
      } else {
        this.displayError(result.error || "Registration has failed, please try again....")
      }

    } catch (error) {
      console.log(`An unexpected error has occurred during your registration:", ${error}`);
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

// INSTANTIATE THE REGISTRATIONHANDER
new RegistrationHandler("registrationForm", "errorMessage", "successMessage", "loader");

/** 
 * FIRST STEP REGISTRATION HANDLER CLASS
*/

class FirstStepRegistration {
  constructor() {
    this._mobile_Error = $.getElementById("mobile_code");
    this._Next_step_btn = document.getElementById("completeRegistrationBtn");
    this._Mobile_number_input = document.getElementById("mobile_code");
    this.firstStepContainer = document.getElementById("firstRegistration");
    this.lastStepContainer = document.getElementById("lastRegistration");
    this._back_Btn = document.getElementById("backBtn");
    this._Mobile_number_input.addEventListener("input", () => this.Firststep());
    this._back_Btn.addEventListener("click", () => this.BackStepOne());
  }

  Firststep() {
    let _Mobile_number = this._Mobile_number_input.value;
    if (_Mobile_number !== "" || null) {
      this._Next_step_btn.removeAttribute("disabled");
      this._Next_step_btn.classList.remove("bg-secondary");
    } else {
      this._Next_step_btn.classList.add("bg-secondary");
    }
    this._Next_step_btn.addEventListener("click", () => NextStep());
    function NextStep() {
      // Mobile number format
      const { mobile } = REGEX_PATTERNS;
      if (!mobile.test(_Mobile_number)) {
        let _mobile_Error = document.getElementById("mobileError");
        let time_out = 100;
        setTimeout(() => {
          if (time_out === 0) {
            _mobile_Error.textContent = "";
          } else {
            _mobile_Error.textContent = `Invalid mobile number format. Use the format +1234567890.`;
          }
        }, time_out);
      }
      else {
    const firstStepContainer = document.getElementById("firstRegistration");
    const lastStepContainer = document.getElementById("lastRegistration");
        if (!firstStepContainer.classList.contains("show", "hide"))
          firstStepContainer.classList.add("hide");
          lastStepContainer.classList.remove("hide");
      }
    }
  }
 BackStepOne() {
    if (!this.lastStepContainer.classList.contains("hide") && this.firstStepContainer.classList.contains("hide"))
        this.lastStepContainer.classList.add("hide");
        this.firstStepContainer.classList.remove("hide");
 }

}

 new FirstStepRegistration();


 