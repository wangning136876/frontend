import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/services/api'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const product = ref(null)
    const categories = ref([])
    const loading = ref(false)

    const fetchProducts = async(params = {}) => {
        loading.value = true
        try {
            const response = await api.get('/products', { params })
            products.value = response.data.products
            return response.data
        } catch (error) {
            console.error('Failed to fetch products:', error)
            return { products: [], totalItems: 0 }
        } finally {
            loading.value = false
        }
    }

    const fetchProduct = async(id) => {
        loading.value = true
        try {
            const response = await api.get(`/products/${id}`)
            product.value = response.data
            return response.data
        } catch (error) {
            console.error('Failed to fetch product:', error)
            return null
        } finally {
            loading.value = false
        }
    }

    const searchProducts = async(params) => {
        loading.value = true
        try {
            const response = await api.get('/products/search', { params })
            return response.data
        } catch (error) {
            console.error('Failed to search products:', error)
            return { products: [], totalItems: 0 }
        } finally {
            loading.value = false
        }
    }

    const fetchCategories = async() => {
        try {
            const response = await api.get('/categories')
            categories.value = response.data
            return response.data
        } catch (error) {
            console.error('Failed to fetch categories:', error)
        }
    }

    return {
        products,
        product,
        categories,
        loading,
        fetchProducts,
        fetchProduct,
        searchProducts,
        fetchCategories
    }
})