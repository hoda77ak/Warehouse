<template>
  <div class="min-h-screen bg-gray-100 p-8">
    <div class="max-w-6xl mx-auto">
      <h1 class="text-3xl font-bold text-blue-800 mb-6">مدیریت انبار</h1>

      <!-- لیست کالاها -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">لیست کالاها</h2>
        <table class="w-full text-right border">
          <thead class="bg-gray-200">
            <tr><th class="p-2">نام</th><th class="p-2">تعداد</th><th class="p-2">قیمت</th><th class="p-2">عملیات</th></tr>
          </thead>
          <tbody>
            <tr v-for="(p, idx) in products" :key="idx" class="border-b">
              <td class="p-2">{{ p.name }}</td>
              <td class="p-2">{{ p.quantity }}</td>
              <td class="p-2">{{ p.price.toLocaleString() }} تومان</td>
              <td class="p-2"><button @click="removeProduct(idx)" class="bg-red-500 text-white px-2 py-1 rounded">حذف</button></td>
            </tr>
          </tbody>
        </table>
        <div class="mt-4 flex gap-2">
          <input v-model="newProduct.name" placeholder="نام کالا" class="border p-2 rounded">
          <input type="number" v-model="newProduct.quantity" placeholder="تعداد" class="border p-2 rounded">
          <input type="number" v-model="newProduct.price" placeholder="قیمت" class="border p-2 rounded">
          <button @click="addProduct" class="bg-blue-600 text-white px-4 py-2 rounded">افزودن کالا</button>
        </div>
      </div>

      <!-- فرم ثبت ورود/خروج -->
      <div class="bg-white rounded-lg shadow p-6 mb-8">
        <h2 class="text-xl font-bold mb-4">ثبت ورود/خروج کالا</h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <select v-model="transaction.product_id" class="border p-2 rounded">
            <option :value="null">انتخاب کالا</option>
            <option v-for="p in products" :value="p.id">{{ p.name }}</option>
          </select>
          <select v-model="transaction.type" class="border p-2 rounded">
            <option value="in">ورود به انبار</option>
            <option value="out">خروج از انبار</option>
          </select>
          <input type="number" v-model="transaction.quantity" placeholder="تعداد" class="border p-2 rounded">
          <button @click="addTransaction" class="bg-green-600 text-white px-4 py-2 rounded">ثبت رویداد</button>
        </div>
      </div>

      <!-- کارتکس -->
      <div class="bg-white rounded-lg shadow p-6">
        <h2 class="text-xl font-bold mb-4">کارتکس کالاها</h2>
        <table class="w-full text-right border">
          <thead class="bg-gray-200">
            <tr><th class="p-2">کالا</th><th class="p-2">نوع</th><th class="p-2">تعداد</th><th class="p-2">تاریخ</th></tr>
          </thead>
          <tbody>
            <tr v-for="t in transactions" :key="t.id" class="border-b">
              <td class="p-2">{{ t.product_name }}</td>
              <td class="p-2">{{ t.type === 'in' ? 'ورود' : 'خروج' }}</td>
              <td class="p-2">{{ t.quantity }}</td>
              <td class="p-2">{{ new Date(t.date).toLocaleDateString('fa-IR') }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// محصولات
const products = ref([])
const newProduct = ref({ name: '', quantity: 1, price: 0 })

// تراکنش‌ها
const transaction = ref({ product_id: null, type: 'in', quantity: 1 })
const transactions = ref([])

// ذخیره در localStorage
const saveData = () => {
  localStorage.setItem('products', JSON.stringify(products.value))
  localStorage.setItem('transactions', JSON.stringify(transactions.value))
}

// اضافه کردن کالا
const addProduct = () => {
  if (!newProduct.value.name) return alert('نام کالا را وارد کن')
  const newId = Date.now()
  products.value.push({ id: newId, ...newProduct.value })
  newProduct.value = { name: '', quantity: 1, price: 0 }
  saveData()
}

// حذف کالا
const removeProduct = (idx) => {
  products.value.splice(idx, 1)
  saveData()
}

// ثبت ورود/خروج
const addTransaction = () => {
  const product = products.value.find(p => p.id === transaction.value.product_id)
  if (!product) return alert('کالا را انتخاب کن')

  if (transaction.value.type === 'in') {
    product.quantity += transaction.value.quantity
  } else {
    if (product.quantity < transaction.value.quantity) return alert('تعداد کافی نیست')
    product.quantity -= transaction.value.quantity
  }

  transactions.value.push({
    id: Date.now(),
    product_id: product.id,
    product_name: product.name,
    type: transaction.value.type,
    quantity: transaction.value.quantity,
    date: new Date().toISOString()
  })

  transaction.value = { product_id: null, type: 'in', quantity: 1 }
  saveData()
}

// بارگذاری اولیه
onMounted(() => {
  const savedProducts = localStorage.getItem('products')
  if (savedProducts) products.value = JSON.parse(savedProducts)

  const savedTransactions = localStorage.getItem('transactions')
  if (savedTransactions) transactions.value = JSON.parse(savedTransactions)
})
</script>