"use strict";

const MANAGEX={
  version:"1.0.0",
  storageKey:"managex_data"
};

const BUSINESS_CONFIG={
  "general-store":{name:"General Store",catalog:["Groceries","Household Items","Personal Care"]},
  "supermarket":{name:"Supermarket",catalog:["Groceries","Beverages","Household Items","Personal Care"]},
  "clothing":{name:"Clothing & Fashion",catalog:["Shirt","Pant","T-Shirt","Jeans","Dress"]},
  "footwear":{name:"Footwear",catalog:["Shoes","Sandals","Slippers","Sports Shoes"]},
  "electronics":{name:"Electronics",catalog:["Mobile","Television","Speaker","Accessories"]},
  "mobile-accessories":{name:"Mobile & Accessories",catalog:["Mobile","Charger","Earphones","Cover","Screen Guard"]},
  "hardware":{name:"Hardware",catalog:["Tools","Fasteners","Pipes","Electrical Items"]},
  "furniture":{name:"Furniture",catalog:["Chair","Table","Sofa","Bed","Cupboard"]},
  "stationery":{name:"Stationery",catalog:["Notebook","Pen","Printing","School Supplies"]},
  "jewellery":{name:"Jewellery",catalog:["Ring","Necklace","Bracelet","Earrings"]},
  "restaurant":{name:"Restaurant",catalog:["Pizza","Burger","Sandwich","Rice","Beverage"]},
  "cafe":{name:"Café",catalog:["Coffee","Tea","Sandwich","Pastry","Beverage"]},
  "bakery":{name:"Bakery",catalog:["Cake","Bread","Pastry","Cookies"]},
  "fast-food":{name:"Fast Food",catalog:["Burger","Pizza","Fries","Sandwich","Beverage"]},
  "catering":{name:"Catering / Tiffin",catalog:["Tiffin","Catering Package","Meal","Event Catering"]},
  "sweet-shop":{name:"Sweet Shop",catalog:["Ladoo","Barfi","Pedha","Jalebi","Gift Box"]},
  "salon":{name:"Salon / Barber",catalog:["Haircut","Beard","Hair Colour","Facial","Hair Spa"]},
  "beauty-parlour":{name:"Beauty Parlour",catalog:["Facial","Makeup","Hair Styling","Manicure","Pedicure"]},
  "spa":{name:"Spa",catalog:["Massage","Therapy","Body Spa","Facial"]},
  "fitness":{name:"Fitness / Gym",catalog:["Monthly Membership","Personal Training","Annual Membership","Consultation"]},
  "tailoring":{name:"Tailoring / Boutique",catalog:["Shirt","Pant","Kurta","Uniform","Alteration"]},
  "laundry":{name:"Laundry",catalog:["Wash","Dry Clean","Ironing","Express Laundry"]},
  "mobile-repair":{name:"Mobile Repair",catalog:["Screen Repair","Battery Replacement","Software Service","Charging Port"]},
  "computer-service":{name:"Computer Service",catalog:["Laptop Repair","Desktop Repair","Software Installation","Upgrade"]},
  "electronics-repair":{name:"Electronics Repair",catalog:["TV Repair","Speaker Repair","PCB Repair","Appliance Repair"]},
  "automobile":{name:"Automobile / Garage",catalog:["Service","Oil Change","Brake Service","Repair"]},
  "ac-appliance":{name:"AC / Appliance Service",catalog:["AC Service","AC Repair","Washing Machine","Refrigerator"]},
  "home-services":{name:"Home Services",catalog:["Cleaning","Plumbing","Electrical","Pest Control"]},
  "printing":{name:"Printing / Xerox",catalog:["Xerox","Color Print","Photo Print","Binding"]},
  "photography":{name:"Photography",catalog:["Photo Session","Wedding Photography","Video Shoot","Album"]},
  "graphic-design":{name:"Graphic Design",catalog:["Logo Design","Poster","Social Media Design","Branding"]},
  "digital-marketing":{name:"Digital Marketing",catalog:["Social Media Management","SEO","Advertising","Content Creation"]},
  "consultancy":{name:"Consultancy",catalog:["Consultation","Professional Service","Project","Advisory"]},
  "tuition":{name:"Tuition / Coaching",catalog:["Monthly Tuition","Course","Test Series","Personal Coaching"]},
  "manufacturing":{name:"Manufacturing",catalog:["Product","Custom Order","Bulk Order","Production Job"]},
  "fabrication":{name:"Fabrication / Welding",catalog:["Gate","Grill","Railing","Custom Fabrication"]},
  "machine-workshop":{name:"Machine Workshop",catalog:["Machining","Turning","Milling","Custom Job"]},
  "other":{name:"Other Business",catalog:["Product / Service"]}
};

const state={
  businessType:"",
  orderFilter:"all",
  currentOrder:null
};

function $(id){
  return document.getElementById(id);
}

function $$(selector){
  return document.querySelectorAll(selector);
}

function uid(prefix){
  return prefix+"_"+Date.now().toString(36)+"_"+Math.random().toString(36).slice(2,8);
}

function money(value){
  return "₹"+Number(value||0).toLocaleString("en-IN",{minimumFractionDigits:0,maximumFractionDigits:2});
}

function cleanPhone(value){
  return String(value||"").replace(/\D/g,"");
}

function esc(value){
  return String(value??"").replace(/[&<>"']/g,function(c){
    return {
      "&":"&amp;",
      "<":"&lt;",
      ">":"&gt;",
      '"':"&quot;",
      "'":"&#039;"
    }[c];
  });
}

