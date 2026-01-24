<template>
  <div class="checkout-view py-5">
    <div class="container">
      <h1 class="mb-4">Checkout</h1>
      

      <div class="row mb-5">
        <div class="col-12">
          <div class="progress-steps d-flex justify-content-between">
            <div class="step" :class="{ active: currentStep >= 1, completed: currentStep > 1 }">
              <div class="step-number">1</div>
              <div class="step-label">Shipping</div>
            </div>
            <div class="step" :class="{ active: currentStep >= 2, completed: currentStep > 2 }">
              <div class="step-number">2</div>
              <div class="step-label">Payment</div>
            </div>
            <div class="step" :class="{ active: currentStep >= 3, completed: currentStep > 3 }">
              <div class="step-number">3</div>
              <div class="step-label">Review</div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col-lg-8">

          <div v-if="currentStep === 1" class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Shipping Address</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="nextStep">
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Full Name *</label>
                    <input v-model="shippingAddress.fullName" type="text" class="form-control" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Phone Number *</label>
                    <input v-model="shippingAddress.phone" type="tel" class="form-control" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Address Line 1 *</label>
                  <input v-model="shippingAddress.address1" type="text" class="form-control" required>
                </div>
                <div class="mb-3">
                  <label class="form-label">Address Line 2</label>
                  <input v-model="shippingAddress.address2" type="text" class="form-control">
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">City *</label>
                    <input v-model="shippingAddress.city" type="text" class="form-control" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Postal Code *</label>
                    <input v-model="shippingAddress.postalCode" type="text" class="form-control" required>
                  </div>
                </div>
                <button type="submit" class="btn btn-primary">Continue to Payment</button>
              </form>
            </div>
          </div>
          

          <div v-if="currentStep === 2" class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Payment Information</h5>
            </div>
            <div class="card-body">
              <form @submit.prevent="nextStep">
                <div class="mb-3">
                  <label class="form-label">Card Number *</label>
                  <input v-model="paymentInfo.cardNumber" type="text" class="form-control" placeholder="1234 5678 9012 3456" required>
                </div>
                <div class="row">
                  <div class="col-md-6 mb-3">
                    <label class="form-label">Expiry Date *</label>
                    <input v-model="paymentInfo.expiryDate" type="text" class="form-control" placeholder="MM/YY" required>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label class="form-label">CVV *</label>
                    <input v-model="paymentInfo.cvv" type="text" class="form-control" placeholder="123" required>
                  </div>
                </div>
                <div class="mb-3">
                  <label class="form-label">Cardholder Name *</label>
                  <input v-model="paymentInfo.cardholderName" type="text" class="form-control" required>
                </div>
                <button type="button" @click="prevStep" class="btn btn-secondary me-2">Back</button>
                <button type="submit" class="btn btn-primary">Continue to Review</button>
              </form>
            </div>
          </div>
          

          <div v-if="currentStep === 3" class="card mb-4">
            <div class="card-header">
              <h5 class="mb-0">Review Your Order</h5>
            </div>
            <div class="card-body">
              <h6>Shipping Address</h6>
              <p class="text-muted">
                {{ shippingAddress.fullName }}<br>
                {{ shippingAddress.address1 }}<br>
                {{ shippingAddress.address2 }}<br>
                {{ shippingAddress.city }}, {{ shippingAddress.postalCode }}
              </p>
              
              <h6 class="mt-4">Order Items</h6>
              <div class="table-responsive">
                <table class="table table-sm">
                  <tbody>
                    <tr v-for="item in cartStore.items" :key="item.id">
                      <td>{{ item.name }}</td>
                      <td>Qty: {{ item.quantity }}</td>
                      <td class="text-end">${{ (item.price * item.quantity).toFixed(2) }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <button type="button" @click="prevStep" class="btn btn-secondary me-2">Back</button>
              <button @click="placeOrder" class="btn btn-success" :disabled="placingOrder">
                <span v-if="placingOrder" class="spinner-border spinner-border-sm me-2"></span>
                Place Order
              </button>
            </div>
          </div>
        </div>
        

        <div class="col-lg-4">
          <div class="card">
            <div class="card-header">
              <h5 class="mb-0">Order Summary</h5>
            </div>
            <div class="card-body">
              <div v-for="item in cartStore.items" :key="item.id" class="d-flex justify-content-between mb-2">
                <span>{{ item.name }} (x{{ item.quantity }})</span>
                <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
              </div>
              <hr>
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
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '@/stores/cart'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import api from '@/services/api' 

const cartStore = useCartStore()
const authStore = useAuthStore()
const router = useRouter()

const currentStep = ref(1)
const placingOrder = ref(false)

const shippingAddress = ref({
  fullName: '',
  phone: '',
  address1: '',
  address2: '',
  city: '',
  postalCode: ''
})

const paymentInfo = ref({
  cardNumber: '',
  expiryDate: '',
  cvv: '',
  cardholderName: ''
})

const nextStep = () => {
  if (currentStep.value < 3) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}


const placeOrder = async () => {
  placingOrder.value = true
  
  try {

    const userId = authStore.user?.id
    if (!userId) {
      throw new Error('You must be logged in to place an order')
    }


    const fullShippingAddress = `${shippingAddress.value.fullName}, ${shippingAddress.value.address1} ${shippingAddress.value.address2 ? ', ' + shippingAddress.value.address2 : ''}, ${shippingAddress.value.city}, ${shippingAddress.value.postalCode}, Phone: ${shippingAddress.value.phone}`


    const orderItems = cartStore.items.map(item => ({
      productId: item.id,
      quantity: item.quantity
    }))


    const orderData = {
      userId: userId,
      shippingAddress: fullShippingAddress,
      orderItems: orderItems
    }


    const response = await api.post('/orders', orderData)


    if (response.data.success) {
      cartStore.clearCart()
      ElMessage.success({
        message: 'Your order has been placed successfully! Thank you for your purchase.',
        duration: 3000,
        center: true 
      })
      router.push('/products')
    } else {
      ElMessage.error({
        message: response.data.message || 'Failed to place order',
        duration: 3000,
        center: true
      })
    }
  } catch (error) {
    const errorMsg = error.response?.data?.message || error.message || 'An error occurred while placing your order'
    ElMessage.error({
      message: errorMsg,
      duration: 3000,
      center: true
    })
  } finally {
    placingOrder.value = false
  }
}
</script>

<style scoped>
.progress-steps {
  max-width: 600px;
  margin: 0 auto;
}

.step {
  flex: 1;
  text-align: center;
  position: relative;
}

.step::after {
  content: '';
  position: absolute;
  top: 20px;
  left: 50%;
  width: 100%;
  height: 2px;
  background: #dee2e6;
  z-index: 1;
}

.step:last-child::after {
  display: none;
}

.step.completed::after,
.step.active::after {
  background: #0d6efd;
}

.step-number {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #dee2e6;
  color: #6c757d;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 8px;
  position: relative;
  z-index: 2;
}

.step.active .step-number {
  background: #0d6efd;
  color: white;
}

.step.completed .step-number {
  background: #198754;
  color: white;
}
</style>