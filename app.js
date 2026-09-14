/* =====================================================
   MANAGEX
   APPLICATION CORE
   PHASE 1 — FOUNDATION
   ================================================= */

"use strict";


/* =====================================================
   01. MANAGEX PRODUCT CONSTANTS
   ===================================================== */

const MANAGEX = {

  name: "ManageX",

  tagline:
    "Manage your business. Your way.",

  version:
    "0.1.0-foundation"

};


/* =====================================================
   02. DOM REFERENCES
   ===================================================== */

const startBtn =
  document.getElementById("startBtn");


/* =====================================================
   03. FOUNDATION TEST
   -----------------------------------------------------
   This temporary action proves that JavaScript is
   connected correctly.

   It will be replaced by the real onboarding system
   during Phase 2.
   ===================================================== */

if (startBtn) {

  startBtn.addEventListener(
    "click",
    function () {

      alert(
        "ManageX foundation is working."
      );

    }
  );

}


/* =====================================================
   04. PERMANENT PROJECT MODULE MAP

   01. Data Layer
   02. Business Configuration
   03. Business Setup / Onboarding
   04. Dashboard
   05. Products & Services
   06. Customers
   07. Orders
   08. Bill Generator
   09. WhatsApp / Sharing
   10. Subscription System
   11. Settings
   12. PWA
   ===================================================== */


/* =====================================================
   END OF PHASE 1 FOUNDATION
   ===================================================== */