function defaultDB(){
  return {
    version:MANAGEX.version,
    business:null,
    products:[],
    customers:[],
    orders:[],
    settings:{
      deliveryDate:true,
      advancePayment:true,
      notes:true,
      gst:true,
      billFooter:"Thank you for your business.",
      theme:"light"
    },
    counters:{
      order:0
    }
  };
}

function getDB(){
  try{
    const raw=localStorage.getItem(MANAGEX.storageKey);
    if(!raw)return defaultDB();
    const data=JSON.parse(raw);
    const base=defaultDB();
    return Object.assign(base,data,{
      settings:Object.assign(base.settings,data.settings||{}),
      counters:Object.assign(base.counters,data.counters||{})
    });
  }catch(e){
    return defaultDB();
  }
}

function saveDB(db){
  localStorage.setItem(MANAGEX.storageKey,JSON.stringify(db));
}

function config(type){
  return BUSINESS_CONFIG[type]||BUSINESS_CONFIG.other;
}

function toast(message){
  let t=$("managexToast");
  if(!t){
    t=document.createElement("div");
    t.id="managexToast";
    t.className="managex-toast";
    document.body.appendChild(t);
  }
  t.textContent=message;
  t.classList.add("show");
  clearTimeout(t._timer);
  t._timer=setTimeout(function(){
    t.classList.remove("show");
  },2200);
}

function showPage(pageId){
  $$(".app-page").forEach(function(page){
    page.classList.remove("active-page");
    page.style.display="none";
  });

  $$(".nav-item").forEach(function(item){
    item.classList.remove("active");
  });

  const page=$(pageId);
  if(page){
    page.classList.add("active-page");
    page.style.display="block";
  }

  $$(".nav-item").forEach(function(item){
    if(item.dataset.page===pageId){
      item.classList.add("active");
    }
  });

  window.scrollTo(0,0);

  if(pageId==="homePage")renderDashboard();
  if(pageId==="ordersPage")renderOrders();
  if(pageId==="customersPage")renderCustomers();
  if(pageId==="productsPage")renderProducts();
}

function openMainApp(){
  const setup=$("setupPage");
  const main=$("mainApp");

  if(setup)setup.style.display="none";
  if(main)main.style.display="block";

  showPage("homePage");
  updateBusinessUI();
}

function openSetup(){
  const setup=$("setupPage");
  const main=$("mainApp");

  if(setup)setup.style.display="block";
  if(main)main.style.display="none";
}

function selectBusinessType(card){
  if(!card)return;

  $$(".business-type-card").forEach(function(c){
    c.classList.remove("selected");
  });

  card.classList.add("selected");
  state.businessType=card.dataset.businessType||"";

  const error=$("businessTypeError");
  if(error)error.textContent="";
}

function continueSetup(){
  if(!state.businessType){
    const error=$("businessTypeError");
    if(error)error.textContent="Please select your business type.";
    toast("Please select a business type");
    return;
  }

  const db=getDB();

  db.business=Object.assign({},db.business||{},{
    businessType:state.businessType,
    businessDisplayName:config(state.businessType).name,
    updatedAt:new Date().toISOString()
  });

  saveDB(db);

  openMainApp();
  toast("Business type saved");
}

function updateBusinessUI(){
  const db=getDB();
  const b=db.business;
  if(!b)return;

  const type=config(b.businessType);

  const header=$("headerBusinessType");
  if(header)header.textContent=type.name;

  const welcome=document.querySelector("#homePage .page-heading p");
  if(welcome){
    welcome.textContent=b.businessName
      ?"Welcome to "+b.businessName+". Manage your business from one place."
      :"Manage your business from one place.";
  }

  const description=$("catalogDescription");
  if(description){
    description.textContent="Manage products and services for "+type.name+".";
  }
}

function paymentReceived(order){
  const total=Number(order.total||0);
  const received=Number(
    order.amountReceived!==undefined
      ?order.amountReceived
      :(order.advance||0)
  );

  return Math.min(total,Math.max(0,received));
}

function paymentPending(order){
  return Math.max(0,Number(order.total||0)-paymentReceived(order));
}

function orderStatus(order){
  return paymentPending(order)<=0?"completed":"pending";
}

function syncCustomers(db){
  const map={};

  db.orders.forEach(function(order){
    const phone=cleanPhone(order.customerPhone);
    if(!phone)return;

    if(!map[phone]){
      map[phone]={
        id:uid("cus"),
        name:order.customerName||"Customer",
        phone:phone,
        totalOrders:0,
        totalSpending:0,
        pendingAmount:0,
        createdAt:order.createdAt||new Date().toISOString()
      };
    }

    map[phone].name=order.customerName||map[phone].name;
    map[phone].totalOrders++;
    map[phone].totalSpending+=Number(order.total||0);
    map[phone].pendingAmount+=paymentPending(order);
  });

  db.customers=Object.values(map);
}

