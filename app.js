"use strict";
const MANAGEX={version:"1.0.0",storageKey:"managex_business"};
const state={businessType:""};
function $(id){return document.getElementById(id);}
function $$(selector){return document.querySelectorAll(selector);}
function saveBusiness(data){localStorage.setItem(MANAGEX.storageKey,JSON.stringify(data));}
function getBusiness(){try{return JSON.parse(localStorage.getItem(MANAGEX.storageKey))||null;}catch(e){return null;}}
function showToast(message){
let toast=$("managexToast");
if(!toast){
toast=document.createElement("div");
toast.id="managexToast";
toast.className="managex-toast";
document.body.appendChild(toast);
}
toast.textContent=message;
toast.classList.add("show");
clearTimeout(toast._timer);
toast._timer=setTimeout(function(){toast.classList.remove("show");},2200);
}
function showPage(pageId){
var pages=$$(".app-page");
var navItems=$$(".nav-item");
pages.forEach(function(page){
page.classList.remove("active-page");
page.style.display="none";
});
navItems.forEach(function(item){item.classList.remove("active");});
var page=$(pageId);
if(page){
page.classList.add("active-page");
page.style.display="block";
}
navItems.forEach(function(item){
if(item.getAttribute("data-page")===pageId)item.classList.add("active");
});
window.scrollTo(0,0);
}
function openMainApp(){
var setup=$("setupPage");
var main=$("mainApp");
if(setup)setup.style.display="none";
if(main)main.style.display="block";
showPage("homePage");
}
function openSetup(){
var setup=$("setupPage");
var main=$("mainApp");
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
function continueSetup(){
if(!state.businessType){
var error=$("businessTypeError");
if(error)error.textContent="Please select your business type.";
showToast("Please select a business type");
return;
}
var business=getBusiness()||{};
business.businessType=state.businessType;
business.updatedAt=new Date().toISOString();
saveBusiness(business);
openMainApp();
showToast("Business type saved");
}
function loadBusiness(){
var business=getBusiness();
if(!business||!business.businessType){
openSetup();
return;
}
state.businessType=business.businessType;
var cards=$$(".business-type-card");
cards.forEach(function(card){
if(card.getAttribute("data-business-type")===state.businessType){
card.classList.add("selected");
}
});
openMainApp();
}
function initBusinessSetup(){
var grid=$("businessTypeGrid");
if(grid){
grid.addEventListener("click",function(event){
var button=event.target.closest(".business-type-card");
if(button)selectBusinessType(button);
});
}
var continueButton=$("continueSetupBtn");
if(continueButton)continueButton.addEventListener("click",continueSetup);
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
function init(){
initBusinessSetup();
initNavigation();
initFilters();
loadBusiness();
}
document.addEventListener("DOMContentLoaded",init);
