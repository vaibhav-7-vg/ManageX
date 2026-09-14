"use strict";

/* =========================================================
   MANAGEX — PHASE 2
   App Navigation & Basic Interactions
   ========================================================= */

/* ---------------------------------------------------------
   1. MANAGEX CORE
   --------------------------------------------------------- */

const MANAGEX = {
  name: "ManageX",
  version: "0.2.0",
  tagline: "Manage your business. Your way."
};


/* ---------------------------------------------------------
   2. DOM ELEMENTS
   --------------------------------------------------------- */

const navItems = document.querySelectorAll(".nav-item");
const pages = document.querySelectorAll(".app-page");


/* ---------------------------------------------------------
   3. PAGE NAVIGATION
   --------------------------------------------------------- */

function showPage(pageId) {

  // Hide all pages
  pages.forEach(function(page) {
    page.classList.remove("active-page");
  });

  // Show selected page
  const selectedPage = document.getElementById(pageId);

  if (selectedPage) {
    selectedPage.classList.add("active-page");
  }

  // Update bottom navigation
  navItems.forEach(function(item) {
    item.classList.remove("active");

    if (item.dataset.page === pageId) {
      item.classList.add("active");
    }
  });

  // Scroll to top
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ---------------------------------------------------------
   4. BOTTOM NAVIGATION EVENTS
   --------------------------------------------------------- */

navItems.forEach(function(item) {

  item.addEventListener("click", function() {

    const pageId = item.dataset.page;

    if (pageId) {
      showPage(pageId);
    }

  });

});


/* ---------------------------------------------------------
   5. VIEW ORDERS BUTTON
   --------------------------------------------------------- */

const viewOrdersBtn = document.getElementById("viewOrdersBtn");

if (viewOrdersBtn) {

  viewOrdersBtn.addEventListener("click", function() {
    showPage("ordersPage");
  });

}


/* ---------------------------------------------------------
   6. NEW ORDER BUTTONS
   --------------------------------------------------------- */

const newOrderButtons = document.querySelectorAll(
  '[data-action="new-order"]'
);

newOrderButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    showToast(
      "New Order module will be added in the next phase."
    );

  });

});


/* ---------------------------------------------------------
   7. ADD PRODUCT BUTTON
   --------------------------------------------------------- */

const addProductButtons = document.querySelectorAll(
  '[data-action="add-product"]'
);

addProductButtons.forEach(function(button) {

  button.addEventListener("click", function() {

    showToast(
      "Products & Services module is coming next."
    );

  });

});


/* ---------------------------------------------------------
   8. NOTIFICATION BUTTON
   --------------------------------------------------------- */

const notificationBtn = document.querySelector(
  '[data-action="notifications"]'
);

if (notificationBtn) {

  notificationBtn.addEventListener("click", function() {

    showToast("No new notifications.");

  });

}


/* ---------------------------------------------------------
   9. TOAST MESSAGE
   --------------------------------------------------------- */

function showToast(message) {

  // Remove existing toast
  const oldToast = document.querySelector(".managex-toast");

  if (oldToast) {
    oldToast.remove();
  }

  // Create toast
  const toast = document.createElement("div");

  toast.className = "managex-toast";
  toast.textContent = message;

  // Toast styling
  toast.style.position = "fixed";
  toast.style.left = "50%";
  toast.style.bottom = "90px";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#17172A";
  toast.style.color = "#FFFFFF";
  toast.style.padding = "12px 18px";
  toast.style.borderRadius = "12px";
  toast.style.fontSize = "14px";
  toast.style.fontWeight = "600";
  toast.style.zIndex = "9999";
  toast.style.boxShadow =
    "0 8px 28px rgba(34, 27, 100, 0.18)";
  toast.style.maxWidth = "85%";
  toast.style.textAlign = "center";

  document.body.appendChild(toast);

  // Automatically remove
  setTimeout(function() {

    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.25s ease";

    setTimeout(function() {
      toast.remove();
    }, 250);

  }, 2200);

}


/* ---------------------------------------------------------
   10. INITIAL PAGE
   --------------------------------------------------------- */

showPage("homePage");


/* ---------------------------------------------------------
   11. PROJECT MAP
   ---------------------------------------------------------

   PHASE 2
   ├── Core configuration
   ├── Page navigation
   ├── Orders navigation
   ├── New Order placeholder
   ├── Product placeholder
   ├── Notifications
   └── Toast system

FUTURE MODULES
   ├── Business Setup
   ├── Business Configuration
   ├── Products & Services
   ├── Customers
   ├── Orders
   ├── Dashboard calculations
   ├── Bill Generator
   ├── WhatsApp / Sharing
   ├── Settings
   ├── Subscription
   ├── Razorpay
   └── PWA
   --------------------------------------------------------- */

console.log(
  `${MANAGEX.name} v${MANAGEX.version} loaded successfully.`
);