function renderDashboard(){
  const db=getDB();
  const orders=db.orders||[];

  const total=orders.reduce(function(sum,o){
    return sum+Number(o.total||0);
  },0);

  const received=orders.reduce(function(sum,o){
    return sum+paymentReceived(o);
  },0);

  const pending=orders.reduce(function(sum,o){
    return sum+paymentPending(o);
  },0);

  if($("totalOrders"))$("totalOrders").textContent=orders.length;
  if($("pendingOrders"))$("pendingOrders").textContent=orders.filter(o=>orderStatus(o)==="pending").length;
  if($("completedOrders"))$("completedOrders").textContent=orders.filter(o=>orderStatus(o)==="completed").length;
  if($("totalSales"))$("totalSales").textContent=money(total);
  if($("amountReceived"))$("amountReceived").textContent=money(received);
  if($("amountPending"))$("amountPending").textContent=money(pending);

  const progress=$("paymentProgress");
  if(progress){
    progress.style.width=(total?Math.min(100,received/total*100):0)+"%";
  }

  let box=$("recentOrdersList");

  if(!box){
    box=document.querySelector("#homePage .empty-state");
  }

  if(!box)return;

  const recent=orders.slice(0,5);

  if(!recent.length){
    if(box.id==="recentOrdersList"){
      box.innerHTML='<div class="empty-state"><div class="empty-icon">ORD</div><h3>No orders yet</h3><p>Your recent orders will appear here.</p></div>';
    }
    return;
  }

  if(box.id==="recentOrdersList"){
    box.innerHTML=recent.map(orderCard).join("");
  }else{
    const old=document.querySelector("#homePage .empty-state");
    if(old){
      old.outerHTML='<div id="recentOrdersList" class="dynamic-list">'+recent.map(orderCard).join("")+"</div>";
    }
  }

  bindDynamicActions();
}

function orderCard(order){
  return '<div class="data-card order-card">'+
    '<div>'+
    '<strong>'+esc(order.orderNumber||"Order")+'</strong>'+
    '<p>'+esc(order.customerName||"Customer")+' · '+money(order.total)+'</p>'+
    '<small>'+esc(orderStatus(order))+' · Received '+money(paymentReceived(order))+' · Pending '+money(paymentPending(order))+'</small>'+
    '</div>'+
    '<button type="button" class="small-primary-button" data-view-order="'+esc(order.id)+'">View</button>'+
    '</div>';
}

function renderOrders(){
  const box=$("ordersList");
  if(!box)return;

  const db=getDB();

  let orders=db.orders||[];

  if(state.orderFilter!=="all"){
    orders=orders.filter(function(o){
      return orderStatus(o)===state.orderFilter;
    });
  }

  if(!orders.length){
    box.innerHTML='<div class="empty-state"><div class="empty-icon">ORD</div><h3>No orders found</h3><p>Create your first order to see it here.</p><button type="button" class="small-primary-button" data-action="new-order">New Order</button></div>';
    bindDynamicActions();
    return;
  }

  box.innerHTML=orders.map(function(o){
    return orderCard(o)+
      '<div class="order-actions">'+
      '<button type="button" class="small-primary-button" data-view-order="'+esc(o.id)+'">Details</button>'+
      (paymentPending(o)>0?'<button type="button" class="small-primary-button" data-collect-order="'+esc(o.id)+'">Collect '+money(paymentPending(o))+'</button>':"")+
      '<button type="button" class="small-secondary-button" data-edit-order="'+esc(o.id)+'">Edit</button>'+
      '<button type="button" class="small-secondary-button" data-delete-order="'+esc(o.id)+'">Delete</button>'+
      '</div>';
  }).join("");

  bindDynamicActions();
}

function renderCustomers(){
  const box=$("customersList");
  if(!box)return;

  const query=String($("customerSearch")?.value||"").toLowerCase().trim();

  const customers=getDB().customers.filter(function(c){
    return (String(c.name)+" "+String(c.phone)).toLowerCase().includes(query);
  });

  if(!customers.length){
    box.innerHTML='<div class="empty-state"><div class="empty-icon">CUS</div><h3>No customers found</h3><p>Customers will appear here after you create orders.</p></div>';
    return;
  }

  box.innerHTML=customers.map(function(c){
    return '<div class="data-card">'+
      '<div><strong>'+esc(c.name)+'</strong><p>'+esc(c.phone)+'</p><small>'+c.totalOrders+' orders · Pending '+money(c.pendingAmount)+'</small></div>'+
      '<div><strong>'+money(c.totalSpending)+'</strong><div class="order-actions">'+
      '<button type="button" class="small-primary-button" data-customer="'+esc(c.id)+'">View</button>'+
      '<button type="button" class="small-secondary-button" data-customer-new="'+esc(c.id)+'">New Order</button>'+
      '</div></div>'+
      '</div>';
  }).join("");

  bindDynamicActions();
}

function renderProducts(){
  const box=$("productsList");
  if(!box)return;

  const products=getDB().products||[];

  if(!products.length){
    box.innerHTML='<div class="empty-state"><div class="empty-icon">CAT</div><h3>No products or services</h3><p>Add your first product or service.</p><button type="button" class="small-primary-button" data-action="add-product">Add Product</button></div>';
    bindDynamicActions();
    return;
  }

  box.innerHTML=products.map(function(p){
    return '<div class="data-card">'+
      '<div><strong>'+esc(p.name)+'</strong><p>'+esc(p.category||"General")+'</p></div>'+
      '<div><strong>'+money(p.price)+'</strong><div class="order-actions">'+
      '<button type="button" class="small-primary-button" data-edit-product="'+esc(p.id)+'">Edit</button>'+
      '<button type="button" class="small-secondary-button" data-delete-product="'+esc(p.id)+'">Delete</button>'+
      '</div></div>'+
      '</div>';
  }).join("");

  bindDynamicActions();
}

