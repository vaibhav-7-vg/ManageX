"use strict";
const MANAGEX={version:"1.0.0",storageKey:"managex_data",configVersion:"1.0.0"};
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
const PLAN_FEATURES={
free:{name:"Free",maxOrders:50,pdf:true,whatsapp:true,reports:false,employees:1},
pro:{name:"Pro",maxOrders:1000,pdf:true,whatsapp:true,reports:true,employees:3},
business:{name:"Business",maxOrders:10000,pdf:true,whatsapp:true,reports:true,employees:10}
};
const state={businessType:"",businessConfig:null,orderItems:[],currentBill:null,orderFilter:"all"};
function $(id){return document.getElementById(id);}
function $$(selector){return document.querySelectorAll(selector);}
function uid(prefix){return prefix+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,7);}
function money(value){return "₹"+Number(value||0).toLocaleString("en-IN",{minimumFractionDigits:0,maximumFractionDigits:2});}
function escapeHTML(value){return String(value??"").replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c];});}
function cleanPhone(value){return String(value||"").replace(/\D/g,"");}
function defaultData(){
return {version:MANAGEX.version,business:null,products:[],customers:[],orders:[],settings:{deliveryDate:true,advancePayment:true,notes:true,measurements:false,gst:true,billFooter:"Thank you for your business.",theme:"light"},subscription:{plan:"free",status:"active"},counters:{order:0}};
}
function getDB(){
try{
const raw=localStorage.getItem(MANAGEX.storageKey);
if(!raw)return defaultData();
const data=JSON.parse(raw);
const base=defaultData();
return Object.assign(base,data,{settings:Object.assign(base.settings,data.settings||{}),subscription:Object.assign(base.subscription,data.subscription||{}),counters:Object.assign(base.counters,data.counters||{})});
}catch(e){return defaultData();}
}
function saveDB(data){localStorage.setItem(MANAGEX.storageKey,JSON.stringify(data));}
const ManageXDB={
get:function(){return getDB();},
save:function(data){saveDB(data);},
business:function(){return getDB().business;},
products:function(){return getDB().products;},
customers:function(){return getDB().customers;},
orders:function(){return getDB().orders;},
saveProduct:function(product){const db=getDB();const index=db.products.findIndex(p=>p.id===product.id);if(index>=0)db.products[index]=product;else db.products.push(product);saveDB(db);},
deleteProduct:function(id){const db=getDB();db.products=db.products.filter(p=>p.id!==id);saveDB(db);},
saveCustomer:function(customer){const db=getDB();const index=db.customers.findIndex(c=>c.id===customer.id);if(index>=0)db.customers[index]=customer;else db.customers.push(customer);saveDB(db);},
saveOrder:function(order){const db=getDB();const index=db.orders.findIndex(o=>o.id===order.id);if(index>=0)db.orders[index]=order;else db.orders.unshift(order);saveDB(db);}
};
function getBusinessConfig(type){return BUSINESS_CONFIG[type]||BUSINESS_CONFIG.other;}
function showToast(message){
let toast=$("managexToast");
if(!toast){toast=document.createElement("div");toast.id="managexToast";toast.className="managex-toast";document.body.appendChild(toast);}
toast.textContent=message;toast.classList.add("show");clearTimeout(toast._timer);toast._timer=setTimeout(()=>toast.classList.remove("show"),2200);
}
function showPage(pageId){
$$(".app-page").forEach(p=>{p.classList.remove("active-page");p.style.display="none";});
$$(".nav-item").forEach(n=>n.classList.remove("active"));
const page=$(pageId);
if(page){page.classList.add("active-page");page.style.display="block";}
$$(".nav-item").forEach(n=>{if(n.dataset.page===pageId)n.classList.add("active");});
window.scrollTo(0,0);
if(pageId==="homePage")renderDashboard();
if(pageId==="ordersPage")renderOrders();
if(pageId==="customersPage")renderCustomers();
if(pageId==="productsPage")renderProducts();
}
function openMainApp(){if($("setupPage"))$("setupPage").style.display="none";if($("mainApp"))$("mainApp").style.display="block";showPage("homePage");loadBusinessIntoUI();}
function openSetup(){if($("setupPage"))$("setupPage").style.display="block";if($("mainApp"))$("mainApp").style.display="none";}
function selectBusinessType(button){
$$(".business-type-card").forEach(c=>c.classList.remove("selected"));
button.classList.add("selected");
state.businessType=button.dataset.businessType||"";
state.businessConfig=getBusinessConfig(state.businessType);
if($("businessTypeError"))$("businessTypeError").textContent="";
}
function openDetailsStep(){
if(!state.businessType){$("businessTypeError").textContent="Please select your business type.";showToast("Select a business type first");return;}
const db=getDB();db.business=Object.assign({},db.business||{},{businessType:state.businessType,businessDisplayName:getBusinessConfig(state.businessType).name,defaultFeatures:getBusinessConfig(state.businessType).features,updatedAt:new Date().toISOString()});saveDB(db);
$("businessStep").style.display="none";$("detailsStep").style.display="block";$("progressBusiness").classList.remove("active");$("progressBusiness").classList.add("completed");$("progressDetails").classList.add("active");loadProfileFields(db.business);window.scrollTo(0,0);
}
function openBusinessStep(){$("detailsStep").style.display="none";$("businessStep").style.display="block";$("progressDetails").classList.remove("active");$("progressBusiness").classList.remove("completed");$("progressBusiness").classList.add("active");}
function loadProfileFields(b){
$("businessName").value=b?.businessName||"";$("ownerName").value=b?.ownerName||"";$("phoneNumber").value=b?.phoneNumber||"";$("whatsappNumber").value=b?.whatsappNumber||"";$("businessAddress").value=b?.businessAddress||"";$("gstin").value=b?.gstin||"";$("tagline").value=b?.tagline||"";
}
function finishSetup(){
const businessName=$("businessName").value.trim(),ownerName=$("ownerName").value.trim(),phone=cleanPhone($("phoneNumber").value),whatsapp=cleanPhone($("whatsappNumber").value),address=$("businessAddress").value.trim(),gstin=$("gstin").value.trim().toUpperCase(),tagline=$("tagline").value.trim();
$("profileError").textContent="";
if(!businessName){$("profileError").textContent="Please enter your business name.";return;}
if(!ownerName){$("profileError").textContent="Please enter the owner's name.";return;}
if(!/^[6-9]\d{9}$/.test(phone)){$("profileError").textContent="Enter a valid 10-digit Indian mobile number.";return;}
if(whatsapp&&!/^[6-9]\d{9}$/.test(whatsapp)){$("profileError").textContent="Enter a valid WhatsApp number.";return;}
if(gstin&&!/^[0-9A-Z]{15}$/.test(gstin)){$("profileError").textContent="GSTIN must contain 15 characters.";return;}
const db=getDB(),type=state.businessType||db.business?.businessType||"other";
db.business={...(db.business||{}),businessType:type,businessDisplayName:getBusinessConfig(type).name,businessName,ownerName,phoneNumber:phone,whatsappNumber:whatsapp||phone,businessAddress:address,gstin,tagline,createdAt:db.business?.createdAt||new Date().toISOString(),updatedAt:new Date().toISOString(),configVersion:MANAGEX.configVersion};
saveDB(db);
if(!db.products.length)getBusinessConfig(type).catalog.forEach(name=>db.products.push({id:uid("prd"),name,category:"Default",price:0,active:true,createdAt:new Date().toISOString()}));
saveDB(db);state.businessType=type;state.businessConfig=getBusinessConfig(type);openMainApp();showToast("ManageX setup completed");
}
function loadBusinessIntoUI(){
const db=getDB(),b=db.business;if(!b)return;
if($("dashboardWelcome"))$("dashboardWelcome").textContent="Welcome to "+b.businessName+". Manage your business from one place.";
if($("headerBusinessType"))$("headerBusinessType").textContent=getBusinessConfig(b.businessType).name;
}
function renderDashboard(){
const db=getDB(),orders=db.orders,total=orders.reduce((s,o)=>s+Number(o.total||0),0),received=orders.reduce((s,o)=>s+Number(o.advance||0),0),pending=Math.max(0,total-received);
$("totalOrders").textContent=orders.length;$("pendingOrders").textContent=orders.filter(o=>o.status!=="completed").length;$("completedOrders").textContent=orders.filter(o=>o.status==="completed").length;$("totalSales").textContent=money(total);$("amountReceived").textContent=money(received);$("amountPending").textContent=money(pending);
const percent=total?Math.min(100,(received/total)*100):0;if($("paymentProgress"))$("paymentProgress").style.width=percent+"%";
const recent=orders.slice(0,5);
$("recentOrdersList").innerHTML=recent.length?recent.map(orderCardHTML).join(""):'<div class="empty-state"><div class="empty-icon">ORD</div><h3>No orders yet</h3><p>Your recent orders will appear here.</p></div>';
bindOrderActions();
}
function orderCardHTML(o){
return '<div class="data-card"><div><strong>'+escapeHTML(o.orderNumber)+'</strong><p>'+escapeHTML(o.customerName)+' · '+money(o.total)+'</p><small>'+escapeHTML(o.status||"pending")+'</small></div><div><button type="button" class="small-primary-button" data-order-view="'+o.id+'">View</button></div></div>';
}
function renderOrders(){
const db=getDB(),filter=state.orderFilter,orders=db.orders.filter(o=>filter==="all"||o.status===filter);
$("ordersList").innerHTML=orders.length?orders.map(o=>orderCardHTML(o)+'<div class="order-actions"><button type="button" class="small-primary-button" data-order-complete="'+o.id+'">'+(o.status==="completed"?"Completed":"Mark Complete")+'</button><button type="button" class="small-secondary-button" data-order-delete="'+o.id+'">Delete</button></div>').join(""):'<div class="empty-state"><div class="empty-icon">ORD</div><h3>No orders found</h3><p>Create your first order to see it here.</p><button type="button" class="small-primary-button" data-action="new-order">New Order</button></div>';
bindOrderActions();
}
function bindOrderActions(){
$$("[data-order-view]").forEach(b=>b.onclick=()=>showBillForOrder(b.dataset.orderView));
$$("[data-order-complete]").forEach(b=>b.onclick=()=>{const db=getDB(),o=db.orders.find(x=>x.id===b.dataset.orderComplete);if(o){o.status="completed";o.completedAt=new Date().toISOString();saveDB(db);refreshAll();showToast("Order updated");}});
$$("[data-order-delete]").forEach(b=>b.onclick=()=>{if(!confirm("Delete this order?"))return;const db=getDB();db.orders=db.orders.filter(o=>o.id!==b.dataset.orderDelete);saveDB(db);refreshAll();showToast("Order deleted");});
$$("[data-action='new-order']").forEach(b=>b.onclick=openNewOrder);
}
function renderProducts(){
const products=getDB().products;
$("productsList").innerHTML=products.length?products.map(p=>'<div class="data-card"><div><strong>'+escapeHTML(p.name)+'</strong><p>'+escapeHTML(p.category||"Product")+'</p></div><div><strong>'+money(p.price)+'</strong><div class="order-actions"><button type="button" class="small-primary-button" data-edit-product="'+p.id+'">Edit</button><button type="button" class="small-secondary-button" data-delete-product="'+p.id+'">Delete</button></div></div></div>').join(""):'<div class="empty-state"><div class="empty-icon">CAT</div><h3>No products or services</h3><p>Add your first product or service.</p></div>';
$$("[data-delete-product]").forEach(b=>b.onclick=()=>{if(confirm("Delete this product?")){ManageXDB.deleteProduct(b.dataset.deleteProduct);renderProducts();refreshProductSelect();showToast("Product deleted");}});
$$("[data-edit-product]").forEach(b=>b.onclick=()=>editProduct(b.dataset.editProduct));
}
function addProduct(){
const name=prompt("Product / Service name:");
if(!name||!name.trim())return;
const price=Number(prompt("Price:", "0"));
if(!Number.isFinite(price)||price<0){showToast("Invalid price");return;}
const category=prompt("Category:","General")||"General";
ManageXDB.saveProduct({id:uid("prd"),name:name.trim(),category,price,active:true,createdAt:new Date().toISOString()});
renderProducts();refreshProductSelect();showToast("Product added");
}
function editProduct(id){
const p=getDB().products.find(x=>x.id===id);if(!p)return;
const name=prompt("Product / Service name:",p.name);if(!name||!name.trim())return;
const price=Number(prompt("Price:",p.price));if(!Number.isFinite(price)||price<0){showToast("Invalid price");return;}
p.name=name.trim();p.price=price;p.category=prompt("Category:",p.category)||p.category;ManageXDB.saveProduct(p);renderProducts();refreshProductSelect();showToast("Product updated");
}
function refreshProductSelect(){
const select=$("orderProduct");if(!select)return;
select.innerHTML='<option value="">Select product/service</option>'+getDB().products.map(p=>'<option value="'+p.id+'">'+escapeHTML(p.name)+' — '+money(p.price)+'</option>').join("");
}
function openNewOrder(){
state.orderItems=[];["orderCustomerName","orderCustomerPhone","orderNotes","orderDeliveryDate"].forEach(id=>{if($(id))$(id).value="";});$("orderAdvance").value="0";$("orderPrice").value="";$("orderQuantity").value="1";refreshProductSelect();renderOrderItems();showPage("newOrderPage");
}
function addOrderItem(){
const productId=$("orderProduct").value,product=getDB().products.find(p=>p.id===productId),quantity=Number($("orderQuantity").value),price=Number($("orderPrice").value||product?.price||0);
if(!product){showToast("Select a product or service");return;}
if(!Number.isFinite(quantity)||quantity<1){showToast("Quantity must be at least 1");return;}
if(!Number.isFinite(price)||price<0){showToast("Enter a valid price");return;}
state.orderItems.push({id:uid("item"),productId,name:product.name,quantity,price,total:quantity*price});renderOrderItems();
}
function renderOrderItems(){
$("orderItemsList").innerHTML=state.orderItems.length?state.orderItems.map((i,index)=>'<div class="data-card"><div><strong>'+escapeHTML(i.name)+'</strong><p>'+i.quantity+' × '+money(i.price)+'</p></div><div><strong>'+money(i.total)+'</strong><button type="button" class="small-secondary-button" data-remove-item="'+index+'">Remove</button></div></div>').join(""):'';
$$("[data-remove-item]").forEach(b=>b.onclick=()=>{state.orderItems.splice(Number(b.dataset.removeItem),1);renderOrderItems();});
const total=state.orderItems.reduce((s,i)=>s+i.total,0),advance=Number($("orderAdvance")?.value||0),safeAdvance=Math.min(Math.max(advance,0),total);$("orderTotalPreview").textContent="Total: "+money(total)+" | Advance: "+money(safeAdvance)+" | Balance: "+money(Math.max(0,total-safeAdvance));
}
function saveOrder(){
const name=$("orderCustomerName").value.trim(),phone=cleanPhone($("orderCustomerPhone").value),items=state.orderItems,total=items.reduce((s,i)=>s+i.total,0),advance=Number($("orderAdvance").value||0);
$("orderError").textContent="";
if(!name){$("orderError").textContent="Customer name is required.";return;}
if(!/^[6-9]\d{9}$/.test(phone)){$("orderError").textContent="Enter a valid 10-digit mobile number.";return;}
if(!items.length){$("orderError").textContent="Add at least one product or service.";return;}
if(advance<0||advance>total){$("orderError").textContent="Advance cannot be greater than total.";return;}
const db=getDB();db.counters.order++;const order={id:uid("ord"),orderNumber:"MX-"+String(db.counters.order).padStart(4,"0"),customerName:name,customerPhone:phone,items,total,advance,balance:total-advance,notes:$("orderNotes").value.trim(),deliveryDate:$("orderDeliveryDate").value,status:total-advance<=0?"completed":"pending",createdAt:new Date().toISOString()};
db.orders.unshift(order);
let customer=db.customers.find(c=>cleanPhone(c.phone)===phone);
if(!customer){customer={id:uid("cus"),name,phone,totalOrders:0,totalSpending:0,pendingAmount:0,createdAt:new Date().toISOString()};db.customers.push(customer);}
customer.name=name;customer.totalOrders=db.orders.filter(o=>cleanPhone(o.customerPhone)===phone).length;customer.totalSpending=db.orders.filter(o=>cleanPhone(o.customerPhone)===phone).reduce((s,o)=>s+Number(o.total||0),0);customer.pendingAmount=db.orders.filter(o=>cleanPhone(o.customerPhone)===phone).reduce((s,o)=>s+Number(o.balance||0),0);
saveDB(db);state.currentBill=order;state.orderItems=[];renderDashboard();renderOrders();renderCustomers();showBillForOrder(order.id);showToast("Order saved");
}
function showBillForOrder(id){const order=getDB().orders.find(o=>o.id===id);if(!order)return;state.currentBill=order;renderBill(order);showPage("billPage");}
function renderBill(order){
const db=getDB(),b=db.business||{},footer=db.settings.billFooter||"Thank you for your business.";
$("billPreview").innerHTML='<div class="bill-inner"><div class="bill-header"><div><h2>'+escapeHTML(b.businessName||"ManageX Business")+'</h2><p>'+escapeHTML(b.businessAddress||"")+'</p><p>'+escapeHTML(b.phoneNumber||"")+'</p></div><strong>'+escapeHTML(order.orderNumber)+'</strong></div><hr><p><strong>Customer:</strong> '+escapeHTML(order.customerName)+'</p><p><strong>Phone:</strong> '+escapeHTML(order.customerPhone)+'</p><p><strong>Date:</strong> '+new Date(order.createdAt).toLocaleDateString("en-IN")+'</p><table class="bill-table"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead><tbody>'+order.items.map(i=>'<tr><td>'+escapeHTML(i.name)+'</td><td>'+i.quantity+'</td><td>'+money(i.price)+'</td><td>'+money(i.total)+'</td></tr>').join("")+'</tbody></table><div class="bill-total"><p>Subtotal: <strong>'+money(order.total)+'</strong></p><p>Advance: <strong>'+money(order.advance)+'</strong></p><p>Balance Due: <strong>'+money(order.balance)+'</strong></p></div><p class="bill-footer">'+escapeHTML(footer)+'</p></div>';
  }
