"use strict";

// Update plaform date
(function () {
  var date = new Date();
  currentDate = date.getFullYear();
  document.getElementById("currentDate").innerText = currentDate;
})();

window.onscroll = function () {
  var headerSection = document.querySelector('header');
  if (window.scrollY > 0) headerSection.classList.add('sticky');else headerSection.classList.remove('sticky');
}; // (() => {
//   const links  = document.querySelector("#navLinks");
//     for(const link of links.children) {
//       link.addEventListener("click", (e) => {
//         if(!link.classList.contains("active")) {
//           console.log(e.target)
//         }
//       })
//     }
// })();


var _Course_cards = document.querySelectorAll(".course-card");

var _iteratorNormalCompletion = true;
var _didIteratorError = false;
var _iteratorError = undefined;

try {
  for (var _iterator = _Course_cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
    var card = _step.value;
    var enrollBtn = card.querySelectorAll("a");
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = enrollBtn[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var btn = _step2.value;
        btn.addEventListener("click", function () {
          // window.location.href = "../../../Guest User/Pages/Courses/Pages/courses.html"
          window.location.href = "../../../../Src/Dashboards/Student/Pages/Default.html";
        });
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }
  } // // add hovered class to selected list item
  // let list = document.querySelectorAll(".navigation li");
  // function activeLink() {
  //   list.forEach((item) => {
  //     item.classList.remove("hovered");
  //   });
  //   this.classList.add("hovered");
  // }
  // list.forEach((item) => item.addEventListener("mouseover", activeLink));
  // // Menu Toggle
  // let toggle = document.querySelector(".toggle");
  // let navigation = document.querySelector(".navigation");
  // let main = document.querySelector(".main");
  // toggle.onclick = function () {
  //   navigation.classList.toggle("active");
  //   main.classList.toggle("active");
  // };

} catch (err) {
  _didIteratorError = true;
  _iteratorError = err;
} finally {
  try {
    if (!_iteratorNormalCompletion && _iterator["return"] != null) {
      _iterator["return"]();
    }
  } finally {
    if (_didIteratorError) {
      throw _iteratorError;
    }
  }
}