function addProduct(){
  const name=prompt("Product / Service name:");
  if(!name||!name.trim())return;

  const price=Number(prompt("Price:","0"));
  if(!Number.isFinite(price)||price<0){
    toast("Enter a valid price");
    return;
  }

  const category=prompt("Category:","General")||"General";
  const db=getDB();

  db.products.push({
    id:uid("prd"),
    name:name.trim(),
    category:category.trim()||"General",
    price:price,
    active:true,
    createdAt:new Date().toISOString()
  });

  saveDB(db);
  renderProducts();
  toast("Product added");
}

function editProduct(id){
  const db=getDB();
  const product=db.products.find(p=>p.id===id);
  if(!product)return;

  const name=prompt("Product / Service name:",product.name);
  if(!name||!name.trim())return;

  const price=Number(prompt("Price:",product.price));
  if(!Number.isFinite(price)||price<0){
    toast("Enter a valid price");
    return;
  }

  const category=prompt("Category:",product.category||"General");

  product.name=name.trim();
  product.price=price;
  product.category=(category||product.category||"General").trim();

  saveDB(db);
  renderProducts();
  toast("Product updated");
}

function deleteProduct(id){
  if(!confirm("Delete this product or service?"))return;

  const db=getDB();
  db.products=db.products.filter(p=>p.id!==id);
  saveDB(db);
  renderProducts();
  toast("Product deleted");
}

function openNewOrder(existing){
  const db=getDB();
  const order=existing||null;

  const modal=document.createElement("div");
  modal.id="managexOrderModal";
  modal.className="managex-modal show";

  const items=order?(order.items||[]):[];

  modal.innerHTML=
    '<div class="modal-card">'+
    '<div class="modal-head"><div><span class="page-eyebrow">SALES</span><h2>'+(order?"Edit Order":"New Order")+'</h2></div><button type="button" class="modal-close" id="closeOrderModal">×</button></div>'+
    '<label>Customer Name *</label><input id="mxOrderName" class="mx-input" value="'+esc(order?.customerName||'')+'" placeholder="Customer name">'+
    '<label>Mobile / WhatsApp *</label><input id="mxOrderPhone" class="mx-input" maxlength="10" inputmode="numeric" value="'+esc(order?.customerPhone||'')+'" placeholder="10-digit mobile number">'+
    '<label>Product / Service</label><select id="mxOrderProduct" class="mx-input"><option value="">Select product / service</option>'+db.products.map(p=>'<option value="'+esc(p.id)+'">'+esc(p.name)+' — '+money(p.price)+'</option>').join("")+'</select>'+
    '<label>Quantity</label><input id="mxOrderQty" class="mx-input" type="number" min="1" value="1">'+
    '<label>Price</label><input id="mxOrderPrice" class="mx-input" type="number" min="0" step="0.01" value="">'+
    '<button type="button" class="small-primary-button" id="mxAddItem">Add Item</button>'+
    '<div id="mxOrderItems"></div>'+
    '<label>Notes</label><textarea id="mxOrderNotes" class="mx-input mx-textarea" rows="3">'+esc(order?.notes||'')+'</textarea>'+
    '<label>Delivery Date</label><input id="mxOrderDate" class="mx-input" type="date" value="'+esc(order?.deliveryDate||'')+'">'+
    '<label>Advance Payment</label><input id="mxOrderAdvance" class="mx-input" type="number" min="0" step="0.01" value="'+Number(paymentReceived(order)||0)+'">'+
    '<div id="mxOrderSummary" class="order-summary-box"></div>'+
    '<div id="mxOrderError" class="form-error"></div>'+
    '<button type="button" class="setup-primary-btn" id="mxSaveOrder">'+(order?"Update Order":"Save Order")+'</button>'+
    '</div>';

  document.body.appendChild(modal);

  let workingItems=items.map(function(i){
    return Object.assign({},i);
  });

  function updateItems(){
    const box=$("mxOrderItems");

    if(!workingItems.length){
      box.innerHTML='<p class="muted">No items added yet.</p>';
    }else{
      box.innerHTML=workingItems.map(function(item,index){
        return '<div class="data-card"><div><strong>'+esc(item.name)+'</strong><p>'+item.quantity+' × '+money(item.price)+'</p></div><div><strong>'+money(item.total)+'</strong><button type="button" class="small-secondary-button" data-remove-mx-item="'+index+'">Remove</button></div></div>';
      }).join("");
    }

    const total=workingItems.reduce((s,i)=>s+Number(i.total||0),0);
    const advance=Math.max(0,Number($("mxOrderAdvance").value||0));
    const received=Math.min(total,advance);

    $("mxOrderSummary").innerHTML=
      "<strong>Total: "+money(total)+"</strong><br>Received: "+money(received)+"<br>Balance: "+money(Math.max(0,total-received));

    $$("[data-remove-mx-item]").forEach(function(btn){
      btn.onclick=function(){
        workingItems.splice(Number(btn.dataset.removeMxItem),1);
        updateItems();
      };
    });
  }

  $("closeOrderModal").onclick=function(){
    modal.remove();
  };

  $("mxOrderProduct").onchange=function(){
    const p=db.products.find(x=>x.id===this.value);
    if(p)$("mxOrderPrice").value=p.price;
  };

  $("mxAddItem").onclick=function(){
    const product=db.products.find(p=>p.id===$("mxOrderProduct").value);
    const qty=Number($("mxOrderQty").value);
    const price=Number($("mxOrderPrice").value||product?.price||0);

    if(!product){
      toast("Select a product or service");
      return;
    }

    if(!Number.isFinite(qty)||qty<1){
      toast("Quantity must be at least 1");
      return;
    }

    if(!Number.isFinite(price)||price<0){
      toast("Enter a valid price");
      return;
    }

    workingItems.push({
      id:uid("item"),
      productId:product.id,
      name:product.name,
      quantity:qty,
      price:price,
      total:qty*price
    });

    $("mxOrderPrice").value="";
    $("mxOrderQty").value="1";
    updateItems();
  };

  $("mxOrderAdvance").oninput=updateItems;

  $("mxSaveOrder").onclick=function(){
    const name=$("mxOrderName").value.trim();
    const phone=cleanPhone($("mxOrderPhone").value);
    const total=workingItems.reduce((s,i)=>s+Number(i.total||0),0);
    const received=Number($("mxOrderAdvance").value||0);
    const error=$("mxOrderError");

    error.textContent="";

    if(!name){
      error.textContent="Customer name is required.";
      return;
    }

    if(!/^[6-9]\d{9}$/.test(phone)){
      error.textContent="Enter a valid 10-digit Indian mobile number.";
      return;
    }

    if(!workingItems.length){
      error.textContent="Add at least one product or service.";
      return;
    }

    if(!Number.isFinite(received)||received<0||received>total){
      error.textContent="Advance payment cannot be greater than total.";
      return;
    }

    if(order){
      const fresh=getDB();
      const target=fresh.orders.find(o=>o.id===order.id);
      if(!target)return;

      target.customerName=name;
      target.customerPhone=phone;
      target.items=workingItems;
      target.total=total;
      target.amountReceived=received;
      target.advance=received;
      target.balance=Math.max(0,total-received);
      target.notes=$("mxOrderNotes").value.trim();
      target.deliveryDate=$("mxOrderDate").value;
      target.status=target.balance<=0?"completed":"pending";
      target.updatedAt=new Date().toISOString();

      syncCustomers(fresh);
      saveDB(fresh);
      modal.remove();
      refreshAll();
      showBill(target.id);
      toast("Order updated");
      return;
    }

    const fresh=getDB();
    fresh.counters.order++;

    const newOrder={
      id:uid("ord"),
      orderNumber:"MX-"+String(fresh.counters.order).padStart(4,"0"),
      customerName:name,
      customerPhone:phone,
      items:workingItems,
      total:total,
      amountReceived:received,
      advance:received,
      balance:Math.max(0,total-received),
      notes:$("mxOrderNotes").value.trim(),
      deliveryDate:$("mxOrderDate").value,
      status:total-received<=0?"completed":"pending",
      createdAt:new Date().toISOString()
    };

    fresh.orders.unshift(newOrder);
    syncCustomers(fresh);
    saveDB(fresh);

    modal.remove();
    refreshAll();
    showBill(newOrder.id);
    toast("Order saved");
  };

  updateItems();
     }
