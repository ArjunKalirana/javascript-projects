const cart = {};
let products = [];


document.addEventListener('DOMContentLoaded',()=>{
  fetch('data.json')
  .then(res=>res.json())
  .then(data=>{
    products = data;
    renderProducts(products);
  })
})

function renderProducts(products){
  const container = document.getElementById('items-container');
  products.forEach((product,index)=>{
    const item = document.createElement('div');
    item.className='item-element';
    item.innerHTML=`
    <img src="${product.image.mobile}" alt="${product.name}" class="images">
    <div id= "cart-container-${index}">
    <button type="submit" class="button" onclick="addToCart(${index})">
    <img src="./assets/images/icon-add-to-cart.svg" alt="cart">Add to Cart
    </button></div>
    <div class="content">
    <div class="type">${product.category}</div>
        <div class="name">${product.name}</div>
        <div class="price">$${product.price.toFixed(2)}</div>
    </div>`;
    container.appendChild(item);
  })
}





function addToCart(index) {
  if(cart[index]){
    cart[index].quantity+=1;
  }else{
    cart[index]={
      product:products[index],
      quantity:1
    }
  }
  updateCartUI(index);
  updateCartDisplay();
}

function increaseQty(index) {
  cart[index].quantity+=1;
  updateCartUI(index);
  updateCartDisplay();

}

function decreaseQty(index) {
  cart[index].quantity--;
  if (cart[index].quantity <= 0) {
    delete cart[index];
    resetCartUI(index);
  } else {
    updateCartUI(index);
  }
  updateCartDisplay();

}

function updateCartUI(index) {
  const container = document.getElementById(`cart-container-${index}`);
  container.innerHTML = `
    <div class="button orange" >
      <div class="qty-btn" onclick="decreaseQty(${index})">−</div>
      <span>${cart[index].quantity}</span>
      <div class="qty-btn" onclick="increaseQty(${index})">+</div>
    </div>
  `;
}

function resetCartUI(index) {
  const container = document.getElementById(`cart-container-${index}`);
  container.innerHTML = `
    <button type="submit" class="button" onclick="addToCart(${index})">
      <img src="./assets/images/icon-add-to-cart.svg" alt="">Add to Cart
    </button>
  `;
}


function updateCartDisplay(){
  const cartKeys = Object.keys(cart);
  const cartCount = cartKeys.reduce((total,key)=>total + cart[key].quantity,0);
  const cartTotal = cartKeys.reduce(
    (total,key)=>total+cart[key].quantity*cart[key].product.price,0
  )

  document.getElementById('cart-count').textContent=cartCount;
  document.getElementById('total-price').textContent=`$${cartTotal.toFixed(2)}`;

  const emptyCart = document.getElementById('empty-cart');
  const cartItems = document.getElementById('cart-items');

  if(cartCount===0){
    emptyCart.style.display='block';
    cartItems.style.display= 'none';

  }else{
    emptyCart.style.display='none';
    cartItems.style.display='block';
    renderCartItems();
  }
}

function renderCartItems(){
  const cartList = document.getElementById('cart-list');
  cartList.innerHTML='';

  Object.keys(cart).forEach(index =>{
    const item = cart[index];
    const totalPrice = (item.quantity*item.product.price).toFixed(2);

  const el = document.createElement('div');
  el.className='ord';
  el.innerHTML = `
  <div class="order">
  <div class="name">${item.product.name}</div>
  <div class="quality">
  <div class="quantity">${item.quantity}x</div>
  <div class="pric">@ $${item.product.price.toFixed(2)}</div>
  <div class= "tprice">$${totalPrice}</div>
  </div>
  </div>
  <div class="cross" onclick="removeFromCart(${index})">X</div>`
  cartList.appendChild(el);

  })
  
}

function removeFromCart(index){
  delete cart[index];
  resetCartUI(index);
  updateCartDisplay();
}

function confirmOrder() {
  if(Object.keys(cart).length ===0) return;

  renderModalItems();
  document.getElementById('modal-total-price').textContent = document.getElementById('total-price').textContent;

  document.getElementById('order-modal').classList.add('show');
  document.body.style.overflow = 'hidden';

}

function renderModalItems(){
  const modalList = document.getElementById('modal-items-list');
  modalList.innerHTML = '';

  Object.keys(cart).forEach(index=>{
    const item = cart[index];
    const total = (item.product.price*item.quantity).toFixed(2);

    const el= document.createElement('div');
    el.className ='modal-item';
    el.innerHTML=`
    <span>${item.quantity}x ${item.product.name}</span>
    <span>$${total}</span>`;
    modalList.appendChild(el);

  })
}

function startNewOrder(){
  Object.keys(cart).forEach(index=>{
    resetCartUI(index);
  });
  for(let key in cart) delete cart[key];

  updateCartDisplay();
  document.getElementById('order-modal').classList.remove('show');
  document.body.style.overflow='auto';
}

document.getElementById('order-modal').addEventListener('click',function(e){
  if(e.target==this){
    this.classList.remove('show');
    document.body.style.overflow='auto';
  }
})