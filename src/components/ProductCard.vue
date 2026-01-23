<template>
  <div class="col">
    <div class="card h-100 shadow-sm product-card">
      <div class="position-relative">
        <img :src="product.imageUrl || '/images/placeholder.jpg'" 
             :alt="product.name" 
             class="card-img-top product-image"
             @click.stop="clickToDetail(product.id)"
             >
        <div v-if="product.stockQuantity <= 0" class="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50">
          <span class="badge bg-danger fs-6">Out of Stock</span>
        </div>
      </div>
      
      <div class="card-body d-flex flex-column">
        <h6 class="card-title mb-2">{{ product.name }}</h6>
        <p class="card-text text-muted small mb-2">{{ product.brand }}</p>
        <div class="mt-auto">
          <div class="d-flex justify-content-between align-items-center mb-2">
            <span class="h5 mb-0 text-primary">${{ product.price }}</span>
          </div>
          <button 
            @click="addToCart"
            :disabled="product.stockQuantity <= 0"
            class="btn btn-primary w-100">
            <i class="bi bi-cart-plus me-1"></i>Add to Cart
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '@/stores/cart'
import router from '@/router'
const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()

const addToCart = () => {
  if (props.product.stockQuantity > 0) {
    cartStore.addItem(props.product)
  }
}
const clickToDetail = (id) => {
    router.push(`/products/${id}`)
}

</script>

<style scoped>
.product-card {
  transition: transform 0.2s;
}

.product-card:hover {
  transform: translateY(-5px);
}

.product-image {
  height: 200px;
  object-fit: cover;
}
</style>