function printBill(){window.print();}
function shareBillWhatsApp(){
const order=state.currentBill;if(!order)return;
const b=getDB().business||{},text="*"+(b.businessName||"ManageX")+"*%0AOrder: "+order.orderNumber+"%0ACustomer: "+order.customerName+"%0ATotal: "+money(order.total)+"%0AAdvance: "+money(order.advance)+"%0ABalance: "+money(order.balance)+"%0AThank you!";
const phone=order.customerPhone||b.whatsappNumber||b.phoneNumber;window.open("https://wa.me/"+cleanPhone(phone)+"?text="+text,"_blank");
}
function renderCustomers(){
const query=($("customerSearch")?.value||"").toLowerCase().trim(),customers=getDB().customers.filter(c=>(c.name+" "+c.phone).toLowerCase().includes(query));
$("customersList").innerHTML=customers.length?customers.map(c=>'<div class="data-card"><div><strong>'+escapeHTML(c.name)+'</strong><p>'+escapeHTML(c.phone)+'</p></div><div><strong>'+money(c.totalSpending)+'</strong><p>Pending '+money(c.pendingAmount)+'</p><small>'+c.totalOrders+' orders</small></div></div>').join(""):'<div class="empty-state"><div class="empty-icon">CUS</div><h3>No customers found</h3><p>Customers will appear here after you create orders.</p></div>';
}
function openSettings(setting){
const db=getDB(),b=db.business||{},s=db.settings;
if(setting==="business-profile")$("settingsContent").innerHTML='<div class="form-card"><h3>Business Profile</h3><label>Business Name</label><input id="setBusinessName" class="mx-input" value="'+escapeHTML(b.businessName||"")+'"><label>Owner Name</label><input id="setOwnerName" class="mx-input" value="'+escapeHTML(b.ownerName||"")+'"><label>Phone</label><input id="setPhone" class="mx-input" value="'+escapeHTML(b.phoneNumber||"")+'"><label>WhatsApp</label><input id="setWhatsApp" class="mx-input" value="'+escapeHTML(b.whatsappNumber||"")+'"><label>Address</label><textarea id="setAddress" class="mx-input mx-textarea">'+escapeHTML(b.businessAddress||"")+'</textarea><label>GSTIN</label><input id="setGST" class="mx-input" value="'+escapeHTML(b.gstin||"")+'"><label>Tagline</label><input id="setTagline" class="mx-input" value="'+escapeHTML(b.tagline||"")+'"><button class="setup-primary-btn" id="saveBusinessSettings">Save Profile</button></div>';
else if(setting==="products"){$("settingsContent").innerHTML='<div class="form-card"><h3>Products & Services</h3><p>Use the Products tab to manage your catalog.</p><button class="setup-primary-btn" id="settingsProductsBtn">Open Products</button></div>';$("settingsProductsBtn").onclick=()=>showPage("productsPage");}
else if(setting==="orders")$("settingsContent").innerHTML='<div class="form-card"><h3>Order Settings</h3><label><input type="checkbox" id="setDelivery" '+(s.deliveryDate?"checked":"")+'> Enable delivery date</label><label><input type="checkbox" id="setAdvance" '+(s.advancePayment?"checked":"")+'> Enable advance payment</label><label><input type="checkbox" id="setNotes" '+(s.notes?"checked":"")+'> Enable notes</label><button class="setup-primary-btn" id="saveOrderSettings">Save Settings</button></div>';
else if(setting==="bills")$("settingsContent").innerHTML='<div class="form-card"><h3>Bill Settings</h3><label>Bill Footer</label><textarea id="setBillFooter" class="mx-input mx-textarea">'+escapeHTML(s.billFooter||"")+'</textarea><label><input type="checkbox" id="setGST" '+(s.gst?"checked":"")+'> Enable GST field</label><button class="setup-primary-btn" id="saveBillSettings">Save Settings</button></div>';
else if(setting==="appearance")$("settingsContent").innerHTML='<div class="form-card"><h3>Appearance</h3><p>ManageX branding and dark mode will be expanded here.</p><button class="setup-primary-btn" id="toggleThemeBtn">Toggle Theme</button></div>';
else if(setting==="subscription")$("settingsContent").innerHTML='<div class="form-card"><h3>ManageX Subscription</h3><p>Current plan: <strong>'+PLAN_FEATURES[db.subscription.plan].name+'</strong></p><div class="plan-card"><strong>Free</strong><p>₹0 · 50 orders</p></div><div class="plan-card"><strong>Pro</strong><p>₹99/month · 1,000 orders · Reports</p></div><div class="plan-card"><strong>Business</strong><p>₹199/month · 10,000 orders · Team features</p></div><button class="setup-primary-btn" id="upgradePlanBtn">Upgrade — Payment Integration Later</button></div>';
if($("saveBusinessSettings"))$("saveBusinessSettings").onclick=saveBusinessSettings;
if($("saveOrderSettings"))$("saveOrderSettings").onclick=()=>{const db=getDB();db.settings.deliveryDate=$("setDelivery").checked;db.settings.advancePayment=$("setAdvance").checked;db.settings.notes=$("setNotes").checked;saveDB(db);showToast("Order settings saved");};
if($("saveBillSettings"))$("saveBillSettings").onclick=()=>{const db=getDB();db.settings.billFooter=$("setBillFooter").value.trim();db.settings.gst=$("setGST").checked;saveDB(db);showToast("Bill settings saved");};
if($("toggleThemeBtn"))$("toggleThemeBtn").onclick=()=>{document.body.classList.toggle("dark-mode");showToast("Appearance changed");};
if($("upgradePlanBtn"))$("upgradePlanBtn").onclick=()=>showToast("Secure payment backend will be connected later");
  }
