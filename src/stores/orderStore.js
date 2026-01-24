import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'
import { ElMessage } from 'element-ui'

export const useOrderStore = defineStore('order', () => {
    const orders = ref([])
    const currentOrder = ref(null)
    const loading = ref(false)

    const createOrder = async(orderData) => {
        loading.value = true
        try {
            const response = await api.post('/orders', orderData)
            if (response.data.success) {
                ElMessage.success(response.data.message)
                currentOrder.value = response.data.data
                return { success: true, order: response.data.data }
            } else {
                ElMessage.error(response.data.message)
                return { success: false, error: response.data.message }
            }
        } catch (error) {
            const errorMsg = error.response ? .data ? .message || 'Failed to create order, please try again'
            ElMessage.error(errorMsg)
            return { success: false, error: errorMsg }
        } finally {
            loading.value = false
        }
    }

    const fetchUserOrders = async(userId) => {
        loading.value = true
        try {
            const response = await api.get(`/orders/user/${userId}`)
            if (response.data.success) {
                orders.value = response.data.data
                ElMessage.success('Orders fetched successfully')
                return { success: true, orders: response.data.data }
            } else {
                ElMessage.error(response.data.message)
                return { success: false, orders: [] }
            }
        } catch (error) {
            const errorMsg = error.response ? .data ? .message || 'Failed to fetch user orders'
            ElMessage.error(errorMsg)
            return { success: false, orders: [] }
        } finally {
            loading.value = false
        }
    }

    const fetchOrderById = async(orderId) => {
        loading.value = true
        try {
            const response = await api.get(`/orders/${orderId}`)
            if (response.data.success) {
                currentOrder.value = response.data.data
                ElMessage.success('Order details fetched successfully')
                return { success: true, order: response.data.data }
            } else {
                ElMessage.error(response.data.message)
                return { success: false, error: response.data.message }
            }
        } catch (error) {
            const errorMsg = error.response ? .data ? .message || 'Failed to fetch order details'
            ElMessage.error(errorMsg)
            return { success: false, error: errorMsg }
        } finally {
            loading.value = false
        }
    }

    const fetchOrderByNumber = async(orderNumber) => {
        loading.value = true
        try {
            const response = await api.get(`/orders/number/${orderNumber}`)
            if (response.data.success) {
                currentOrder.value = response.data.data
                ElMessage.success('Order details fetched successfully')
                return { success: true, order: response.data.data }
            } else {
                ElMessage.error(response.data.message)
                return { success: false, error: response.data.message }
            }
        } catch (error) {
            const errorMsg = error.response ? .data ? .message || 'Failed to fetch order by number'
            ElMessage.error(errorMsg)
            return { success: false, error: errorMsg }
        } finally {
            loading.value = false
        }
    }

    const updateOrderStatus = async(orderId, status) => {
        loading.value = true
        try {
            const response = await api.put(`/orders/${orderId}/status`, {}, {
                params: { status }
            })
            if (response.data.success) {
                ElMessage.success(response.data.message)
                if (currentOrder.value && currentOrder.value.id === orderId) {
                    currentOrder.value.orderStatus = status.toUpperCase()
                }
                const orderIndex = orders.value.findIndex(o => o.id === orderId)
                if (orderIndex !== -1) {
                    orders.value[orderIndex].orderStatus = status.toUpperCase()
                }
                return { success: true, order: response.data.data }
            } else {
                ElMessage.error(response.data.message)
                return { success: false, error: response.data.message }
            }
        } catch (error) {
            const errorMsg = error.response ? .data ? .message || 'Failed to update order status'
            ElMessage.error(errorMsg)
            return { success: false, error: errorMsg }
        } finally {
            loading.value = false
        }
    }

    const clearCurrentOrder = () => {
        currentOrder.value = null
    }

    return {
        orders,
        currentOrder,
        loading,
        createOrder,
        fetchUserOrders,
        fetchOrderById,
        fetchOrderByNumber,
        updateOrderStatus,
        clearCurrentOrder
    }
})