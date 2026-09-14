"use strict";
const MANAGEX={version:"1.0.0",storageKey:"managex_business"};
const state={businessType:""};
function $(id){return document.getElementById(id);}
function $$(selector){return document.querySelectorAll(selector);}
function saveBusiness(data){localStorage.setItem(MANAGEX.storageKey,JSON.stringify(data));}
function getBusiness(){try{return JSON.parse(localStorage.getItem(MANAGEX.storageKey))||null;}catch(e){return null;}}
function showToast(message){
let toast=$("managexToast");
if(!toast){toast=document.createElement("div");toast.id="managexToast";toast.className="managex-toast";document.body.appendChild(toast);}
toast.textContent=message;
toast.classList.add("show");
clearTimeout(toast._timer);
toast._timer=setTimeout(function(){toast.classList.remove("show");},2200);
}
function showPage(pageId){
$$(".app-page").forEach(function(page){page.classList.remove("active-page");page.style.display="none";});
$$(".nav-item").forEach(function(item){item.classList.remove("active");});
var page=$(pageId);
if(page){page.classList.add("active-page");page.style.display="block";}
$$(".nav-item").forEach(function(item){if(item.getAttribute("data-page")===pageId)item.classList.add("active");});
window.scrollTo(0,0);
}
function openMainApp(){
var setup=$("setupPage"),main=$("mainApp");
if(setup)setup.style.display="none";
if(main)main.style.display="block";
showPage("homePage");
loadBusinessIntoDashboard();
}
function openSetup(){
var setup=$("setupPage"),main=$("mainApp");
if(setup)setup.style.display="block";
if(main)main.style.display="none";
}
function selectBusinessType(button){
$$(".business-type-card").forEach(function(card){card.classList.remove("selected");});
button.classList.add("selected");
state.businessType=button.getAttribute("data-business-type")||"";
var error=$("businessTypeError");
if(error)error.textContent="";
}
function openDetailsStep(){
if(!state.businessType){
var error=$("businessTypeError");
if(error)error.textContent="Please select your business type.";
showToast("Please select a business type");
return;
}
var business=getBusiness()||{};
business.businessType=state.businessType;
saveBusiness(business);
$("businessStep").style.display="none";
$("detailsStep").style.display="block";
$("progressBusiness").classList.remove("active");
$("progressBusiness").classList.add("completed");
$("progressDetails").classList.add("active");
loadProfileFields(business);
window.scrollTo(0,0);
}
function openBusinessStep(){
$("detailsStep").style.display="none";
$("businessStep").style.display="block";
$("progressDetails").classList.remove("active");
$("progressBusiness").classList.remove("completed");
$("progressBusiness").classList.add("active");
window.scrollTo(0,0);
}
function loadProfileFields(business){
$("businessName").value=business.businessName||"";
$("ownerName").value=business.ownerName||"";
$("phoneNumber").value=business.phoneNumber||"";
$("whatsappNumber").value=business.whatsappNumber||"";
$("businessAddress").value=business.businessAddress||"";
$("gstin").value=business.gstin||"";
$("tagline").value=business.tagline||"";
}
function cleanPhone(value){return String(value||"").replace(/\D/g,"");}
function finishSetup(){
var businessName=$("businessName").value.trim();
var ownerName=$("ownerName").value.trim();
var phone=cleanPhone($("phoneNumber").value);
var whatsapp=cleanPhone($("whatsappNumber").value);
var address=$("businessAddress").value.trim();
var gstin=$("gstin").value.trim().toUpperCase();
var tagline=$("tagline").value.trim();
var error=$("profileError");
if(error)error.textContent="";
if(!businessName){if(error)error.textContent="Please enter your business name.";showToast("Business name is required");$("businessName").focus();return;}
if(!ownerName){if(error)error.textContent="Please enter the owner's name.";showToast("Owner name is required");$("ownerName").focus();return;}
if(!/^[6-9]\d{9}$/.test(phone)){if(error)error.textContent="Please enter a valid 10-digit Indian mobile number.";showToast("Enter a valid phone number");$("phoneNumber").focus();return;}
if(whatsapp&&!/^[6-9]\d{9}$/.test(whatsapp)){if(error)error.textContent="Please enter a valid WhatsApp number.";showToast("Enter a valid WhatsApp number");$("whatsappNumber").focus();return;}
if(gstin&&!/^[0-9A-Z]{15}$/.test(gstin)){if(error)error.textContent="GSTIN must contain 15 characters.";showToast("Check your GSTIN");$("gstin").focus();return;}
var business=getBusiness()||{};
business.businessType=state.businessType||business.businessType||"other";
business.businessName=businessName;
business.ownerName=ownerName;
business.phoneNumber=phone;
business.whatsappNumber=whatsapp||phone;
business.businessAddress=address;
business.gstin=gstin;
business.tagline=tagline;
business.createdAt=business.createdAt||new Date().toISOString();
business.updatedAt=new Date().toISOString();
saveBusiness(business);
openMainApp();
showToast("ManageX setup completed");
}
function loadBusiness(){
var business=getBusiness();
if(!business||!business.businessType){openSetup();return;}
state.businessType=business.businessType;
$$(".business-type-card").forEach(function(card){
if(card.getAttribute("data-business-type")===state.businessType)card.classList.add("selected");
});
if(business.businessName&&business.ownerName&&business.phoneNumber){
openMainApp();
}else{
openSetup();
$("businessStep").style.display="none";
$("detailsStep").style.display="block";
$("progressBusiness").classList.remove("active");
$("progressBusiness").classList.add("completed");
$("progressDetails").classList.add("active");
loadProfileFields(business);
}
}
function loadBusinessIntoDashboard(){
var business=getBusiness();
var welcome=$("dashboardWelcome");
if(welcome&&business){
if(business.businessName)welcome.textContent="Welcome to "+business.businessName+". Manage your business from one place.";
}
}
function initBusinessSetup(){
var grid=$("businessTypeGrid");
if(grid){
grid.addEventListener("click",function(event){
var button=event.target.closest(".business-type-card");
if(button)selectBusinessType(button);
});
}
var continueButton=$("continueBusinessBtn");
if(continueButton)continueButton.addEventListener("click",openDetailsStep);
var backButton=$("backToBusinessBtn");
if(backButton)backButton.addEventListener("click",openBusinessStep);
var finishButton=$("finishSetupBtn");
if(finishButton)finishButton.addEventListener("click",finishSetup);
}
function initNavigation(){
$$(".nav-item").forEach(function(item){
item.addEventListener("click",function(){
var pageId=item.getAttribute("data-page");
if(pageId)showPage(pageId);
});
});
var viewOrders=$("viewOrdersBtn");
if(viewOrders)viewOrders.addEventListener("click",function(){showPage("ordersPage");});
$$("[data-action='new-order']").forEach(function(button){
button.addEventListener("click",function(){showToast("New Order module coming next");});
});
$$("[data-action='add-product']").forEach(function(button){
button.addEventListener("click",function(){showToast("Products & Services module coming next");});
});
var notification=$("notificationBtn");
if(notification)notification.addEventListener("click",function(){showToast("No new notifications");});
}
function initFilters(){
$$(".filter-chip").forEach(function(button){
button.addEventListener("click",function(){
$$(".filter-chip").forEach(function(chip){chip.classList.remove("active");});
button.classList.add("active");
});
});
}
function initSettings(){
$$(".settings-item").forEach(function(button){
button.addEventListener("click",function(){
var setting=button.getAttribute("data-setting");
var names={"business-profile":"Business Profile","products":"Products & Services","orders":"Order Settings","bills":"Bill Settings","appearance":"Appearance","subscription":"Subscription"};
showToast((names[setting]||"Settings")+" module coming next");
});
});
}
function init(){
initBusinessSetup();
initNavigation();
initFilters();
initSettings();
loadBusiness();
}
document.addEventListener("DOMContentLoaded",init);