function collectPayment(id){
  const db=getDB();
  const order=db.orders.find(o=>o.id===id);
  if(!order)return;

  const pending=paymentPending(order);

  if(pending<=0){
    toast("Payment is already complete");
    return;
  }

  const amount=Number(prompt("Enter payment received:",pending));

  if(!Number.isFinite(amount)||amount<=0){
    return;
  }

  if(amount>pending){
    toast("Payment cannot exceed pending amount");
    return;
  }

  order.amountReceived=paymentReceived(order)+amount;
  order.advance=order.amountReceived;
  order.balance=Math.max(0,Number(order.total||0)-order.amountReceived);
  order.status=order.balance<=0?"completed":"pending";

  syncCustomers(db);
  saveDB(db);
  refreshAll();
  toast("Payment recorded");
}

function deleteOrder(id){
  const db=getDB();
  const order=db.orders.find(o=>o.id===id);
  if(!order)return;

  if(!confirm("Delete "+(order.orderNumber||"this order")+"?"))return;

  db.orders=db.orders.filter(o=>o.id!==id);
  syncCustomers(db);
  saveDB(db);
  refreshAll();
  toast("Order deleted");
}

function showBill(id){
  const db=getDB();
  const order=db.orders.find(o=>o.id===id);
  if(!order)return;

  state.currentOrder=order;

  const b=db.business||{};
  const received=paymentReceived(order);
  const pending=paymentPending(order);

  const modal=document.createElement("div");
  modal.id="managexBillModal";
  modal.className="managex-modal show";

  modal.innerHTML=
    '<div class="modal-card">'+
    '<div class="modal-head"><div><span class="page-eyebrow">BILL</span><h2>'+esc(b.businessName||"ManageX Business")+'</h2></div><button type="button" class="modal-close" id="closeBill">×</button></div>'+
    '<div class="bill-inner">'+
    '<div class="bill-header"><div><strong>'+esc(b.businessName||"ManageX Business")+'</strong><p>'+esc(b.businessAddress||"")+'</p><p>'+esc(b.phoneNumber||"")+'</p></div><strong>'+esc(order.orderNumber)+'</strong></div>'+
    '<hr>'+
    '<p><strong>Customer:</strong> '+esc(order.customerName)+'</p>'+
    '<p><strong>Phone:</strong> '+esc(order.customerPhone)+'</p>'+
    '<p><strong>Date:</strong> '+new Date(order.createdAt).toLocaleDateString("en-IN")+'</p>'+
    '<table class="bill-table"><thead><tr><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead><tbody>'+
    (order.items||[]).map(function(i){
      return '<tr><td>'+esc(i.name)+'</td><td>'+i.quantity+'</td><td>'+money(i.price)+'</td><td>'+money(i.total)+'</td></tr>';
    }).join("")+
    '</tbody></table>'+
    '<div class="bill-total"><p>Subtotal: <strong>'+money(order.total)+'</strong></p><p>Amount Received: <strong>'+money(received)+'</strong></p><p>Balance Due: <strong>'+money(pending)+'</strong></p></div>'+
    '<p class="bill-footer">'+esc(db.settings.billFooter||"Thank you for your business.")+'</p>'+
    '</div>'+
    '<div class="order-actions">'+
    '<button type="button" class="setup-primary-btn" id="printManageXBill">Print / Save PDF</button>'+
    '<button type="button" class="setup-secondary-btn" id="shareManageXBill">WhatsApp</button>'+
    (pending>0?'<button type="button" class="small-primary-button" id="collectBillPayment">Collect '+money(pending)+'</button>':"")+
    '</div>'+
    '</div>';

  document.body.appendChild(modal);

  $("closeBill").onclick=function(){
    modal.remove();
  };

  $("printManageXBill").onclick=function(){
    window.print();
  };

  $("shareManageXBill").onclick=function(){
    shareWhatsApp(order);
  };

  const collect=$("collectBillPayment");
  if(collect){
    collect.onclick=function(){
      modal.remove();
      collectPayment(order.id);
    };
  }
}

