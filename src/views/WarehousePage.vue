<template>
  <div class="min-h-screen py-12 px-4">
    <div class="container mx-auto max-w-6xl">
      <div class="text-center mb-10">
        <div class="flex justify-center mb-4">
          <div class="bg-gradient-to-r from-sky-500 to-indigo-600 p-4 rounded-2xl shadow-lg">
            <Package class="w-12 h-12 text-white" />
          </div>
        </div>
        <h1 class="text-4xl font-bold text-slate-800 mb-2">مدیریت انبار</h1>
        <p class="text-gray-600">محصولات خود را ثبت و مدیریت کنید</p>
      </div>

      <!-- کارت افزودن کالا -->
      <div class="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <h2 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <PlusCircle class="w-6 h-6 text-sky-600" />
          افزودن کالای جدید
        </h2>
        
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="relative">
            <Box class="w-5 h-5 absolute right-3 top-3 text-gray-400" />
            <input type="text" v-model="newProduct.name" placeholder="نام کالا" class="input-field pr-10">
          </div>
          
          <div class="relative">
            <Hash class="w-5 h-5 absolute right-3 top-3 text-gray-400" />
            <input type="number" v-model="newProduct.quantity" placeholder="تعداد" class="input-field pr-10">
          </div>
          
          <div class="relative">
            <div class="absolute right-3 top-3 text-gray-400">💰</div>
            <input type="number" v-model="newProduct.price" placeholder="قیمت (تومان)" class="input-field pr-10">
          </div>
          
          <button @click="addProduct" class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-6 py-3 rounded-xl hover:shadow-lg transition-all flex items-center justify-center gap-2">
            <Save class="w-4 h-4" />
            ذخیره کالا
          </button>
        </div>
      </div>

      <!-- لیست کالاها -->
      <div class="bg-white rounded-2xl shadow-xl p-8">
        <h2 class="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <List class="w-6 h-6 text-sky-600" />
          لیست کالاها
          <span class="text-sm bg-gray-100 text-gray-600 px-3 py-1 rounded-full mr-2">
            {{ products.length }} قلم کالا
          </span>
        </h2>
        
        <div class="overflow-x-auto">
          <table class="w-full text-right">
            <thead class="bg-gradient-to-r from-slate-100 to-slate-50">
              <tr>
                <th class="p-3">نام کالا</th>
                <th class="p-3">تعداد</th>
                <th class="p-3">قیمت (تومان)</th>
                <th class="p-3">عملیات</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="border-b hover:bg-slate-50 transition">
                <td class="p-3 font-medium">{{ product.name }}</td>
                <td class="p-3">
                  <span class="bg-sky-100 text-sky-700 px-3 py-1 rounded-full text-sm">
                    {{ product.quantity }}
                  </span>
                </td>
                <td class="p-3">{{ product.price.toLocaleString() }} تومان</td>
                <td class="p-3">
                  <button @click="removeProduct(product.id)" class="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition flex items-center gap-1">
                    <Trash2 class="w-4 h-4" />
                    حذف
                  </button>
                </td>
              </tr>
              <tr v-if="products.length === 0">
                <td colspan="4" class="p-12 text-center text-gray-500">
                  <Package class="w-12 h-12 mx-auto mb-3 text-gray-300" />
                  هنوز کالایی به انبار اضافه نشده است
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { Package, PlusCircle, Box, Hash, Save, List, Trash2 } from 'lucide-vue-next'

const products = ref([])
const newProduct = ref({ name: '', quantity: 1, price: 0 })
const apiUrl = 'http://localhost:8000/api/products'

// دریافت لیست کالاها از API
const fetchProducts = async () => {
  try {
    const response = await axios.get(apiUrl)
    products.value = response.data
  } catch (error) {
    console.error('خطا در دریافت کالاها:', error)
  }
}

// اضافه کردن کالا به API
const addProduct = async () => {
  if (!newProduct.value.name.trim()) {
    alert('❌ لطفاً نام کالا را وارد کنید')
    return
  }
  
  try {
    const response = await axios.post(apiUrl, {
      name: newProduct.value.name,
      quantity: newProduct.value.quantity,
      price: newProduct.value.price
    })
    products.value.push(response.data)
    newProduct.value = { name: '', quantity: 1, price: 0 }
  } catch (error) {
    console.error('خطا در اضافه کردن کالا:', error)
    alert('❌ خطا در ارتباط با سرور')
  }
}

// حذف کالا از API
const removeProduct = async (id) => {
  if (confirm('آیا از حذف این کالا مطمئن هستید؟')) {
    try {
      await axios.delete(`${apiUrl}/${id}`)
      products.value = products.value.filter(p => p.id !== id)
    } catch (error) {
      console.error('خطا در حذف کالا:', error)
      alert('❌ خطا در حذف کالا')
    }
  }
}

// بارگذاری اولیه
onMounted(() => {
  fetchProducts()
})
</script>