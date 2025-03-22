"use strict"; // GLOBAL VARIABLES

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var $ = document;
var that = void 0; // API ENDPOINT

var API_ENDPOINT = "http://localhost:8000/api/users/register"; // REGEX PATTERNS

var REGEX_PATTERNS = {
  mobile: /^\+\d{10,15}$/,
  // Matches mobile numbers in the format +1234567890
  password: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ // Password strength

};
/** 
 * REGISTRATION HANDLER CLASS
 * Handles registration, validation, and secure commmunication with backend
*/

var RegistrationHandler =
/*#__PURE__*/
function () {
  /**
   * Constructor to initialize the form and elements
   * @param {string} _Form_Id - form ID
   * @param {string} _Error_Id - Error message container
   * @param {string} _Success_Id - success message container
   * @param {string} _Loader_Id - Loading spinner container
   */
  function RegistrationHandler(_Form_Id, _Error_Id, _Success_Id, _Loader_Id) {
    _classCallCheck(this, RegistrationHandler);

    this.registrationForm = document.getElementById(_Form_Id);
    this.errorElement = document.getElementById(_Error_Id);
    this.successElement = document.getElementById(_Success_Id);
    this.loaderElement = document.getElementById(_Loader_Id);
    this.initialize();
  }
  /**
   *  INITIALIZE FORM SUBMISSION EVENT LISTENER
   */


  _createClass(RegistrationHandler, [{
    key: "initialize",
    value: function initialize() {
      var _this = this;

      this.registrationForm.addEventListener("submit", function (event) {
        return _this.submitFormRegistration(event);
      });
    }
    /**
    * Form submission asynchronously.
    * @param {Event} event - Form submission event
    */

  }, {
    key: "submitFormRegistration",
    value: function submitFormRegistration(event) {
      var _Form_Data, _Form_Object, _ValidationError, response, result;

      return regeneratorRuntime.async(function submitFormRegistration$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              event.preventDefault(); // Prevent Default Form Submission

              _context.prev = 1;
              // Collect Form data and store it in Form Object
              _Form_Data = new FormData(this.registrationForm); // Data Object to Plain Javscript

              _Form_Object = Object.fromEntries(_Form_Data.entries()); // Validate the form data before sent to the server

              _ValidationError = this.ValidateFormData(_Form_Data);

              if (!_ValidationError) {
                _context.next = 8;
                break;
              }

              this.displayError(_ValidationError); // Show Validation

              return _context.abrupt("return");

            case 8:
              _context.next = 10;
              return regeneratorRuntime.awrap(this.submitFormData(_Form_Object));

            case 10:
              response = _context.sent;
              _context.next = 13;
              return regeneratorRuntime.awrap(response.json());

            case 13:
              result = _context.sent;
              console.log(result); // Send the validated Data to the server

              if (response.ok) {
                this.displaySuccess('Registration has been successful!');
                this.registrationForm.reset();
                window.location.href = "login.html";
              } else {
                this.displayError(result.error || "Registration has failed, please try again....");
              }

              _context.next = 22;
              break;

            case 18:
              _context.prev = 18;
              _context.t0 = _context["catch"](1);
              console.log("An unexpected error has occurred during your registration:\", ".concat(_context.t0));
              this.displayError("An unexpected error occurred. Please try again later......");

            case 22:
              _context.prev = 22;
              this.hideLoader(); // Loader hiden by Default

              return _context.finish(22);

            case 25:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, [[1, 18, 22, 25]]);
    }
    /**
     *  FORM VALIDATION WITH DEFINED INPUTS
     * @param {object} data - Form Data
     * @returns {string|null} - Validation error message or null if valid
     */

  }, {
    key: "ValidateFormData",
    value: function ValidateFormData(data) {
      var _required_Fields = ["firstName", "lastName", "gender", "country", "mobile", "password", "confirmPassword"]; // Check for empty fields
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
      } // Data is valid


      return null;
    }
    /**
    * Submit form data to the server securely.
    * @param {Object} data - Form data
    * @returns {Promise<Response} - Server response
    */

  }, {
    key: "submitFormData",
    value: function submitFormData(data) {
      return regeneratorRuntime.async(function submitFormData$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              return _context2.abrupt("return", fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                  "Content-Type": 'application/json',
                  // JSON format
                  "X-CSRF-Token": this.getCSRFToken() // CSRF token

                },
                body: JSON.stringify(data) // Convert the data to JSON

              }));

            case 1:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this);
    }
    /**
    * Retrieves CSRF token for secure requests.
    * @returns {string} - CSRF token
    */

  }, {
    key: "getCSRFToken",
    value: function getCSRFToken() {
      var tokenMeta = document.querySelector('meta[name="csrf-token"]');
      return tokenMeta ? tokenMeta.getAttribute("content") : "";
    }
    /**
    * Displays a success message.
    * @param {string} message - Success message
    */

  }, {
    key: "displaySuccess",
    value: function displaySuccess(message) {
      this.successElement.textContent = message;
      this.successElement.style.display = "block";
      this.errorElement.style.display = "none"; // Hide error messages
    }
    /**
    * Displays an error message.
    * @param {string} message - Error message
    */

  }, {
    key: "displayError",
    value: function displayError(message) {
      this.errorElement.textContent = message;
      this.errorElement.style.display = "block";
      this.successElement.style.display = "none"; // Hide success messages
    }
    /**
    * Shows the loading spinner.
    */

  }, {
    key: "showLoader",
    value: function showLoader() {
      this.loaderElement.classList.add('show');
    }
    /**
     * Hides the loading spinner.
     */

  }, {
    key: "hideLoader",
    value: function hideLoader() {
      this.loaderElement.classList.add("hide");
    }
  }]);

  return RegistrationHandler;
}(); // INSTANTIATE THE REGISTRATIONHANDER