function shareWhatsApp(order){
  const db=getDB();
  const b=db.business||{};
  const phone=cleanPhone(order.customerPhone||b.whatsappNumber||b.phoneNumber);

  if(!phone){
    toast("Customer WhatsApp number is missing");
    return;
  }

  const text=
    "*"+(b.businessName||"ManageX Business")+"*\n"+
    "Order: "+order.orderNumber+"\n"+
    "Customer: "+order.customerName+"\n"+
    "Total: "+money(order.total)+"\n"+
    "Received: "+money(paymentReceived(order))+"\n"+
    "Balance: "+money(paymentPending(order))+"\n"+
    "Thank you!";

  window.open("https://wa.me/"+phone+"?text="+encodeURIComponent(text),"_blank");
}

function showCustomer(id){
  const db=getDB();
  const customer=db.customers.find(c=>c.id===id);
  if(!customer)return;

  const orders=db.orders.filter(function(o){
    return cleanPhone(o.customerPhone)===cleanPhone(customer.phone);
  });

  const modal=document.createElement("div");
  modal.id="managexCustomerModal";
  modal.className="managex-modal show";

  modal.innerHTML=
    '<div class="modal-card">'+
    '<div class="modal-head"><div><span class="page-eyebrow">CUSTOMER</span><h2>'+esc(customer.name)+'</h2><p>'+esc(customer.phone)+'</p></div><button type="button" class="modal-close" id="closeCustomer">×</button></div>'+
    '<div class="customer-summary-grid">'+
    '<div><span>Total Orders</span><strong>'+customer.totalOrders+'</strong></div>'+
    '<div><span>Total Spending</span><strong>'+money(customer.totalSpending)+'</strong></div>'+
    '<div><span>Pending</span><strong>'+money(customer.pendingAmount)+'</strong></div>'+
    '</div>'+
    '<div class="section-header"><h3>Order History</h3></div>'+
    (orders.length?orders.map(function(o){
      return '<div class="data-card"><div><strong>'+esc(o.orderNumber)+'</strong><p>'+new Date(o.createdAt).toLocaleDateString("en-IN")+' · '+orderStatus(o)+'</p></div><div><strong>'+money(o.total)+'</strong><button type="button" class="small-primary-button" data-customer-bill="'+esc(o.id)+'">View</button></div></div>';
    }).join(""):"<p>No order history.</p>")+
    '<button type="button" class="setup-primary-btn" id="customerNewOrder">New Order</button>'+
    '</div>';

  document.body.appendChild(modal);

  $("closeCustomer").onclick=function(){
    modal.remove();
  };

  $("customerNewOrder").onclick=function(){
    modal.remove();
    openNewOrder();
  };

  $$("[data-customer-bill]").forEach(function(btn){
    btn.onclick=function(){
      modal.remove();
      showBill(btn.dataset.customerBill);
    };
  });
}

