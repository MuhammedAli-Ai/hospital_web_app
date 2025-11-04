
      const menuBtn = document.getElementById("menuBtn");
      const mobileMenu = document.getElementById("mobileMenu");
      const logoutBtn = document.getElementById("logoutBtn");
      const logoutBtnMobile = document.getElementById("logoutBtnMobile");

      let isOpen = false;
      menuBtn.addEventListener("click", () => {
        isOpen = !isOpen;
        mobileMenu.style.maxHeight = isOpen ? "400px" : "0";
      });

      const logout = () => {
        alert("You have been logged out successfully!");
        window.location.href = "../index.html";

      };

      logoutBtn.addEventListener("click", logout);
      logoutBtnMobile.addEventListener("click", logout);
  
  