new RegistrationHandler("registrationForm", "errorMessage", "successMessage", "loader");
/** 
 * FIRST STEP REGISTRATION HANDLER CLASS
*/

var FirstStepRegistration =
/*#__PURE__*/
function () {
  function FirstStepRegistration() {
    var _this2 = this;

    _classCallCheck(this, FirstStepRegistration);

    this._mobile_Error = $.getElementById("mobile_code");
    this._Next_step_btn = document.getElementById("completeRegistrationBtn");
    this._Mobile_number_input = document.getElementById("mobile_code");
    this.firstStepContainer = document.getElementById("firstRegistration");
    this.lastStepContainer = document.getElementById("lastRegistration");
    this._back_Btn = document.getElementById("backBtn");

    this._Mobile_number_input.addEventListener("input", function () {
      return _this2.Firststep();
    });

    this._back_Btn.addEventListener("click", function () {
      return _this2.BackStepOne();
    });
  }

  _createClass(FirstStepRegistration, [{
    key: "Firststep",
    value: function Firststep() {
      var _Mobile_number = this._Mobile_number_input.value;

      if (_Mobile_number !== "" || null) {
        this._Next_step_btn.removeAttribute("disabled");

        this._Next_step_btn.classList.remove("bg-secondary");
      } else {
        this._Next_step_btn.classList.add("bg-secondary");
      }

      this._Next_step_btn.addEventListener("click", function () {
        return NextStep();
      });

      function NextStep() {
        // Mobile number format
        var mobile = REGEX_PATTERNS.mobile;

        if (!mobile.test(_Mobile_number)) {
          var _mobile_Error = document.getElementById("mobileError");

          var time_out = 100;
          setTimeout(function () {
            if (time_out === 0) {
              _mobile_Error.textContent = "";
            } else {
              _mobile_Error.textContent = "Invalid mobile number format. Use the format +1234567890.";
            }
          }, time_out);
        } else {
          var firstStepContainer = document.getElementById("firstRegistration");
          var lastStepContainer = document.getElementById("lastRegistration");
          if (!firstStepContainer.classList.contains("show", "hide")) firstStepContainer.classList.add("hide");
          lastStepContainer.classList.remove("hide");
        }
      }
    }
  }, {
    key: "BackStepOne",
    value: function BackStepOne() {
      if (!this.lastStepContainer.classList.contains("hide") && this.firstStepContainer.classList.contains("hide")) this.lastStepContainer.classList.add("hide");
      this.firstStepContainer.classList.remove("hide");
    }
  }]);

  return FirstStepRegistration;
}();

new FirstStepRegistration();