function openSettings(setting){
  const db=getDB();
  const b=db.business||{};
  const s=db.settings||{};
  const box=$("settingsContent");

  if(!box)return;

  if(setting==="business-profile"){
    box.innerHTML=
      '<div class="form-card">'+
      '<h3>Business Profile</h3>'+
      '<label>Business Name</label><input id="setBusinessName" class="mx-input" value="'+esc(b.businessName||"")+'">'+
      '<label>Owner Name</label><input id="setOwnerName" class="mx-input" value="'+esc(b.ownerName||"")+'">'+
      '<label>Phone</label><input id="setPhone" class="mx-input" value="'+esc(b.phoneNumber||"")+'">'+
      '<label>WhatsApp</label><input id="setWhatsApp" class="mx-input" value="'+esc(b.whatsappNumber||"")+'">'+
      '<label>Address</label><textarea id="setAddress" class="mx-input mx-textarea">'+esc(b.businessAddress||"")+'</textarea>'+
      '<label>GSTIN</label><input id="setGST" class="mx-input" value="'+esc(b.gstin||"")+'">'+
      '<label>Tagline</label><input id="setTagline" class="mx-input" value="'+esc(b.tagline||"")+'">'+
      '<button type="button" class="setup-primary-btn" id="saveBusinessSettings">Save Profile</button>'+
      '</div>';

    $("saveBusinessSettings").onclick=function(){
      const fresh=getDB();

      fresh.business=Object.assign({},fresh.business||{},{
        businessName:$("setBusinessName").value.trim(),
        ownerName:$("setOwnerName").value.trim(),
        phoneNumber:cleanPhone($("setPhone").value),
        whatsappNumber:cleanPhone($("setWhatsApp").value)||cleanPhone($("setPhone").value),
        businessAddress:$("setAddress").value.trim(),
        gstin:$("setGST").value.trim().toUpperCase(),
        tagline:$("setTagline").value.trim(),
        updatedAt:new Date().toISOString()
      });

      saveDB(fresh);
      updateBusinessUI();
      toast("Business profile saved");
    };
  }

  if(setting==="products"){
    box.innerHTML=
      '<div class="form-card"><h3>Products & Services</h3><p>Manage your catalog and prices.</p><button type="button" class="setup-primary-btn" id="settingsProductsBtn">Open Products</button></div>';

    $("settingsProductsBtn").onclick=function(){
      showPage("productsPage");
    };
  }

  if(setting==="orders"){
    box.innerHTML=
      '<div class="form-card"><h3>Order Settings</h3>'+
      '<label><input type="checkbox" id="setDelivery" '+(s.deliveryDate?"checked":"")+'> Enable delivery date</label>'+
      '<label><input type="checkbox" id="setAdvance" '+(s.advancePayment?"checked":"")+'> Enable advance payment</label>'+
      '<label><input type="checkbox" id="setNotes" '+(s.notes?"checked":"")+'> Enable notes</label>'+
      '<button type="button" class="setup-primary-btn" id="saveOrderSettings">Save Settings</button></div>';

    $("saveOrderSettings").onclick=function(){
      const fresh=getDB();
      fresh.settings.deliveryDate=$("setDelivery").checked;
      fresh.settings.advancePayment=$("setAdvance").checked;
      fresh.settings.notes=$("setNotes").checked;
      saveDB(fresh);
      toast("Order settings saved");
    };
  }

  if(setting==="bills"){
    box.innerHTML=
      '<div class="form-card"><h3>Bill Settings</h3>'+
      '<label>Bill Footer</label>'+
      '<textarea id="setBillFooter" class="mx-input mx-textarea">'+esc(s.billFooter||"Thank you for your business.")+'</textarea>'+
      '<label><input type="checkbox" id="setGST" '+(s.gst?"checked":"")+'> Enable GST field</label>'+
      '<button type="button" class="setup-primary-btn" id="saveBillSettings">Save Settings</button></div>';

    $("saveBillSettings").onclick=function(){
      const fresh=getDB();
      fresh.settings.billFooter=$("setBillFooter").value.trim();
      fresh.settings.gst=$("setGST").checked;
      saveDB(fresh);
      toast("Bill settings saved");
    };
  }

  if(setting==="appearance"){
    box.innerHTML=
      '<div class="form-card"><h3>Appearance</h3><p>ManageX appearance settings.</p><button type="button" class="setup-primary-btn" id="toggleThemeBtn">Toggle Theme</button></div>';

    $("toggleThemeBtn").onclick=function(){
      document.body.classList.toggle("dark-mode");
      const fresh=getDB();
      fresh.settings.theme=document.body.classList.contains("dark-mode")?"dark":"light";
      saveDB(fresh);
      toast("Appearance changed");
    };
        }

  if(setting==="subscription"){
    box.innerHTML=
      '<div class="form-card">'+
      '<h3>ManageX Subscription</h3>'+
      '<p>Choose the plan that fits your business.</p>'+
      '<div class="plan-card"><strong>Free</strong><p>₹0 · Basic business management</p></div>'+
      '<div class="plan-card"><strong>Pro</strong><p>₹99/month · Advanced features</p></div>'+
      '<div class="plan-card"><strong>Business</strong><p>₹199/month · Team features</p></div>'+
      '<button type="button" class="setup-primary-btn" id="upgradePlanBtn">Upgrade</button>'+
      '</div>';

    $("upgradePlanBtn").onclick=function(){
      toast("Secure payment integration will be connected later");
    };
  }
}

function bindDynamicActions(){
  $$("[data-view-order]").forEach(function(btn){
    btn.onclick=function(){
      showBill(btn.dataset.viewOrder);
    };
  });

  $$("[data-action='new-order']").forEach(function(btn){
    btn.onclick=function(){
      openNewOrder();
    };
  });

  $$("[data-action='add-product']").forEach(function(btn){
    btn.onclick=function(){
      addProduct();
    };
  });

  $$("[data-collect-order]").forEach(function(btn){
    btn.onclick=function(){
      collectPayment(btn.dataset.collectOrder);
    };
  });

  $$("[data-edit-order]").forEach(function(btn){
    btn.onclick=function(){
      const order=getDB().orders.find(o=>o.id===btn.dataset.editOrder);
      if(order)openNewOrder(order);
    };
  });

  $$("[data-delete-order]").forEach(function(btn){
    btn.onclick=function(){
      deleteOrder(btn.dataset.deleteOrder);
    };
  });

  $$("[data-edit-product]").forEach(function(btn){
    btn.onclick=function(){
      editProduct(btn.dataset.editProduct);
    };
  });

  $$("[data-delete-product]").forEach(function(btn){
    btn.onclick=function(){
      deleteProduct(btn.dataset.deleteProduct);
    };
  });

  $$("[data-customer]").forEach(function(btn){
    btn.onclick=function(){
      showCustomer(btn.dataset.customer);
    };
  });

  $$("[data-customer-new]").forEach(function(btn){
    btn.onclick=function(){
      const c=getDB().customers.find(x=>x.id===btn.dataset.customerNew);
      if(!c)return;
      openNewOrder({
        customerName:c.name,
        customerPhone:c.phone,
        items:[],
        total:0,
        amountReceived:0,
        advance:0,
        balance:0,
        notes:"",
        deliveryDate:""
      });
    };
  });
}

