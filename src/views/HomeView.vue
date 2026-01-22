<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero-section bg-primary text-white py-5">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-lg-6">
            <h1 class="display-4 fw-bold mb-4">Discover Your Sound</h1>
            <p class="lead mb-4">Find the perfect musical instrument to express your creativity. From guitars to keyboards, we have everything you need.</p>
            <RouterLink to="/products" class="btn btn-light btn-lg">
              <i class="bi bi-shop me-2"></i>Shop Now
            </RouterLink>
          </div>
          <div class="col-lg-6">
            <div class="text-center">
              <i class="bi bi-music-note-beamed display-1 opacity-75"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="py-5">
      <div class="container">
        <h2 class="text-center mb-5">Shop by Category</h2>
        <div class="row g-4">
          <div v-for="category in cate" :key="category.id" class="col-md-4">
            <div class="card category-card h-100 shadow-sm">
              <div class="card-body text-center">
                <div class="category-img-container">
                <img 
                  :src="category.imageUrl" 
                  :alt="category.name" 
                  class="category-img"
                >
              </div>

                <h5 class="card-title">{{ category.name }}</h5>
                <p class="card-text text-muted">{{ category.description }}</p>
                <RouterLink :to="`/products?category=${category.id}`" class="btn btn-outline-primary">
                  View Products
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products -->
    <section class="py-5 bg-light">
      <div class="container">
        <h2 class="text-center mb-5">Featured Products</h2>
        <div v-if="loading" class="text-center">
          <div class="spinner-border text-primary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
        </div>
        <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          <ProductCard v-for="product in featuredProducts" :key="product.id" :product="product" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'

const productStore = useProductStore()
const featuredProducts = ref([])
const cate = ref([])
const categories = ref([
  { id: 1, name: 'Guitars', description: 'Electric and acoustic guitars' },
  { id: 2, name: 'Keyboards', description: 'Digital pianos and synthesizers' },
  { id: 3, name: 'Drums', description: 'Drum sets and percussion' },
  { id: 4, name: 'Bass', description: 'Bass guitars' },
  { id: 5, name: 'Microphones', description: 'Recording microphones' }
])
const loading = ref(true)

onMounted(
  async () => {
  const result = await productStore.fetchProducts({ page: 0, size: 4 })
  featuredProducts.value = result.products || []
  const cate1 = await productStore.fetchCategories()
  cate.value = cate1 || []
  console.log(cate.value)
  loading.value = false

}
)
</script>

<style scoped>
.hero-section {
  background: linear-gradient(135deg, #1e3a5f 0%, #2e5c8a 100%);
}

.category-card {
  transition: transform 0.2s;
}

.category-card:hover {
  transform: translateY(-5px);
}

.category-img-container {
  margin-bottom: 10px;
  height: 200px; 
  overflow: hidden;
}

.category-img {
  width: 100%;
  height: 100%;
  object-fit: cover; 
  transition: transform 0.3s ease;
}

.category-icon {
  font-size: 3rem;
  color: #1e3a5f;
}
</style>
