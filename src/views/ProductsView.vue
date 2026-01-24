<template>
  <div class="products-view py-5">
    <div class="container">
      <div class="row">
        <!-- Filters Sidebar -->
        <div class="col-lg-3 mb-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Filters</h5>
            </div>
            <div class="card-body">
              <!-- Search -->
              <div class="mb-3">
                <label class="form-label">Search</label>
                <input v-model="filters.search" type="text" class="form-control" placeholder="Search products...">
              </div>
              
              <!-- Category -->
              <div class="mb-3">
                <label class="form-label">Category</label>
                <select v-model="filters.categoryId" class="form-select">
                  <option value="">All Categories</option>
                  <option v-for="category in productStore.categories" :key="category.id" :value="category.id">
                    {{ category.name }}
                  </option>
                </select>
              </div>
              
              <!-- Price Range -->
              <div class="mb-3">
                <label class="form-label">Price Range</label>
                <div class="row">
                  <div class="col-6">
                    <input v-model.number="filters.minPrice" type="number" class="form-control" placeholder="Min">
                  </div>
                  <div class="col-6">
                    <input v-model.number="filters.maxPrice" type="number" class="form-control" placeholder="Max">
                  </div>
                </div>
              </div>
              
              <!-- Brand -->
              <div class="mb-3">
                <label class="form-label">Brand</label>
                <input v-model="filters.brand" type="text" class="form-control" placeholder="Brand name">
              </div>
              
              <button @click="applyFilters" class="btn btn-primary w-100">
                <i class="bi bi-funnel me-1"></i>Apply Filters
              </button>
            </div>
          </div>
        </div>
        
        <!-- Products Grid -->
        <div class="col-lg-9">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h2>Products</h2>
            <div class="d-flex align-items-center">
              <span class="text-muted me-2">Sort by:</span>
              <select v-model="sortBy" @change="fetchProducts" class="form-select form-select-sm" style="width: auto;">
                <option value="id">Default</option>
                <option value="price">Price: Low to High</option>
                <option value="price,desc">Price: High to Low</option>
                <option value="name">Name: A-Z</option>
              </select>
            </div>
          </div>
          
          <div v-if="loading" class="text-center py-5">
            <div class="spinner-border text-primary" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          
          <div v-else-if="products.length === 0" class="text-center py-5">
            <i class="bi bi-search display-1 text-muted"></i>
            <h4 class="text-muted">No products found</h4>
          </div>
          
          <div v-else class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
            <ProductCard v-for="product in products" :key="product.id" :product="product"   />
          </div>
          
          <!-- Pagination -->
          <nav v-if="totalPages > 1" class="mt-5">
            <ul class="pagination justify-content-center">
              <li class="page-item" :class="{ disabled: currentPage === 0 }">
                <button class="page-link" @click="changePage(currentPage - 1)">Previous</button>
              </li>
              <li v-for="page in visiblePages" :key="page" 
                  class="page-item" :class="{ active: page === currentPage }">
                <button class="page-link" @click="changePage(page)">{{ page + 1 }}</button>
              </li>
              <li class="page-item" :class="{ disabled: currentPage === totalPages - 1 }">
                <button class="page-link" @click="changePage(currentPage + 1)">Next</button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed , watch} from 'vue'
import { useProductStore } from '@/stores/product'
import ProductCard from '@/components/ProductCard.vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const products = ref([])
const loading = ref(false)
const currentPage = ref(0)
const totalPages = ref(0)
const totalItems = ref(0)
const sortBy = ref('id')

const filters = ref({
  search: '',
  categoryId: '',
  minPrice: null,
  maxPrice: null,
  brand: '',
  categoryId: '',
})

const visiblePages = computed(() => {
  const pages = []
  const start = Math.max(0, currentPage.value - 2)
  const end = Math.min(totalPages.value, start + 5)
  
  for (let i = start; i < end; i++) {
    pages.push(i)
  }
  return pages
})

const fetchProducts = async () => {
  loading.value = true
  const params = {
    page: currentPage.value,
    size: 9,
    sort: sortBy.value
  }
  
  if (filters.value.search) params.search = filters.value.search
  if (filters.value.categoryId) params.categoryId = filters.value.categoryId
  if (filters.value.minPrice) params.minPrice = filters.value.minPrice
  if (filters.value.maxPrice) params.maxPrice = filters.value.maxPrice
  if (filters.value.brand) params.brand = filters.value.brand
  
  const result = await productStore.searchProducts(params)
  products.value = result.products || []
  totalPages.value = result.totalPages || 0
  totalItems.value = result.totalItems || 0
  loading.value = false
}

const applyFilters = () => {
  currentPage.value = 0
  fetchProducts()
  updateRouteParams()
}
const updateRouteParams = () => {
  const query = { ...route.query }
  if (filters.value.categoryId) {
    query.category = filters.value.categoryId
  } else {
    delete query.category
  }

  router.replace({ query })
}

watch(
  () => route.query.category,
  (newCategoryId) => {
    if (newCategoryId !== filters.value.categoryId) {
      filters.value.categoryId = newCategoryId || ''
      currentPage.value = 0 
      fetchProducts() 
    }
  },
  { immediate: true } 
)



const changePage = (page) => {
  if (page >= 0 && page < totalPages.value) {
    currentPage.value = page
    fetchProducts()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
}

onMounted(async () => {
  await productStore.fetchCategories()
  filters.value.categoryId = route.query.category || ''
  fetchProducts()
})
</script>
