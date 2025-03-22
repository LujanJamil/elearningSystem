// Update plaform date, Logout user 
( () =>{
    const date = new Date();
    currentDate = date.getFullYear();
    document.getElementById("currentDate").innerText = currentDate;
    const _LogoutBtn = document.getElementById("logoutBtn");
      _LogoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        // alert("You have been logged out.");
       window.location.href = "../../../../Public/User/login.html"
      })
  })();
