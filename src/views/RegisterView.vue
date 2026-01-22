<template>
  <div class="register-view py-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6 col-lg-5">
          <div class="card shadow">
            <div class="card-body p-4">
              <div class="text-center mb-4">
                <i class="bi bi-person-plus display-1 text-primary"></i>
                <h2 class="mt-3">Register</h2>
                <p class="text-muted">Create your account to start shopping</p>
              </div>
              
              <form @submit.prevent="handleRegister">
                <div class="mb-3">
                  <label for="fullName" class="form-label">Full Name *</label>
                  <input 
                    v-model="form.fullName" 
                    type="text" 
                    id="fullName"
                    class="form-control" 
                    :class="{ 'is-invalid': errors.fullName }"
                    required>
                  <div v-if="errors.fullName" class="invalid-feedback">
                    {{ errors.fullName }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="username" class="form-label">Username *</label>
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
                  <label for="email" class="form-label">Email *</label>
                  <input 
                    v-model="form.email" 
                    type="email" 
                    id="email"
                    class="form-control" 
                    :class="{ 'is-invalid': errors.email }"
                    required>
                  <div v-if="errors.email" class="invalid-feedback">
                    {{ errors.email }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input 
                    v-model="form.phoneNumber" 
                    type="tel" 
                    id="phone"
                    class="form-control" 
                    :class="{ 'is-invalid': errors.phoneNumber }">
                  <div v-if="errors.phoneNumber" class="invalid-feedback">
                    {{ errors.phoneNumber }}
                  </div>
                </div>
                
                <div class="mb-3">
                  <label for="password" class="form-label">Password *</label>
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
                  <small class="form-text text-muted">Minimum 6 characters</small>
                </div>
                
                <div v-if="errorMessage" class="alert alert-danger">
                  {{ errorMessage }}
                </div>
                
                <div v-if="successMessage" class="alert alert-success">
                  {{ successMessage }}
                </div>
                
                <button type="submit" class="btn btn-primary w-100 mb-3" :disabled="loading">
                  <span v-if="loading" class="spinner-border spinner-border-sm me-2"></span>
                  {{ loading ? 'Creating Account...' : 'Register' }}
                </button>
                
                <div class="text-center">
                  <p class="mb-0">Already have an account? 
                    <RouterLink to="/login">Login here</RouterLink>
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
  fullName: '',
  username: '',
  email: '',
  phoneNumber: '',
  password: ''
})

const errors = ref({})
const errorMessage = ref('')
const successMessage = ref('')
const loading = ref(false)
const showPassword = ref(false)

const handleRegister = async () => {
  errors.value = {}
  errorMessage.value = ''
  successMessage.value = ''
  loading.value = true
  
  const result = await authStore.register(form.value)
  
  if (result.success) {
    successMessage.value = result.message || 'Registration successful! Please login.'
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  } else {
    errorMessage.value = result.message || 'Registration failed'
  }
  
  loading.value = false
}
</script>
