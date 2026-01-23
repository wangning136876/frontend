<template>
  <div class="product-detail-view py-5">
    <div class="container">
      <div v-if="loading" class="text-center py-5">
        <div class="spinner-border text-primary" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      
      <div v-else-if="product" class="row">
        <!-- Product Images -->
        <div class="col-lg-6 mb-4">
          <div class="card">
            <img :src="product.imageUrl || '/images/placeholder.jpg'" 
                 :alt="product.name" 
                 class="card-img-top product-main-image">
          </div>
        </div>
        
        <!-- Product Info -->
        <div class="col-lg-6">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb">
              <li class="breadcrumb-item"><RouterLink to="/">Home</RouterLink></li>
              <li class="breadcrumb-item"><RouterLink to="/products">Products</RouterLink></li>
              <li class="breadcrumb-item active">{{ product.name }}</li>
            </ol>
          </nav>
          
          <h1 class="h3 mb-2">{{ product.name }}</h1>
          <p class="text-muted mb-3">{{ product.brand }}</p>
          
          <div class="price-section mb-4">
            <span class="h2 text-primary fw-bold">${{ product.price }}</span>
            <span v-if="product.stockQuantity <= 0" class="badge bg-danger ms-3">Out of Stock</span>
            <span v-else class="badge bg-success ms-3">In Stock</span>
          </div>
          
          <div class="description mb-4">
            <h5>Description</h5>
            <p>{{ product.description }}</p>
          </div>
          
          <div class="specifications mb-4">
            <h5>Specifications</h5>
            <table class="table table-striped">
              <tbody>
                <tr>
                  <td>Brand</td>
                  <td>{{ product.brand }}</td>
                </tr>
                <!-- <tr>
                  <td>Category</td>
                  <td>{{ product.category?.name }}</td>
                </tr> -->
                <!-- <tr>
                  <td>Stock</td>
                  <td>{{ product.stockQuantity }} units</td>
                </tr> -->
              </tbody>
            </table>
          </div>
          
          <div class="add-to-cart-section">
            <div class="row g-3">
              <div class="col-auto">
                <label for="quantity" class="visually-hidden">Quantity</label>
                <input 
                  v-model.number="quantity" 
                  type="number" 
                  id="quantity"
                  class="form-control" 
                  min="1" 
                  :max="product.stockQuantity"
                  style="width: 80px;">
              </div>
              <div class="col">
                <button 
                  @click="addToCart"
                  :disabled="product.stockQuantity <= 0"
                  class="btn btn-primary w-100">
                  <i class="bi bi-cart-plus me-2"></i>Add to Cart
                </button>
              </div>
            </div>
            
            <div v-if="addedToCart" class="alert alert-success mt-3">
              <i class="bi bi-check-circle me-2"></i>Product added to cart!
            </div>
          </div>
        </div>
      </div>
      
      <div v-else class="text-center py-5">
        <i class="bi bi-x-circle display-1 text-danger"></i>
        <h4 class="text-muted">Product not found</h4>
        <RouterLink to="/products" class="btn btn-primary mt-3">
          Back to Products
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'

const route = useRoute()
const productStore = useProductStore()
const cartStore = useCartStore()

const product = ref(null)
const loading = ref(true)
const quantity = ref(1)
const addedToCart = ref(false)

const addToCart = () => {
  if (product.value && product.value.stockQuantity > 0) {
    cartStore.addItem(product.value, quantity.value)
    addedToCart.value = true
    setTimeout(() => {
      addedToCart.value = false
    }, 3000)
  }
}

onMounted(async () => {
  const productId = parseInt(route.params.id)
  product.value = await productStore.fetchProduct(productId)
  loading.value = false
})
</script>

<style scoped>
.product-main-image {
  max-height: 500px;
  object-fit: cover;
}
</style>
