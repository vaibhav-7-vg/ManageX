"use strict";

/* =========================================================
   MANAGEX
   PHASE 3B — BUSINESS SETUP + DATA FOUNDATION
   ========================================================= */


/* =========================================================
   1. MANAGEX CORE
   ========================================================= */

const MANAGEX = {
  name: "ManageX",
  version: "0.3.0",
  tagline: "Manage your business. Your way."
};


/* =========================================================
   2. BUSINESS CONFIGURATION ENGINE
   ========================================================= */

const BUSINESS_CONFIG = {

  "general-store": {
    name: "General Store",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "supermarket": {
    name: "Supermarket",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "clothing": {
    name: "Clothing & Fashion",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "footwear": {
    name: "Footwear",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "electronics": {
    name: "Electronics",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "mobile": {
    name: "Mobile & Accessories",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "hardware": {
    name: "Hardware",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "furniture": {
    name: "Furniture",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "stationery": {
    name: "Stationery",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "jewellery": {
    name: "Jewellery",
    category: "Retail",
    defaultProductLabel: "Products"
  },

  "restaurant": {
    name: "Restaurant",
    category: "Food & Hospitality",
    defaultProductLabel: "Menu Items"
  },

  "cafe": {
    name: "Café",
    category: "Food & Hospitality",
    defaultProductLabel: "Menu Items"
  },

  "bakery": {
    name: "Bakery",
    category: "Food & Hospitality",
    defaultProductLabel: "Products"
  },

  "fast-food": {
    name: "Fast Food",
    category: "Food & Hospitality",
    defaultProductLabel: "Menu Items"
  },

  "catering": {
    name: "Catering / Tiffin",
    category: "Food & Hospitality",
    defaultProductLabel: "Food Items"
  },

  "sweet-shop": {
    name: "Sweet Shop",
    category: "Food & Hospitality",
    defaultProductLabel: "Products"
  },

  "salon": {
    name: "Salon / Barber",
    category: "Personal & Lifestyle",
    defaultProductLabel: "Services"
  },

  "beauty": {
    name: "Beauty Parlour",
    category: "Personal & Lifestyle",
    defaultProductLabel: "Services"
  },

  "spa": {
    name: "Spa",
    category: "Personal & Lifestyle",
    defaultProductLabel: "Services"
  },

  "gym": {
    name: "Fitness / Gym",
    category: "Personal & Lifestyle",
    defaultProductLabel: "Services"
  },

  "tailoring": {
    name: "Tailoring / Boutique",
    category: "Personal & Lifestyle",
    defaultProductLabel: "Services"
  },

  "laundry": {
    name: "Laundry",
    category: "Personal & Lifestyle",
    defaultProductLabel: "Services"
  },

  "mobile-repair": {
    name: "Mobile Repair",
    category: "Repair & Service",
    defaultProductLabel: "Services"
  },

  "computer": {
    name: "Computer Service",
    category: "Repair & Service",
    defaultProductLabel: "Services"
  },

  "electronics-repair": {
    name: "Electronics Repair",
    category: "Repair & Service",
    defaultProductLabel: "Services"
  },

  "automobile": {
    name: "Automobile / Garage",
    category: "Repair & Service",
    defaultProductLabel: "Services"
  },

  "ac-service": {
    name: "AC / Appliance Service",
    category: "Repair & Service",
    defaultProductLabel: "Services"
  },

  "home-service": {
    name: "Home Services",
    category: "Repair & Service",
    defaultProductLabel: "Services"
  },

  "printing": {
    name: "Printing / Xerox",
    category: "Professional & Creative",
    defaultProductLabel: "Services"
  },

  "photography": {
    name: "Photography",
    category: "Professional & Creative",
    defaultProductLabel: "Services"
  },

  "design": {
    name: "Graphic Design",
    category: "Professional & Creative",
    defaultProductLabel: "Services"
  },

  "digital-marketing": {
    name: "Digital Marketing",
    category: "Professional & Creative",
    defaultProductLabel: "Services"
  },

  "consultancy": {
    name: "Consultancy",
    category: "Professional & Creative",
    defaultProductLabel: "Services"
  },

  "tuition": {
    name: "Tuition / Coaching",
    category: "Professional & Creative",
    defaultProductLabel: "Courses / Services"
  },

  "manufacturing": {
    name: "Manufacturing",
    category: "Manufacturing & Workshop",
    defaultProductLabel: "Products"
  },

  "fabrication": {
    name: "Fabrication / Welding",
    category: "Manufacturing & Workshop",
    defaultProductLabel: "Services"
  },

  "machine-workshop": {
    name: "Machine Workshop",
    category: "Manufacturing & Workshop",
    defaultProductLabel: "Services"
  },

  "other": {
    name: "Other Business",
    category: "Other",
    defaultProductLabel: "Products / Services"
  }

};


/* =========================================================
   3. CENTRAL DATA LAYER
   ========================================================= */

const ManageXDB = {

  keys: {
    business: "managex_business",
    products: "managex_products",
    customers: "managex_customers",
    orders: "managex_orders",
    settings: "managex_settings"
  },


  saveBusiness: function(data) {

    localStorage.setItem(
      this.keys.business,
      JSON.stringify(data)
    );

  },


  getBusiness: function() {

    const data = localStorage.getItem(
      this.keys.business
    );

    if (!data) {
      return null;
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      console.error(
        "ManageX business data error:",
        error
      );

      return null;
    }

  },


  saveProducts: function(products) {

    localStorage.setItem(
      this.keys.products,
      JSON.stringify(products)
    );

  },


  getProducts: function() {

    const data = localStorage.getItem(
      this.keys.products
    );

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return [];
    }

  },


  saveCustomers: function(customers) {

    localStorage.setItem(
      this.keys.customers,
      JSON.stringify(customers)
    );

  },


  getCustomers: function() {

    const data = localStorage.getItem(
      this.keys.customers
    );

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return [];
    }

  },


  saveOrders: function(orders) {

    localStorage.setItem(
      this.keys.orders,
      JSON.stringify(orders)
    );

  },


  getOrders: function() {

    const data = localStorage.getItem(
      this.keys.orders
    );

    if (!data) {
      return [];
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return [];
    }

  },


  saveSettings: function(settings) {

    localStorage.setItem(
      this.keys.settings,
      JSON.stringify(settings)
    );

  },


  getSettings: function() {

    const data = localStorage.getItem(
      this.keys.settings
    );

    if (!data) {
      return {};
    }

    try {
      return JSON.parse(data);
    } catch (error) {
      return {};
    }

  }

};


/* =========================================================
   4. SETUP ELEMENTS
   ========================================================= */

const setupPage =
  document.getElementById("setupPage");

const mainApp =
  document.getElementById("mainApp");

const businessTypeCards =
  document.querySelectorAll(".business-type-card");

const continueBusinessBtn =
  document.getElementById("continueBusinessBtn");

const businessTypeError =
  document.getElementById("businessTypeError");


let selectedBusinessType = null;


/* =========================================================
   5. BUSINESS TYPE SELECTION
   ========================================================= */

businessTypeCards.forEach(function(card) {

  card.addEventListener("click", function() {

    // Remove previous selection
    businessTypeCards.forEach(function(item) {
      item.classList.remove("selected");
    });


    // Select current card
    card.classList.add("selected");


    // Store selected type
    selectedBusinessType =
      card.dataset.businessType;


    // Clear error
    if (businessTypeError) {
      businessTypeError.textContent = "";
    }

  });

});


/* =========================================================
   6. CONTINUE BUSINESS SETUP
   ========================================================= */

if (continueBusinessBtn) {

  continueBusinessBtn.addEventListener(
    "click",
    function() {

      if (!selectedBusinessType) {

        if (businessTypeError) {
          businessTypeError.textContent =
            "Please select your business type.";
        }

        showToast(
          "Please select a business type."
        );

        return;
      }


      const config =
        BUSINESS_CONFIG[selectedBusinessType];


      if (!config) {

        showToast(
          "Something went wrong. Please try again."
        );

        return;
      }


      /*
       * Create initial business profile.
       *
       * More details will be added in
       * Phase 3C / Business Details.
       */

      const businessData = {

        id:
          "business_" +
          Date.now(),

        businessType:
          selectedBusinessType,

        businessTypeName:
          config.name,

        category:
          config.category,

        defaultProductLabel:
          config.defaultProductLabel,

        businessName: "",
        ownerName: "",
        phone: "",
        whatsapp: "",
        address: "",
        gstin: "",
        tagline: "",
        logo: "",

        createdAt:
          new Date().toISOString(),

        updatedAt:
          new Date().toISOString()

      };


      ManageXDB.saveBusiness(
        businessData
      );


      showMainApp();

    }
  );

}


/* =========================================================
   7. SHOW MAIN APPLICATION
   ========================================================= */

function showMainApp() {

  if (setupPage) {
    setupPage.style.display = "none";
  }

  if (mainApp) {
    mainApp.style.display = "block";
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  /*
   * Phase 3C will replace this temporary
   * setup completion message with the
   * Business Details screen.
   */

  showToast(
    "Business type saved successfully."
  );

}


/* =========================================================
   8. SHOW SETUP SCREEN
   ========================================================= */

function showSetupPage() {

  if (setupPage) {
    setupPage.style.display = "block";
  }

  if (mainApp) {
    mainApp.style.display = "none";
  }

}


/* =========================================================
   9. PAGE NAVIGATION
   ========================================================= */

const navItems =
  document.querySelectorAll(".nav-item");

const pages =
  document.querySelectorAll(".app-page");


function showPage(pageId) {

  pages.forEach(function(page) {

    page.classList.remove(
      "active-page"
    );

  });


  const selectedPage =
    document.getElementById(pageId);


  if (selectedPage) {

    selectedPage.classList.add(
      "active-page"
    );

  }


  navItems.forEach(function(item) {

    item.classList.remove("active");


    if (
      item.dataset.page === pageId
    ) {

      item.classList.add("active");

    }

  });


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


navItems.forEach(function(item) {

  item.addEventListener(
    "click",
    function() {

      const pageId =
        item.dataset.page;

      if (pageId) {
        showPage(pageId);
      }

    }
  );

});


/* =========================================================
   10. VIEW ORDERS
   ========================================================= */

const viewOrdersBtn =
  document.getElementById(
    "viewOrdersBtn"
  );


if (viewOrdersBtn) {

  viewOrdersBtn.addEventListener(
    "click",
    function() {

      showPage("ordersPage");

    }
  );

}


/* =========================================================
   11. NEW ORDER BUTTONS
   ========================================================= */

const newOrderButtons =
  document.querySelectorAll(
    '[data-action="new-order"]'
  );


newOrderButtons.forEach(function(button) {

  button.addEventListener(
    "click",
    function() {

      showToast(
        "New Order module will be added next."
      );

    }
  );

});


/* =========================================================
   12. ADD PRODUCT BUTTONS
   ========================================================= */

const addProductButtons =
  document.querySelectorAll(
    '[data-action="add-product"]'
  );


addProductButtons.forEach(function(button) {

  button.addEventListener(
    "click",
    function() {

      showToast(
        "Products & Services module will be added next."
      );

    }
  );

});


/* =========================================================
   13. NOTIFICATIONS
   ========================================================= */

const notificationBtn =
  document.querySelector(
    '[data-action="notifications"]'
  );


if (notificationBtn) {

  notificationBtn.addEventListener(
    "click",
    function() {

      showToast(
        "No new notifications."
      );

    }
  );

}


/* =========================================================
   14. TOAST SYSTEM
   ========================================================= */

function showToast(message) {

  const oldToast =
    document.querySelector(
      ".managex-toast"
    );


  if (oldToast) {
    oldToast.remove();
  }


  const toast =
    document.createElement("div");


  toast.className =
    "managex-toast";


  toast.textContent =
    message;


  toast.style.position =
    "fixed";

  toast.style.left =
    "50%";

  toast.style.bottom =
    "90px";

  toast.style.transform =
    "translateX(-50%)";

  toast.style.background =
    "#17172A";

  toast.style.color =
    "#FFFFFF";

  toast.style.padding =
    "12px 18px";

  toast.style.borderRadius =
    "12px";

  toast.style.fontSize =
    "14px";

  toast.style.fontWeight =
    "600";

  toast.style.zIndex =
    "9999";

  toast.style.boxShadow =
    "0 8px 28px rgba(34, 27, 100, 0.18)";

  toast.style.maxWidth =
    "85%";

  toast.style.textAlign =
    "center";


  document.body.appendChild(
    toast
  );


  setTimeout(function() {

    toast.style.opacity =
      "0";

    toast.style.transition =
      "opacity 0.25s ease";


    setTimeout(function() {

      toast.remove();

    }, 250);

  }, 2200);

}


/* =========================================================
   15. APPLICATION STARTUP
   ========================================================= */

function initializeManageX() {

  const existingBusiness =
    ManageXDB.getBusiness();


  /*
   * IMPORTANT:
   *
   * For now, every fresh user sees
   * the business setup screen.
   *
   * Existing setup is restored after
   * refreshing/reopening the app.
   */

  if (existingBusiness) {

    showMainApp();

  } else {

    showSetupPage();

  }


  console.log(
    `${MANAGEX.name} v${MANAGEX.version} initialized.`
  );

  console.log(
    "Business database:",
    ManageXDB.getBusiness()
  );

}


/* =========================================================
   16. START MANAGEX
   ========================================================= */

initializeManageX();


/* =========================================================
   PROJECT MAP — PHASE 3
   =========================================================

   1.  MANAGEX CORE
   2.  BUSINESS CONFIGURATION
   3.  CENTRAL DATA LAYER
   4.  SETUP ELEMENTS
   5.  BUSINESS TYPE SELECTION
   6.  SETUP SAVE
   7.  MAIN APP
   8.  PAGE NAVIGATION
   9.  EXISTING BUTTONS
   10. TOAST SYSTEM
   11. APPLICATION STARTUP


   FUTURE MODULES
   ├── Business Details
   ├── Business Profile
   ├── Products & Services
   ├── Customers
   ├── Orders
   ├── Dashboard Calculations
   ├── Professional Bills
   ├── PDF Generation
   ├── WhatsApp Sharing
   ├── Settings
   ├── Subscription
   ├── Razorpay
   ├── PWA
   └── Final Testing

   ========================================================= */