function refreshAll(){
  renderDashboard();
  renderOrders();
  renderCustomers();
  renderProducts();
}

function initSetup(){
  const grid=$("businessTypeGrid");

  if(grid){
    grid.addEventListener("click",function(event){
      const card=event.target.closest(".business-type-card");
      if(card)selectBusinessType(card);
    });
  }

  const continueBtn=$("continueSetupBtn");

  if(continueBtn){
    continueBtn.addEventListener("click",continueSetup);
  }
}

function initNavigation(){
  $$(".nav-item").forEach(function(item){
    item.addEventListener("click",function(){
      const page=item.dataset.page;
      if(page)showPage(page);
    });
  });

  const viewOrders=$("viewOrdersBtn");
  if(viewOrders){
    viewOrders.addEventListener("click",function(){
      showPage("ordersPage");
    });
  }

  const newOrder=$("newOrderBtn");
  if(newOrder){
    newOrder.addEventListener("click",function(){
      openNewOrder();
    });
  }

  const notification=$("notificationBtn");
  if(notification){
    notification.addEventListener("click",function(){
      toast("No new notifications");
    });
  }

  $$("[data-action='new-order']").forEach(function(btn){
    btn.addEventListener("click",function(){
      openNewOrder();
    });
  });

  $$("[data-action='add-product']").forEach(function(btn){
    btn.addEventListener("click",function(){
      addProduct();
    });
  });

  const search=$("customerSearch");
  if(search){
    search.addEventListener("input",renderCustomers);
  }

  $$(".filter-chip").forEach(function(chip){
    chip.addEventListener("click",function(){
      state.orderFilter=chip.dataset.filter||"all";

      $$(".filter-chip").forEach(function(c){
        c.classList.remove("active");
      });

      chip.classList.add("active");
      renderOrders();
    });
  });

  $$(".settings-item").forEach(function(item){
    item.addEventListener("click",function(){
      openSettings(item.dataset.setting);
    });
  });
}

function loadBusiness(){
  const db=getDB();

  if(!db.business||!db.business.businessType){
    openSetup();
    return;
  }

  state.businessType=db.business.businessType;

  $$(".business-type-card").forEach(function(card){
    if(card.dataset.businessType===state.businessType){
      card.classList.add("selected");
    }
  });

  syncCustomers(db);
  saveDB(db);

  openMainApp();
}

function injectStyles(){
  if($("managexRuntimeStyles"))return;

  const style=document.createElement("style");
  style.id="managexRuntimeStyles";

  style.textContent=
    ".managex-modal{position:fixed;inset:0;background:rgba(15,15,30,.48);display:flex;align-items:flex-end;justify-content:center;padding:12px;z-index:99999;opacity:0;pointer-events:none;transition:.2s}.managex-modal.show{opacity:1;pointer-events:auto}.managex-modal .modal-card{width:min(680px,100%);max-height:92vh;overflow:auto;background:#fff;border-radius:22px;padding:20px;box-shadow:0 20px 60px rgba(20,15,80,.22)}.managex-modal .modal-head{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}.managex-modal .modal-head h2{margin:4px 0}.managex-modal .modal-close{border:0;background:#f1f1f7;width:38px;height:38px;border-radius:50%;font-size:25px;cursor:pointer}.managex-modal label{display:block;margin:12px 0 6px;font-weight:600}.managex-modal .mx-input{width:100%;box-sizing:border-box}.managex-modal .order-summary-box{margin:16px 0;padding:14px;border-radius:14px;background:#f7f7fc;line-height:1.8}.managex-modal .form-error{margin:10px 0}.managex-modal .bill-inner{background:#fff;border:1px solid rgba(23,23,42,.08);padding:18px;border-radius:14px}.managex-modal .bill-header{display:flex;justify-content:space-between;gap:15px}.managex-modal .bill-table{width:100%;border-collapse:collapse;margin:18px 0}.managex-modal .bill-table th,.managex-modal .bill-table td{padding:9px 5px;border-bottom:1px solid #eee;text-align:left}.managex-modal .bill-total{border-top:1px solid #ddd;padding-top:12px}.managex-modal .bill-footer{text-align:center;margin-top:20px;color:#666}.managex-modal .order-actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}.managex-modal .customer-summary-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin:16px 0}.managex-modal .customer-summary-grid>div{background:#f7f7fc;border-radius:14px;padding:13px}.managex-modal .customer-summary-grid span{display:block;font-size:12px;color:#6b6b7a}.managex-modal .customer-summary-grid strong{display:block;margin-top:5px;font-size:18px}.plan-card{padding:16px;margin:10px 0;border:1px solid rgba(23,23,42,.08);border-radius:16px;background:#fff}.plan-card strong{font-size:17px}.plan-card p{margin:5px 0 0;color:#6b6b7a}@media(max-width:520px){.managex-modal{padding:7px}.managex-modal .modal-card{padding:16px}.managex-modal .customer-summary-grid{grid-template-columns:1fr}}";

  document.head.appendChild(style);
}

function init(){
  injectStyles();
  initSetup();
  initNavigation();
  loadBusiness();
  refreshAll();
}

document.addEventListener("DOMContentLoaded",init);
                    
