// Update plaform date
( function() {
  const date = new Date();
  currentDate = date.getFullYear();
  document.getElementById("currentDate").innerText = currentDate;
})();

window.onscroll = ()=> { 
  let headerSection= document.querySelector('header');
  if(window.scrollY > 0)
      headerSection.classList.add('sticky');
  else
      headerSection.classList.remove('sticky');
  
}

// (() => {
//   const links  = document.querySelector("#navLinks");
//     for(const link of links.children) {
//       link.addEventListener("click", (e) => {
//         if(!link.classList.contains("active")) {
//           console.log(e.target)
//         }
//       })
//     }
// })();

const _Course_cards = document.querySelectorAll(".course-card");
for (const card of _Course_cards) {
    const enrollBtn = card.querySelectorAll("a");
    for (const btn of enrollBtn) { 
      btn.addEventListener("click", () => {
        // window.location.href = "../../../Guest User/Pages/Courses/Pages/courses.html"
        window.location.href = "../../../../Src/Dashboards/Student/Pages/Default.html"
      })
    }
}


// // add hovered class to selected list item
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
