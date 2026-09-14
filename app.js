"use strict";
const MANAGEX={version:"1.0.0",storageKey:"managex_business"};
const state={businessType:null};
const $=s=>document.querySelector(s);
const $$=s=>document.querySelectorAll(s);
function saveBusiness(data){localStorage.setItem(MANAGEX.storageKey,JSON.stringify(data))}
function getBusiness(){try{return JSON.parse(localStorage.getItem(MANAGEX.storageKey))||null}catch(e){return null}}
function showPage(pageId){
  $$(".app-page").forEach(p=>p.classList.remove("active"));
  $$(".nav-item").forEach(n=>n.classList.remove("active"));
  const page=$("#"+pageId);
  const nav=document.querySelector('.nav-item[data-page="'+pageId+'"]');
  if(page)page.classList.add("active");
  if(nav)nav.classList.add("active");
  window.scrollTo({top:0,behavior:"smooth"});
}
function showToast(message){
  let t=$("#managexToast");
  if(!t){
    t=document.createElement("div");
    t.id="managexToast";
    t.className="managex-toast";
    document.body.appendChild(t);
  }
  t.textContent=message;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer=setTimeout(()=>t.classList.remove("show"),2200);
}
function selectBusinessType(button){
  $$("#businessTypeGrid .business-type-card").forEach(b=>b.classList.remove("selected"));
  button.classList.add("selected");
  state.businessType=button.dataset.businessType||"";
  const error=$("#businessTypeError");
  if(error)error.textContent="";
}
function openMainApp(){
  const setup=$("#setupPage");
  const main=$("#mainApp");
  if(setup)setup.style.display="none";
  if(main)main.style.display="";
  showPage("homePage");
}
function openSetup(){
  const setup=$("#setupPage");
  const main=$("#mainApp");
  if(setup)setup.style.display="";
  if(main)main.style.display="none";
}
function continueSetup(){
  if(!state.businessType){
    const error=$("#businessTypeError");
    if(error)error.textContent="Please select your business type.";
    showToast("Select a business type first");
    return;
  }
  const business=getBusiness()||{};
  business.businessType=state.businessType;
  business.updatedAt=new Date().toISOString();
  saveBusiness(business);
  openMainApp();
  showToast("Business type saved");
}
function loadBusiness(){
  const business=getBusiness();
  if(!business||!business.businessType){
    openSetup();
    return;
  }
  state.businessType=business.businessType;
  const selected=document.querySelector('#businessTypeGrid .business-type-card[data-business-type="'+CSS.escape(business.businessType)+'"]');
  if(selected)selected.classList.add("selected");
  openMainApp();
}
function initBusinessType(){
  const grid=$("#businessTypeGrid");
  if(!grid)return;
  grid.addEventListener("click",e=>{
    const button=e.target.closest(".business-type-card");
    if(button)selectBusinessType(button);
  });
  const continueBtn=$("#continueSetupBtn");
  if(continueBtn)continueBtn.addEventListener("click",continueSetup);
}
function initNavigation(){
  $$(".nav-item").forEach(item=>{
    item.addEventListener("click",()=>{
      const page=item.dataset.page;
      if(page)showPage(page);
    });
  });
  const viewOrders=$("#viewOrdersBtn");
  if(viewOrders)viewOrders.addEventListener("click",()=>showPage("ordersPage"));
  $$("#newOrderBtn,[data-action='new-order']").forEach(btn=>btn.addEventListener("click",()=>showToast("New Order module coming next")));
  $$("#addProductBtn,[data-action='add-product']").forEach(btn=>btn.addEventListener("click",()=>showToast("Product & Service setup coming next")));
  const notification=$("#notificationBtn");
  if(notification)notification.addEventListener("click",()=>showToast("No new notifications"));
}
function init(){
  initBusinessType();
  initNavigation();
  loadBusiness();
}
document.addEventListener("DOMContentLoaded",init);
