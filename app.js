"use strict";
const MANAGEX={version:"1.0.0",storageKey:"managex_business",configVersion:"1.0.0"};
const BUSINESS_CONFIG={
"general-store":{name:"General Store",catalog:["Groceries","Household Items","Personal Care"],features:{delivery:true,advance:true,notes:true,measurements:false,gst:true}},
"supermarket":{name:"Supermarket",catalog:["Groceries","Beverages","Household Items","Personal Care"],features:{delivery:true,advance:true,notes:true,measurements:false,gst:true}},
"clothing-fashion":{name:"Clothing & Fashion",catalog:["Shirt","Pant","T-Shirt","Jeans","Dress"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"footwear":{name:"Footwear",catalog:["Shoes","Sandals","Slippers","Sports Shoes"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"electronics":{name:"Electronics",catalog:["Mobile","Television","Speaker","Accessories"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"mobile-accessories":{name:"Mobile & Accessories",catalog:["Mobile","Charger","Earphones","Cover","Screen Guard"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"hardware":{name:"Hardware",catalog:["Tools","Fasteners","Pipes","Electrical Items"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"furniture":{name:"Furniture",catalog:["Chair","Table","Sofa","Bed","Cupboard"],features:{delivery:true,advance:true,notes:true,measurements:true,gst:true}},
"stationery":{name:"Stationery",catalog:["Notebook","Pen","Printing","School Supplies"],features:{delivery:false,advance:false,notes:true,measurements:false,gst:true}},
"jewellery":{name:"Jewellery",catalog:["Ring","Necklace","Bracelet","Earrings"],features:{delivery:false,advance:true,notes:true,measurements:true,gst:true}},
"restaurant":{name:"Restaurant",catalog:["Pizza","Burger","Sandwich","Rice","Beverage"],features:{delivery:true,advance:false,notes:true,measurements:false,gst:true}},
"cafe":{name:"Café",catalog:["Coffee","Tea","Sandwich","Pastry","Beverage"],features:{delivery:true,advance:false,notes:true,measurements:false,gst:true}},
"bakery":{name:"Bakery",catalog:["Cake","Bread","Pastry","Cookies"],features:{delivery:true,advance:true,notes:true,measurements:false,gst:true}},
"fast-food":{name:"Fast Food",catalog:["Burger","Pizza","Fries","Sandwich","Beverage"],features:{delivery:true,advance:false,notes:true,measurements:false,gst:true}},
"catering-tiffin":{name:"Catering / Tiffin",catalog:["Tiffin","Catering Package","Meal","Event Catering"],features:{delivery:true,advance:true,notes:true,measurements:false,gst:true}},
"sweet-shop":{name:"Sweet Shop",catalog:["Ladoo","Barfi","Pedha","Jalebi","Gift Box"],features:{delivery:true,advance:true,notes:true,measurements:false,gst:true}},
"salon-barber":{name:"Salon / Barber",catalog:["Haircut","Beard","Hair Colour","Facial","Hair Spa"],features:{delivery:false,advance:false,notes:true,measurements:false,gst:true}},
"beauty-parlour":{name:"Beauty Parlour",catalog:["Facial","Makeup","Hair Styling","Manicure","Pedicure"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"spa":{name:"Spa",catalog:["Massage","Therapy","Body Spa","Facial"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"fitness-gym":{name:"Fitness / Gym",catalog:["Monthly Membership","Personal Training","Annual Membership","Consultation"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"tailoring-boutique":{name:"Tailoring / Boutique",catalog:["Shirt","Pant","Kurta","Uniform","Alteration"],features:{delivery:true,advance:true,notes:true,measurements:true,gst:true}},
"laundry":{name:"Laundry",catalog:["Wash","Dry Clean","Ironing","Express Laundry"],features:{delivery:true,advance:false,notes:true,measurements:false,gst:true}},
"mobile-repair":{name:"Mobile Repair",catalog:["Screen Repair","Battery Replacement","Software Service","Charging Port"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"computer-service":{name:"Computer Service",catalog:["Laptop Repair","Desktop Repair","Software Installation","Upgrade"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"electronics-repair":{name:"Electronics Repair",catalog:["TV Repair","Speaker Repair","PCB Repair","Appliance Repair"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"automobile-garage":{name:"Automobile / Garage",catalog:["Service","Oil Change","Brake Service","Repair"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"ac-appliance-service":{name:"AC / Appliance Service",catalog:["AC Service","AC Repair","Washing Machine","Refrigerator"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"home-services":{name:"Home Services",catalog:["Cleaning","Plumbing","Electrical","Pest Control"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"printing-xerox":{name:"Printing / Xerox",catalog:["Xerox","Color Print","Photo Print","Binding"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"photography":{name:"Photography",catalog:["Photo Session","Wedding Photography","Video Shoot","Album"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"graphic-design":{name:"Graphic Design",catalog:["Logo Design","Poster","Social Media Design","Branding"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"digital-marketing":{name:"Digital Marketing",catalog:["Social Media Management","SEO","Advertising","Content Creation"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"consultancy":{name:"Consultancy",catalog:["Consultation","Professional Service","Project","Advisory"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"tuition-coaching":{name:"Tuition / Coaching",catalog:["Monthly Tuition","Course","Test Series","Personal Coaching"],features:{delivery:false,advance:true,notes:true,measurements:false,gst:true}},
"manufacturing":{name:"Manufacturing",catalog:["Product","Custom Order","Bulk Order","Production Job"],features:{delivery:true,advance:true,notes:true,measurements:true,gst:true}},
"fabrication-welding":{name:"Fabrication / Welding",catalog:["Gate","Grill","Railing","Custom Fabrication"],features:{delivery:true,advance:true,notes:true,measurements:true,gst:true}},
"machine-workshop":{name:"Machine Workshop",catalog:["Machining","Turning","Milling","Custom Job"],features:{delivery:false,advance:true,notes:true,measurements:true,gst:true}},
"other":{name:"Other Business",catalog:["Product / Service"],features:{delivery:true,advance:true,notes:true,measurements:false,gst:true}}
};
const state={businessType:"",businessConfig:null};
function $(id){return document.getElementById(id);}
function $$(selector){return document.querySelectorAll(selector);}
function saveBusiness(data){localStorage.setItem(MANAGEX.storageKey,JSON.stringify(data));}
function getBusiness(){try{return JSON.parse(localStorage.getItem(MANAGEX.storageKey))||null;}catch(e){return null;}}
function getBusinessConfig(type){return BUSINESS_CONFIG[type]||BUSINESS_CONFIG.other;}
function applyBusinessConfiguration(){
const business=getBusiness();
if(!business||!business.businessType)return;
state.businessType=business.businessType;
state.businessConfig=getBusinessConfig(business.businessType);
business.configVersion=MANAGEX.configVersion;
business.businessDisplayName=state.businessConfig.name;
business.defaultFeatures=state.businessConfig.features;
saveBusiness(business);
}
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
state.businessConfig=getBusinessConfig(state.businessType);
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
business.businessDisplayName=getBusinessConfig(state.businessType).name;
business.defaultFeatures=getBusinessConfig(state.businessType).features;
business.updatedAt=new Date().toISOString();
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
business.businessDisplayName=getBusinessConfig(business.businessType).name;
business.defaultFeatures=getBusinessConfig(business.businessType).features;
business.businessName=businessName;
business.ownerName=ownerName;
business.phoneNumber=phone;
business.whatsappNumber=whatsapp||phone;
business.businessAddress=address;
business.gstin=gstin;
business.tagline=tagline;
business.createdAt=business.createdAt||new Date().toISOString();
business.updatedAt=new Date().toISOString();
business.configVersion=MANAGEX.configVersion;
saveBusiness(business);
state.businessType=business.businessType;
state.businessConfig=getBusinessConfig(business.businessType);
openMainApp();
showToast("ManageX setup completed");
}
function loadBusiness(){
var business=getBusiness();
if(!business||!business.businessType){openSetup();return;}
state.businessType=business.businessType;
state.businessConfig=getBusinessConfig(business.businessType);
$$(".business-type-card").forEach(function(card){
if(card.getAttribute("data-business-type")===state.businessType)card.classList.add("selected");
});
if(business.businessName&&business.ownerName&&business.phoneNumber){
applyBusinessConfiguration();
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
