<template>
  <header class="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">
    <div class="container">
      <RouterLink class="navbar-brand fw-bold" to="/">
        <i class="bi bi-music-note-beamed me-2"></i>MusicStore
      </RouterLink>
      
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
        <span class="navbar-toggler-icon"></span>
      </button>
      
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto">
          <li class="nav-item">
            <RouterLink class="nav-link" to="/">Home</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="/products">Products</RouterLink>
          </li>
        </ul>
        
        <div class="d-flex align-items-center">
          <div class="position-relative me-3">
            <RouterLink to="/cart" class="btn btn-outline-light position-relative">
              <i class="bi bi-cart3"></i>
              <span v-if="cartStore.itemCount > 0" class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {{ cartStore.itemCount }}
              </span>
            </RouterLink>
          </div>
          
          <div v-if="authStore.isAuthenticated" class="dropdown">
            <button class="btn btn-outline-light dropdown-toggle" type="button" data-bs-toggle="dropdown">
              <i class="bi bi-person-circle me-1"></i>{{ authStore.user?.username }}
            </button>
            <ul class="dropdown-menu">
              <li><RouterLink class="dropdown-item" to="/orders">My Orders</RouterLink></li>
              <li><hr class="dropdown-divider"></li>
              <li><button class="dropdown-item" @click="handleLogout">Logout</button></li>
            </ul>
          </div>
          
          <div v-else>
            <RouterLink to="/login" class="btn btn-outline-light me-2">Login</RouterLink>
            <RouterLink to="/register" class="btn btn-light">Register</RouterLink>
          </div>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'
import { useCartStore } from '@/stores/cart'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const cartStore = useCartStore()
const router = useRouter()

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
