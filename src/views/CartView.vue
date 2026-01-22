<template>
  <div class="cart-view py-5">
    <div class="container">
      <h1 class="mb-4">Shopping Cart</h1>
      
      <div v-if="cartStore.items.length === 0" class="text-center py-5">
        <i class="bi bi-cart-x display-1 text-muted"></i>
        <h4 class="text-muted mt-3">Your cart is empty</h4>
        <RouterLink to="/products" class="btn btn-primary mt-3">
          <i class="bi bi-shop me-2"></i>Continue Shopping
        </RouterLink>
      </div>
      
      <div v-else class="row">
        <div class="col-lg-8">
          <div class="card">
            <div class="card-body">
              <div class="table-responsive">
                <table class="table">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Subtotal</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="item in cartStore.items" :key="item.id">
                      <td>
                        <div class="d-flex align-items-center">
                          <img :src="item.image || '/images/placeholder.jpg'" 
                               :alt="item.name" 
                               class="cart-item-image me-3">
                          <div>
                            <h6 class="mb-0">{{ item.name }}</h6>
                            <small class="text-muted">{{ item.brand }}</small>
                          </div>
                        </div>
                      </td>
                      <td>${{ item.price }}</td>
                      <td>
                        <div class="input-group input-group-sm" style="width: 120px;">
                          <button @click="updateQuantity(item.id, item.quantity - 1)" 
                                  class="btn btn-outline-secondary" type="button">-</button>
                          <input v-model.number="item.quantity" 
                                 @change="updateQuantity(item.id, item.quantity)"
                                 type="number" 
                                 class="form-control text-center" 
                                 min="1">
                          <button @click="updateQuantity(item.id, item.quantity + 1)" 
                                  class="btn btn-outline-secondary" type="button">+</button>
                        </div>
                      </td>
                      <td>${{ (item.price * item.quantity).toFixed(2) }}</td>
                      <td>
                        <button @click="removeItem(item.id)" class="btn btn-sm btn-danger">
                          <i class="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Order Summary -->
        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
              <div class="d-flex justify-content-between mb-2">
                <span>Subtotal</span>
                <span>${{ cartStore.totalPrice.toFixed(2) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div class="d-flex justify-content-between mb-2">
                <span>Tax</span>
                <span>${{ (cartStore.totalPrice * 0.08).toFixed(2) }}</span>
              </div>
              <hr>
              <div class="d-flex justify-content-between fw-bold h5">
                <span>Total</span>
                <span>${{ (cartStore.totalPrice * 1.08).toFixed(2) }}</span>
              </div>
              
              <RouterLink to="/checkout" class="btn btn-primary w-100 mt-3">
                <i class="bi bi-credit-card me-2"></i>Proceed to Checkout
              </RouterLink>
              
              <RouterLink to="/products" class="btn btn-outline-secondary w-100 mt-2">
                Continue Shopping
              </RouterLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

const updateQuantity = (productId, quantity) => {
  if (quantity >= 1) {
    cartStore.updateQuantity(productId, quantity)
  }
}

const removeItem = (productId) => {
  cartStore.removeItem(productId)
}
</script>

<style scoped>
.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}
</style>
