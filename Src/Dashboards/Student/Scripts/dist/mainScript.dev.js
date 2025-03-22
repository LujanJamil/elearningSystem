"use strict";

// Update plaform date, Logout user 
(function () {
  var date = new Date();
  currentDate = date.getFullYear();
  document.getElementById("currentDate").innerText = currentDate;

  var _LogoutBtn = document.getElementById("logoutBtn");

  _LogoutBtn.addEventListener("click", function () {
    localStorage.removeItem("token"); // alert("You have been logged out.");

    window.location.href = "../../../../Public/User/login.html";
  });
})();