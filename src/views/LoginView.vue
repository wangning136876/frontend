<template>
  <div class="login-view py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <i class="bi bi-person-circle display-1 text-primary"></i>
                <h2 class="mt-3">Login</h2>
                <p class="text-muted">Welcome back! Please login to your account.</p>
              </div>
              
              <form @submit.prevent="handleLogin">
                <div class="mb-3">
                  <label for="username" class="form-label">Username</label>
                  <input 
                    v-model="form.username" 
                    type="text" 
                    id="username"
                    class="form-control" 
                    :class="{ 'is-invalid': errors.username }"
                    required>
                  <div v-if="errors.username" class="invalid-feedback">
                    {{ errors.username }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password</label>
                  <div class="input-group">
                    <input 
                      v-model="form.password" 
                      :type="showPassword ? 'text' : 'password'" 
                      id="password"
                      class="form-control" 
                      :class="{ 'is-invalid': errors.password }"
                      required>
                    <button @click="showPassword = !showPassword" type="button" class="btn btn-outline-secondary">
                      <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                    </button>
                    <div v-if="errors.password" class="invalid-feedback">
                      {{ errors.password }}
                    </div>
                  </div>
                </div>
                
                <div v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>
                
                <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Logging in...' : 'Login' }}
                </button>
                
                <div class="text-center">
                  <p class="mb-0">Don't have an account? 
                    <RouterLink to="/register">Sign up here</RouterLink>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const form = ref({
  username: '',
  password: ''
})

const errors = ref({})
const errorMessage = ref('')
const loading = ref(false)
const showPassword = ref(false)

const handleLogin = async () => {
  errors.value = {}
  errorMessage.value = ''
  loading.value = true
  
  const result = await authStore.login(form.value)
  
  if (result.success) {
    router.push('/')
  } else {
    console.log(errorMessage,"errorMessage")
    errorMessage.value = result.message || 'Login failed'
  }
  
  loading.value = false
}
</script>
