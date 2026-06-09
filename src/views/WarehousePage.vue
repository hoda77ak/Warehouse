<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
    <div class="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      
      <!-- هدر -->
      <div class="text-center mb-12">
        <h1 class="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-700 to-indigo-600 bg-clip-text text-transparent">
          📦 انباربان
        </h1>
        <p class="text-gray-500 mt-2 text-lg">مدیریت هوشمند انبار و کالاها</p>
      </div>

      <!-- کارت افزودن کالا -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100 transition-all hover:shadow-2xl">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="bg-blue-100 text-blue-700 p-1 rounded-lg">➕</span>
          افزودن کالای جدید
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input v-model="newProduct.name" placeholder="نام کالا" class="input-field">
          <input type="number" v-model="newProduct.quantity" placeholder="تعداد اولیه" class="input-field">
          <input type="number" v-model="newProduct.price" placeholder="قیمت" class="input-field">
          <button @click="addProduct" class="btn-primary">
            <span>➕</span> افزودن کالا
          </button>
        </div>
      </div>

      <!-- لیست کالاها -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="bg-green-100 text-green-700 p-1 rounded-lg">📋</span>
          لیست کالاها
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-right">
            <thead class="bg-gradient-to-r from-gray-100 to-gray-50 rounded-lg">
              <tr>
                <th class="p-3 text-gray-700">نام کالا</th>
                <th class="p-3 text-gray-700">موجودی</th>
                <th class="p-3 text-gray-700">قیمت (تومان)</th>
                <th class="p-3 text-gray-700">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="p in products" :key="p.id" class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="p-3 font-medium text-gray-800">{{ p.name }}</td>
                <td class="p-3">
                  <span class="px-2 py-1 rounded-full text-sm" :class="p.quantity > 0 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'">
                    {{ p.quantity }}
                  </span>
                </td>
                <td class="p-3 text-gray-700">{{ p.price.toLocaleString() }} تومان</td>
                <td class="p-3">
                  <button @click="removeProduct(p.id)" class="btn-danger text-sm">
                    🗑️ حذف
                  </button>
                </td>
               </tr>
            </tbody>
           </table>
        </div>
      </div>

      <!-- ثبت رویداد -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="bg-purple-100 text-purple-700 p-1 rounded-lg">🔄</span>
          ثبت ورود / خروج کالا
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select v-model="transaction.product_id" class="input-field">
            <option :value="null">انتخاب کالا</option>
            <option v-for="p in products" :value="p.id">{{ p.name }} ({{ p.quantity }} عدد)</option>
          </select>
          <select v-model="transaction.type" class="input-field">
            <option value="in">📥 ورود به انبار</option>
            <option value="out">📤 خروج از انبار</option>
          </select>
          <input type="number" v-model="transaction.quantity" placeholder="تعداد" class="input-field">
          <button @click="addTransaction" class="btn-success">
            <span>✅</span> ثبت رویداد
          </button>
        </div>
      </div>

      <!-- کارتکس -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-gray-100">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
          <span class="bg-yellow-100 text-yellow-700 p-1 rounded-lg">📊</span>
          کارتکس کالاها (تاریخچه)
        </h2>
        <div class="overflow-x-auto">
          <table class="w-full text-right">
            <thead class="bg-gradient-to-r from-gray-100 to-gray-50">
              <tr>
                <th class="p-3 text-gray-700">کالا</th>
                <th class="p-3 text-gray-700">نوع</th>
                <th class="p-3 text-gray-700">تعداد</th>
                <th class="p-3 text-gray-700">تاریخ</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="t in transactions" :key="t.id" class="border-b border-gray-100 hover:bg-gray-50 transition">
                <td class="p-3 text-gray-800">{{ t.product?.name || t.product_name }}</td>
                <td class="p-3">
                  <span :class="t.type === 'in' ? 'text-green-600 bg-green-50' : 'text-red-600 bg-red-50'" class="px-2 py-1 rounded-full text-sm">
                    {{ t.type === 'in' ? '📥 ورود' : '📤 خروج' }}
                  </span>
                </td>
                <td class="p-3 text-gray-700">{{ t.quantity }}</td>
                <td class="p-3 text-gray-500 text-sm">{{ new Date(t.created_at).toLocaleDateString('fa-IR') }}  </td>
               </tr>
              <tr v-if="transactions.length === 0">
                <td colspan="4" class="p-8 text-center text-gray-400">
                  🕊️ هیچ رویدادی ثبت نشده است
                </td>
               </tr>
            </tbody>
           </table>
        </div>
      </div>

    </div>
  </div>
</template>

<style scoped>
.input-field {
  @apply w-full border border-gray-200 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-200 bg-white/90;
}
.btn-primary {
  @apply w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl px-4 py-2.5 font-medium hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2;
}
.btn-danger {
  @apply bg-red-50 text-red-600 px-3 py-1.5 rounded-lg hover:bg-red-100 transition-colors duration-200 flex items-center gap-1;
}
.btn-success {
  @apply w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-xl px-4 py-2.5 font-medium hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2;
}
</style>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const products = ref([])
const transactions = ref([])
const newProduct = ref({ name: '', quantity: 0, price: 0 })
const transaction = ref({ product_id: null, type: 'in', quantity: 1 })

const API_URL = 'http://localhost:8000/api'

const fetchProducts = async () => {
  try {
    const res = await axios.get(`${API_URL}/products`)
    products.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const fetchTransactions = async () => {
  try {
    const res = await axios.get(`${API_URL}/inventory-transactions`)
    transactions.value = res.data
  } catch (error) {
    console.error(error)
  }
}

const addProduct = async () => {
  if (!newProduct.value.name) return alert('نام کالا را وارد کنید')
  try {
    await axios.post(`${API_URL}/products`, newProduct.value)
    newProduct.value = { name: '', quantity: 0, price: 0 }
    fetchProducts()
    alert('✅ کالا اضافه شد')
  } catch (error) {
    alert('خطا در افزودن کالا')
  }
}

const removeProduct = async (id) => {
  if (!confirm('آیا از حذف این کالا مطمئن هستید؟')) return
  try {
    await axios.delete(`${API_URL}/products/${id}`)
    fetchProducts()
    alert('🗑️ کالا حذف شد')
  } catch (error) {
    alert('خطا در حذف کالا')
  }
}

const addTransaction = async () => {
  if (!transaction.value.product_id) return alert('کالا را انتخاب کنید')
  if (transaction.value.quantity < 1) return alert('تعداد معتبر نیست')
  try {
    await axios.post(`${API_URL}/inventory-transactions`, {
      product_id: transaction.value.product_id,
      type: transaction.value.type,
      quantity: transaction.value.quantity,
      description: ''
    })
    fetchProducts()
    fetchTransactions()
    transaction.value = { product_id: null, type: 'in', quantity: 1 }
    alert('✅ رویداد ثبت شد')
  } catch (error) {
    alert('خطا در ثبت رویداد (موجودی کافی نیست)')
  }
}

onMounted(() => {
  fetchProducts()
  fetchTransactions()
})
</script>