function saveBusinessSettings(){
const db=getDB();if(!db.business)return;
db.business.businessName=$("setBusinessName").value.trim();db.business.ownerName=$("setOwnerName").value.trim();db.business.phoneNumber=cleanPhone($("setPhone").value);db.business.whatsappNumber=cleanPhone($("setWhatsApp").value)||db.business.phoneNumber;db.business.businessAddress=$("setAddress").value.trim();db.business.gstin=$("setGST").value.trim().toUpperCase();db.business.tagline=$("setTagline").value.trim();db.business.updatedAt=new Date().toISOString();saveDB(db);loadBusinessIntoUI();showToast("Business profile saved");
}
function refreshAll(){renderDashboard();renderOrders();renderCustomers();renderProducts();refreshProductSelect();}
function initSetup(){
$("businessTypeGrid").addEventListener("click",e=>{const card=e.target.closest(".business-type-card");if(card)selectBusinessType(card);});
$("continueBusinessBtn").onclick=openDetailsStep;$("backToBusinessBtn").onclick=openBusinessStep;$("finishSetupBtn").onclick=finishSetup;
}
function initNavigation(){
$$(".nav-item").forEach(item=>item.onclick=()=>showPage(item.dataset.page));
$("viewOrdersBtn").onclick=()=>showPage("ordersPage");
$("newOrderBtn").onclick=openNewOrder;
$("addProductBtn").onclick=addProduct;
$("notificationBtn").onclick=()=>showToast("No new notifications");
$("cancelOrderBtn").onclick=()=>showPage("homePage");
$("addOrderItemBtn").onclick=addOrderItem;
$("saveOrderBtn").onclick=saveOrder;
$("printBillBtn").onclick=printBill;
$("whatsappBillBtn").onclick=shareBillWhatsApp;
$("orderAdvance").oninput=renderOrderItems;
$("orderPrice").oninput=renderOrderItems;
$("orderQuantity").oninput=renderOrderItems;
$("customerSearch").oninput=renderCustomers;
$$(".filter-chip").forEach(chip=>chip.onclick=()=>{state.orderFilter=chip.dataset.filter;$$(".filter-chip").forEach(c=>c.classList.remove("active"));chip.classList.add("active");renderOrders();});
$$(".settings-item").forEach(item=>item.onclick=()=>openSettings(item.dataset.setting));
}
function loadBusiness(){
const db=getDB();
if(!db.business||!db.business.businessType){openSetup();return;}
state.businessType=db.business.businessType;state.businessConfig=getBusinessConfig(state.businessType);
if(!db.business.businessName||!db.business.ownerName||!db.business.phoneNumber){
openSetup();$("businessStep").style.display="none";$("detailsStep").style.display="block";$("progressBusiness").classList.remove("active");$("progressBusiness").classList.add("completed");$("progressDetails").classList.add("active");loadProfileFields(db.business);return;
}
openMainApp();
}
function init(){initSetup();initNavigation();loadBusiness();}
document.addEventListener("DOMContentLoaded",init);
