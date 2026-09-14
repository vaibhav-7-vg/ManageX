"use strict";
const KEY="managex_data";
let state={type:"",items:[],bill:null,filter:"all",orderItems:[]};
const CFG={
"Tailoring":{desc:"Clothing, uniforms & alterations",items:["Shirt","Pant","Kurta","Uniform","Alteration"]},
"Salon":{desc:"Hair, beauty & grooming services",items:["Haircut","Hair Colour","Facial","Beard","Hair Spa"]},
"Restaurant":{desc:"Food, drinks & takeaway orders",items:["Pizza","Burger","Sandwich","Coffee","Dessert"]},
"Retail Shop":{desc:"Products, sales & customer orders",items:["Product 1","Product 2","Product 3"]},
"Electronics":{desc:"Electronics products & services",items:["Product","Repair","Installation","Accessory"]},
"Mobile Shop":{desc:"Mobiles, accessories & services",items:["Mobile Phone","Charger","Earphones","Screen Guard"]},
"Hardware":{desc:"Hardware products & customer sales",items:["Product 1","Product 2","Product 3"]},
"Automobile":{desc:"Vehicle service & parts",items:["Service","Oil Change","Part","Inspection"]},
"Repair Service":{desc:"Repairs, maintenance & service",items:["Repair","Maintenance","Service","Inspection"]},
"Printing":{desc:"Printing, design & document services",items:["Print","Photocopy","Design","Binding"]},
"Photography":{desc:"Photography & media services",items:["Photo Session","Video","Album","Editing"]},
"Fitness":{desc:"Fitness, training & personal services",items:["Training","Membership","Personal Session"]},
"Freelancer":{desc:"Professional freelance services",items:["Service","Project","Consultation"]},
"Other":{desc:"Customize ManageX for your business",items:["Product 1","Service 1","Product 2"]}
};
const $=id=>document.getElementById(id);
const money=n=>"₹"+Number(n||0).toLocaleString("en-IN",{maximumFractionDigits:2});
const uid=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,7);
function read(){try{return JSON.parse(localStorage.getItem(KEY)||"{}")}catch(e){return{}}}
function data(){let d=read();if(!d.orders)d.orders=[];if(!d.products)d.products=[];if(!d.settings)d.settings={deliveryDate:true,advancePayment:true,notes:true,billGst:true,billFooter:"Thank you for your business!"};return d}
function write(d){localStorage.setItem(KEY,JSON.stringify(d))}
function toast(msg){let t=$("mxToast");if(!t){t=document.createElement("div");t.id="mxToast";t.style.cssText="position:fixed;left:50%;bottom:82px;transform:translateX(-50%) translateY(20px);background:#17172A;color:#fff;padding:11px 16px;border-radius:11px;font-size:13px;font-weight:700;z-index:9999;opacity:0;transition:.25s;max-width:90%;text-align:center";document.body.appendChild(t)}t.textContent=msg;t.style.opacity="1";t.style.transform="translateX(-50%) translateY(0)";clearTimeout(t._tm);t._tm=setTimeout(()=>{t.style.opacity="0";t.style.transform="translateX(-50%) translateY(20px)"},2200)}
function setup(){
$("setupPage").style.display="block";$("mainApp").classList.add("hidden");
$("businessStep").classList.remove("hidden");$("detailsStep").classList.add("hidden");
$("progressBusiness").classList.add("active");$("progressDetails").classList.remove("active");
let grid=$("businessTypeGrid");grid.innerHTML="";
Object.entries(CFG).forEach(([name,c])=>{let b=document.createElement("button");b.type="button";b.className="business-type-card"+(state.type===name?" selected":"");b.innerHTML="<strong>"+name+"</strong><span>"+c.desc+"</span>";b.onclick=()=>{state.type=name;grid.querySelectorAll(".business-type-card").forEach(x=>x.classList.remove("selected"));b.classList.add("selected");$("businessTypeError").textContent=""};grid.appendChild(b)});
$("continueSetupBtn").onclick=openDetails;
$("backSetupBtn").onclick=backBusiness;
$("saveBusinessBtn").onclick=finish;
}
function openDetails(){
if(!state.type){$("businessTypeError").textContent="Please choose your business type.";return}
$("businessStep").classList.add("hidden");$("detailsStep").classList.remove("hidden");$("progressBusiness").classList.remove("active");$("progressDetails").classList.add("active");$("detailsError").textContent="";
}
function backBusiness(){setup()}
function loadFields(b){
$("businessName").value=b.name||"";$("ownerName").value=b.owner||"";$("businessPhone").value=b.phone||"";$("businessWhatsapp").value=b.whatsapp||"";$("businessAddress").value=b.address||"";$("businessGstin").value=b.gstin||"";$("businessTagline").value=b.tagline||"";
}
function finish(){
let name=$("businessName").value.trim(),phone=$("businessPhone").value.trim().replace(/\D/g,"");
if(!name){$("detailsError").textContent="Please enter your business name.";return}
if(phone.length!==10){$("detailsError").textContent="Please enter a valid 10-digit phone number.";return}
let d=data(),cfg=CFG[state.type]||CFG.Other;
d.business={name,owner:$("ownerName").value.trim(),phone,whatsapp:$("businessWhatsapp").value.trim().replace(/\D/g,"")||phone,address:$("businessAddress").value.trim(),gstin:$("businessGstin").value.trim().toUpperCase(),tagline:$("businessTagline").value.trim(),businessType:state.type};
if(!d.products.length)d.products=cfg.items.map((name,i)=>({id:uid(),name,category:"General",price:0}));
write(d);openApp();toast("ManageX is ready");
}
function openApp(){
$("setupPage").style.display="none";$("mainApp").classList.remove("hidden");loadBusiness();showPage("homePage");dashboard();products();customers();orders();
}
function loadBusiness(){
let b=data().business;if(!b)return setup();
state.type=b.businessType||"Other";
if($("headerBusinessName"))$("headerBusinessName").textContent=b.name||"ManageX";
if($("dashboardGreeting"))$("dashboardGreeting").textContent=b.tagline||b.businessType||"Business overview";
}
function showPage(id){
document.querySelectorAll(".app-page").forEach(p=>p.classList.remove("active"));
let p=$(id);if(p)p.classList.add("active");
document.querySelectorAll(".nav-item").forEach(n=>n.classList.toggle("active",n.dataset.page===id));
window.scrollTo({top:0,behavior:"smooth"});
if(id==="homePage")dashboard();
if(id==="ordersPage")orders();
if(id==="customersPage")customers();
if(id==="productsPage")products();
if(id==="settingsPage")settings();
}
function received(o){return Number(o.amountReceived??o.advance??0)}
function total(o){return Number(o.total||0)}
function pending(o){return Math.max(0,total(o)-received(o))}
function status(o){return pending(o)>0?"pending":"completed"}
function card(o){
let s=status(o),p=pending(o);
return `<div class="order-card"><div class="card-top"><div><div class="card-title">${esc(o.customerName||"Customer")}</div><div class="card-subtitle">Order #${esc(o.number||o.id)}</div></div><span class="status ${s}">${s==="pending"?"Pending":"Completed"}</span></div><div class="card-meta"><span class="meta-pill">${esc((o.items||[]).map(x=>x.name+" × "+x.qty).join(", "))}</span><span class="meta-pill">${money(o.total)}</span>${p>0?`<span class="meta-pill">Due ${money(p)}</span>`:""}</div><div class="card-actions"><button class="card-action primary" onclick="bill('${o.id}')">View Bill</button>${p>0?`<button class="card-action" onclick="collect('${o.id}')">Collect ${money(p)}</button>`:`<button class="card-action" onclick="whatsapp('${o.id}')">WhatsApp</button>`}<button class="card-action danger" onclick="deleteOrder('${o.id}')">Delete</button></div></div>`;
}
function dashboard(){
let d=data(),os=d.orders||[],sales=os.reduce((a,o)=>a+total(o),0),rec=os.reduce((a,o)=>a+received(o),0),pend=os.reduce((a,o)=>a+pending(o),0),done=os.filter(o=>status(o)==="completed").length,pct=sales?Math.min(100,Math.round(rec/sales*100)):0;
$("totalOrders").textContent=os.length;$("pendingOrders").textContent=os.filter(o=>status(o)==="pending").length;$("completedOrders").textContent=done;$("totalSales").textContent=money(sales);$("amountReceived").textContent=money(rec);$("amountPending").textContent=money(pend);$("paymentProgress").textContent=pct+"%";
let bar=$("paymentProgressBar");if(bar)bar.style.width=pct+"%";
$("recentOrdersList").innerHTML=os.length?os.slice().reverse().slice(0,5).map(card).join(""):`<div class="empty-state"><strong>No orders yet</strong>Create your first order to see it here.</div>`;
}
function orders(){
let d=data(),os=d.orders||[],f=state.filter;
if(f!=="all")os=os.filter(o=>status(o)===f);
$("ordersList").innerHTML=os.length?os.slice().reverse().map(card).join(""):`<div class="empty-state"><strong>No ${f==="all"?"":f+" "}orders</strong>Your orders will appear here.</div>`;
document.querySelectorAll(".filter-tab").forEach(b=>{b.classList.toggle("active",b.dataset.filter===state.filter);b.onclick=()=>{state.filter=b.dataset.filter;orders()}});
}
function customers(){
let d=data(),os=d.orders||[],map={};
os.forEach(o=>{let key=o.customerPhone||o.customerName||"unknown";if(!map[key])map[key]={name:o.customerName||"Customer",phone:o.customerPhone||"",orders:0,spending:0,pending:0,ids:[]};let c=map[key];c.orders++;c.spending+=total(o);c.pending+=pending(o);c.ids.push(o.id)});
let q=($("customerSearch").value||"").trim().toLowerCase();
let arr=Object.values(map).filter(c=>(c.name+" "+c.phone).toLowerCase().includes(q));
$("customersList").innerHTML=arr.length?arr.sort((a,b)=>b.spending-a.spending).map(c=>`<div class="customer-card"><div class="card-top"><div><div class="card-title">${esc(c.name)}</div><div class="card-subtitle">${esc(c.phone||"No phone")}</div></div><span class="meta-pill">${c.orders} order${c.orders===1?"":"s"}</span></div><div class="card-meta"><span class="meta-pill">Spent ${money(c.spending)}</span><span class="meta-pill">Pending ${money(c.pending)}</span></div><div class="card-actions"><button class="card-action primary" onclick='customerHistory(${JSON.stringify(c.ids)})'>Order History</button>${c.phone?`<button class="card-action" onclick="openCustomerWhatsApp('${esc(c.phone)}')">WhatsApp</button>`:""}</div></div>`).join(""):`<div class="empty-state"><strong>No customers yet</strong>Customers are created automatically from orders.</div>`;
}
function customerHistory(ids){
let d=data(),os=(d.orders||[]).filter(o=>ids.includes(o.id));
if(!os.length)return;
let html=`<div class="order-form-card"><div class="page-heading"><div><p class="eyebrow">Customer</p><h3>${esc(os[0].customerName)}</h3></div><button class="secondary-button" onclick="showPage('customersPage')">Close</button></div>`;
html+=os.slice().reverse().map(card).join("")+"</div>";
openTempPage("customerHistoryPage","Customer History",html);
}
function products(){
let d=data(),ps=d.products||[];
$("productsList").innerHTML=ps.length?ps.map(p=>`<div class="product-card"><div class="card-top"><div><div class="card-title">${esc(p.name)}</div><div class="card-subtitle">${esc(p.category||"General")}</div></div><strong>${money(p.price)}</strong></div><div class="card-actions"><button class="card-action primary" data-editp="${p.id}">Edit</button><button class="card-action danger" data-deletep="${p.id}">Delete</button></div></div>`).join(""):`<div class="empty-state"><strong>No products or services</strong>Add your first item to start taking orders.</div>`;
document.querySelectorAll("[data-editp]").forEach(b=>b.onclick=()=>editProduct(b.dataset.editp));
document.querySelectorAll("[data-deletep]").forEach(b=>b.onclick=()=>deleteProduct(b.dataset.deletep));
}
function addProduct(){
let name=prompt("Product or service name:");if(!name||!name.trim())return;
let price=prompt("Price:", "0");if(price===null)return;
let category=prompt("Category:", "General");if(category===null)return;
let d=data();d.products.push({id:uid(),name:name.trim(),category:category.trim()||"General",price:Number(price)||0});write(d);products();refreshSelect();toast("Product added");
}
function editProduct(id){
let d=data(),p=d.products.find(x=>x.id===id);if(!p)return;
let name=prompt("Product or service name:",p.name);if(name===null)return;
let price=prompt("Price:",p.price);if(price===null)return;
let category=prompt("Category:",p.category||"General");if(category===null)return;
p.name=name.trim()||p.name;p.price=Number(price)||0;p.category=category.trim()||"General";write(d);products();refreshSelect();toast("Product updated");
}
function deleteProduct(id){if(!confirm("Delete this product/service?"))return;let d=data();d.products=d.products.filter(p=>p.id!==id);write(d);products();refreshSelect();toast("Product deleted")}
function ensureOrderPage(){
if($("newOrderPage"))return;
let sec=document.createElement("section");sec.id="newOrderPage";sec.className="app-page";
sec.innerHTML=`<div class="page-heading"><div><p class="eyebrow">Sales</p><h2>New Order</h2></div><button id="cancelOrderBtn" class="secondary-button">Cancel</button></div><div class="order-form-card"><h3>Customer Details</h3><div class="form-grid"><label>Customer Name *<input id="orderCustomerName" class="form-control" placeholder="Customer name"></label><label>Phone / WhatsApp *<input id="orderCustomerPhone" class="form-control" inputmode="numeric" placeholder="10-digit mobile number"></label></div></div><div class="order-form-card"><h3>Products & Services</h3><div id="orderItemsList" class="order-items"></div><button id="addOrderItemBtn" class="add-item-button">+ Add Product / Service</button><div class="order-total-box"><div class="total-line"><span>Subtotal</span><b id="orderSubtotal">₹0</b></div><div class="total-line"><span>Advance / Received</span><b id="orderAdvancePreview">₹0</b></div><div class="total-line grand"><span>Balance Due</span><b id="orderBalancePreview">₹0</b></div></div></div><div class="order-form-card"><h3>Order Details</h3><div class="form-grid"><label>Delivery Date<input id="orderDeliveryDate" class="form-control" type="date"></label><label>Advance Payment<input id="orderAdvance" class="form-control" type="number" min="0" step="0.01" value="0" placeholder="0"></label><label class="full-width">Notes<textarea id="orderNotes" placeholder="Additional notes"></textarea></label></div><div id="orderError" class="error-message"></div><div class="form-buttons"><button id="saveOrderBtn" class="secondary-button">Save Order</button><button id="saveGenerateBtn" class="primary-button">Save & Generate Bill</button></div></div>`;
$("mainApp").querySelector(".main-content").appendChild(sec);
$("cancelOrderBtn").onclick=()=>showPage("homePage");$("addOrderItemBtn").onclick=addItem;$("orderAdvance").oninput=renderItems;$("saveOrderBtn").onclick=()=>saveOrder(false);$("saveGenerateBtn").onclick=()=>saveOrder(true);
}
function newOrder(){ensureOrderPage();state.orderItems=[];$("orderCustomerName").value="";$("orderCustomerPhone").value="";$("orderDeliveryDate").value="";$("orderAdvance").value="0";$("orderNotes").value="";$("orderError").textContent="";let d=data();if(d.products.length)state.orderItems=[{productId:d.products[0].id,name:d.products[0].name,qty:1,price:Number(d.products[0].price)||0}];else state.orderItems=[{productId:"",name:"",qty:1,price:0}];renderItems();showPage("newOrderPage")}
function refreshSelect(){if($("newOrderPage")&&$("newOrderPage").classList.contains("active"))renderItems()}
function addItem(){state.orderItems.push({productId:"",name:"",qty:1,price:0});renderItems()}
function renderItems(){
let d=data(),box=$("orderItemsList");if(!box)return;
box.innerHTML=state.orderItems.map((x,i)=>`<div class="order-item-row"><select data-i="${i}" class="order-product"><option value="">Select item</option>${d.products.map(p=>`<option value="${p.id}" ${p.id===x.productId?"selected":""}>${esc(p.name)}</option>`).join("")}</select><input data-q="${i}" type="number" min="1" value="${x.qty||1}"><input data-p="${i}" type="number" min="0" step=".01" value="${x.price||0}"><button class="remove-item" data-r="${i}">×</button></div>`).join("");
box.querySelectorAll(".order-product").forEach(s=>s.onchange=()=>{let i=+s.dataset.i,p=d.products.find(x=>x.id===s.value);if(p){state.orderItems[i].productId=p.id;state.orderItems[i].name=p.name;state.orderItems[i].price=Number(p.price)||0}renderItems()});
box.querySelectorAll("[data-q]").forEach(e=>e.oninput=()=>{state.orderItems[+e.dataset.q].qty=Math.max(1,Number(e.value)||1);updateOrderTotals()});
box.querySelectorAll("[data-p]").forEach(e=>e.oninput=()=>{state.orderItems[+e.dataset.p].price=Math.max(0,Number(e.value)||0);updateOrderTotals()});
box.querySelectorAll("[data-r]").forEach(e=>e.onclick=()=>{if(state.orderItems.length===1){toast("At least one item is required");return}state.orderItems.splice(+e.dataset.r,1);renderItems()});
updateOrderTotals();
}
function updateOrderTotals(){let sub=state.orderItems.reduce((a,x)=>a+(Number(x.qty)||0)*(Number(x.price)||0),0),adv=Math.max(0,Number($("orderAdvance")?.value)||0),actual=Math.min(adv,sub);$("orderSubtotal").textContent=money(sub);$("orderAdvancePreview").textContent=money(actual);$("orderBalancePreview").textContent=money(Math.max(0,sub-actual))}
function saveOrder(generate){
let name=$("orderCustomerName").value.trim(),phone=$("orderCustomerPhone").value.trim().replace(/\D/g,""),items=state.orderItems.filter(x=>x.name&&Number(x.qty)>0);
let sub=items.reduce((a,x)=>a+Number(x.qty)*Number(x.price),0),adv=Math.min(Math.max(0,Number($("orderAdvance").value)||0),sub);
if(!name){$("orderError").textContent="Please enter customer name.";return}
if(phone.length!==10){$("orderError").textContent="Please enter a valid 10-digit customer phone number.";return}
if(!items.length){$("orderError").textContent="Add at least one product or service.";return}
let d=data(),num="MX-"+new Date().getFullYear()+"-"+String((d.orders||[]).length+1).padStart(4,"0");
let o={id:uid(),number:num,date:new Date().toISOString(),customerName:name,customerPhone:phone,items:items.map(x=>({...x})),total:sub,amountReceived:adv,advance:adv,balance:Math.max(0,sub-adv),deliveryDate:$("orderDeliveryDate").value,notes:$("orderNotes").value.trim()};
d.orders.push(o);write(d);state.orderItems=[];dashboard();orders();customers();
if(generate){state.bill=o;ensureBillPage();renderBill(o);showPage("billPage")}else{showPage("ordersPage");toast("Order saved")}
}
function ensureBillPage(){
if($("billPage"))return;
let sec=document.createElement("section");sec.id="billPage";sec.className="app-page";sec.innerHTML=`<div class="page-heading"><div><p class="eyebrow">Invoice</p><h2>Bill</h2></div><button class="secondary-button" onclick="showPage('ordersPage')">Back</button></div><div id="billPreview" class="bill-preview"></div><div class="bill-buttons"><button id="printBillBtn" class="secondary-button">Print Bill</button><button id="whatsappBillBtn" class="primary-button">WhatsApp</button></div>`;$("mainApp").querySelector(".main-content").appendChild(sec);$("printBillBtn").onclick=printBill;$("whatsappBillBtn").onclick=whatsapp;
}
function bill(id){let o=data().orders.find(x=>x.id===id);if(!o)return;state.bill=o;ensureBillPage();renderBill(o);showPage("billPage")}
function renderBill(o){
let d=data(),b=d.business||{},gst=d.settings?.billGst&&b.gstin?`<div><span>GSTIN</span><b>${esc(b.gstin)}</b></div>`:"";
$("billPreview").innerHTML=`<div class="bill-header"><div><h2>${esc(b.name||"ManageX")}</h2><p>${esc(b.address||"")}</p><p>${esc(b.phone||"")}${b.whatsapp?" • WhatsApp "+esc(b.whatsapp):""}</p>${b.tagline?`<p>${esc(b.tagline)}</p>`:""}</div><div class="bill-number"><b>INVOICE</b><p>${esc(o.number)}</p><p>${new Date(o.date).toLocaleDateString("en-IN")}</p></div></div><div class="bill-customer"><b>Bill To</b><p>${esc(o.customerName)}</p><p>${esc(o.customerPhone)}</p>${o.deliveryDate?`<p>Delivery: ${esc(o.deliveryDate)}</p>`:""}</div><table class="bill-table"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead><tbody>${o.items.map(x=>`<tr><td>${esc(x.name)}</td><td>${x.qty}</td><td>${money(x.price)}</td><td>${money(Number(x.qty)*Number(x.price))}</td></tr>`).join("")}</tbody></table><div class="bill-summary"><div><span>Subtotal</span><b>${money(o.total)}</b></div><div><span>Received</span><b>${money(received(o))}</b></div><div><span>Balance Due</span><b>${money(pending(o))}</b></div>${gst}</div><div class="bill-footer">${esc(d.settings?.billFooter||"Thank you for your business!")}${o.notes?`<br>${esc(o.notes)}`:""}</div>`;
}
function printBill(){window.print()}
function whatsapp(id){
let o=typeof id==="string"?data().orders.find(x=>x.id===id):state.bill;if(!o)return;
let b=data().business||{},msg=`*${b.name||"ManageX"}*%0AOrder: ${o.number}%0ACustomer: ${o.customerName}%0ATotal: ${money(o.total)}%0AReceived: ${money(received(o))}%0ABalance: ${money(pending(o))}%0AThank you!`;
let phone=(o.customerPhone||"").replace(/\D/g,"");window.open("https://wa.me/91"+phone+"?text="+msg,"_blank");
}
function openCustomerWhatsApp(phone){let p=String(phone).replace(/\D/g,"");window.open("https://wa.me/91"+p,"_blank")}
function collect(id){
let d=data(),o=d.orders.find(x=>x.id===id);if(!o)return;
let due=pending(o);if(due<=0){toast("Payment is already complete");return}
let amount=prompt("Enter amount received:",due);if(amount===null)return;
amount=Math.max(0,Number(amount)||0);o.amountReceived=Math.min(total(o),received(o)+amount);o.advance=o.amountReceived;o.balance=pending(o);write(d);dashboard();orders();customers();toast(pending(o)?"Payment updated":"Payment completed");
}
function deleteOrder(id){if(!confirm("Delete this order?"))return;let d=data();d.orders=d.orders.filter(o=>o.id!==id);write(d);dashboard();orders();customers();toast("Order deleted")}
function settings(){
let d=data(),b=d.business||{},s=d.settings||{};
$("settingsContent").innerHTML=`<div class="settings-item" onclick="settingsProfile()"><div><h3>Business Profile</h3><p>${esc(b.name||"Set up your business details")}</p></div><span class="settings-arrow">›</span></div><div class="settings-item" onclick="settingsOrder()"><div><h3>Order Settings</h3><p>Delivery date, advance payment and notes</p></div><span class="settings-arrow">›</span></div><div class="settings-item" onclick="settingsBill()"><div><h3>Bill Settings</h3><p>GST display and bill footer</p></div><span class="settings-arrow">›</span></div><div class="settings-item" onclick="settingsProducts()"><div><h3>Products & Services</h3><p>Manage your catalog</p></div><span class="settings-arrow">›</span></div><div class="settings-item"><div><h3>Current Plan</h3><p>Free plan • Subscription system will be added later</p></div><span class="settings-arrow">›</span></div>`;
}
function openTempPage(id,title,html){
let old=$(id);if(old)old.remove();let sec=document.createElement("section");sec.id=id;sec.className="app-page";sec.innerHTML=`<div class="page-heading"><div><p class="eyebrow">ManageX</p><h2>${title}</h2></div><button class="secondary-button" onclick="showPage('settingsPage')">Back</button></div>${html}`;$("mainApp").querySelector(".main-content").appendChild(sec);showPage(id);
}
function settingsProfile(){
let d=data(),b=d.business||{};
openTempPage("profileSettingsPage","Business Profile",`<div class="order-form-card"><div class="form-grid"><label>Business Name<input id="setName" class="form-control" value="${attr(b.name)}"></label><label>Owner Name<input id="setOwner" class="form-control" value="${attr(b.owner)}"></label><label>Phone<input id="setPhone" class="form-control" value="${attr(b.phone)}"></label><label>WhatsApp<input id="setWhatsapp" class="form-control" value="${attr(b.whatsapp)}"></label><label class="full-width">Address<input id="setAddress" class="form-control" value="${attr(b.address)}"></label><label>GSTIN<input id="setGstin" class="form-control" value="${attr(b.gstin)}"></label><label>Tagline<input id="setTagline" class="form-control" value="${attr(b.tagline)}"></label></div><div class="form-buttons"><button class="primary-button" onclick="saveProfileSettings()">Save Changes</button></div></div>`);
}
function saveProfileSettings(){
let d=data(),b=d.business;b.name=$("setName").value.trim();b.owner=$("setOwner").value.trim();b.phone=$("setPhone").value.trim().replace(/\D/g,"");b.whatsapp=$("setWhatsapp").value.trim().replace(/\D/g,"");b.address=$("setAddress").value.trim();b.gstin=$("setGstin").value.trim().toUpperCase();b.tagline=$("setTagline").value.trim();write(d);loadBusiness();showPage("settingsPage");toast("Business profile saved")}
function settingsOrder(){
let d=data(),s=d.settings||{};
openTempPage("orderSettingsPage","Order Settings",`<div class="order-form-card"><div class="form-grid"><label>Delivery Date<select id="setDelivery" class="form-control"><option value="true" ${s.deliveryDate!==false?"selected":""}>Enabled</option><option value="false" ${s.deliveryDate===false?"selected":""}>Disabled</option></select></label><label>Advance Payment<select id="setAdvance" class="form-control"><option value="true" ${s.advancePayment!==false?"selected":""}>Enabled</option><option value="false" ${s.advancePayment===false?"selected":""}>Disabled</option></select></label><label>Notes<select id="setNotes" class="form-control"><option value="true" ${s.notes!==false?"selected":""}>Enabled</option><option value="false" ${s.notes===false?"selected":""}>Disabled</option></select></label></div><div class="form-buttons"><button class="primary-button" onclick="saveOrderSettings()">Save Changes</button></div></div>`);
}
function saveOrderSettings(){let d=data();d.settings.deliveryDate=$("setDelivery").value==="true";d.settings.advancePayment=$("setAdvance").value==="true";d.settings.notes=$("setNotes").value==="true";write(d);showPage("settingsPage");toast("Order settings saved")}
function settingsBill(){
let d=data(),s=d.settings||{};
openTempPage("billSettingsPage","Bill Settings",`<div class="order-form-card"><div class="form-grid"><label>GST on Bill<select id="setBillGst" class="form-control"><option value="true" ${s.billGst!==false?"selected":""}>Enabled</option><option value="false" ${s.billGst===false?"selected":""}>Disabled</option></select></label><label class="full-width">Bill Footer<textarea id="setBillFooter">${esc(s.billFooter||"Thank you for your business!")}</textarea></label></div><div class="form-buttons"><button class="primary-button" onclick="saveBillSettings()">Save Changes</button></div></div>`);
}
function saveBillSettings(){let d=data();d.settings.billGst=$("setBillGst").value==="true";d.settings.billFooter=$("setBillFooter").value.trim();write(d);showPage("settingsPage");toast("Bill settings saved")}
function settingsProducts(){showPage("productsPage")}
function esc(v){return String(v??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[m]))}
function attr(v){return esc(v).replace(/`/g,"&#96;")}
function init(){
let d=data();
if(d.business){state.type=d.business.businessType||"Other";openApp()}else setup();
$("newOrderBtn").onclick=newOrder;$("viewOrdersBtn").onclick=()=>showPage("ordersPage");$("notificationBtn").onclick=()=>toast("No new notifications");
document.querySelectorAll(".nav-item").forEach(n=>n.onclick=()=>showPage(n.dataset.page));
document.querySelectorAll("[data-action='new-order']").forEach(b=>b.onclick=newOrder);
document.querySelectorAll("[data-action='add-product']").forEach(b=>b.onclick=addProduct);
$("customerSearch").oninput=customers;
}
document.addEventListener("DOMContentLoaded",init);
