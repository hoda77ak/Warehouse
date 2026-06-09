<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
    <nav class="bg-gradient-to-r from-slate-900 to-slate-800 text-white shadow-xl sticky top-0 z-50">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center">
          
          <div class="flex gap-6">
            <router-link to="/" class="flex items-center gap-2 hover:text-sky-300 transition">
              <Home class="w-4 h-4" />
              خانه
            </router-link>
            <router-link to="/about" class="flex items-center gap-2 hover:text-sky-300 transition">
              <Info class="w-4 h-4" />
              درباره ما
            </router-link>
            <router-link to="/contact" class="flex items-center gap-2 hover:text-sky-300 transition">
              <Phone class="w-4 h-4" />
              تماس با ما
            </router-link>
            <router-link to="/warehouse" class="flex items-center gap-2 hover:text-sky-300 transition">
              <Warehouse class="w-4 h-4" />
              انبار کالاها
            </router-link>
          </div>
          
          <div class="flex items-center gap-6">
            <div class="flex gap-3">
              <template v-if="!isLoggedIn">
                <router-link to="/login" class="flex items-center gap-2 bg-sky-600 px-4 py-2 rounded-lg hover:bg-sky-700 transition">
                  <LogIn class="w-4 h-4" />
                  ورود
                </router-link>
                <router-link to="/register" class="flex items-center gap-2 border border-sky-400 px-4 py-2 rounded-lg hover:bg-sky-800 transition">
                  <UserPlus class="w-4 h-4" />
                  ثبت‌نام
                </router-link>
              </template>
              
              <button v-else @click="logout" class="flex items-center gap-2 bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition">
                <LogOut class="w-4 h-4" />
                خروج
              </button>
            </div>
            
            <div class="flex items-center gap-2 border-r border-slate-600 pr-6">
              <Package class="w-6 h-6 text-sky-400" />
              <span class="text-xl font-bold">انباربان</span>
            </div>
          </div>
          
        </div>
      </div>
    </nav>

    <router-view />
    
    <footer class="bg-slate-900 text-white text-center py-6 mt-12">
      <p>© 2025 انباربان - نرم‌افزار مدیریت انبار</p>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { Home, Info, Phone, Warehouse, LogIn, UserPlus, Package, LogOut } from 'lucide-vue-next'

const router = useRouter()
const isLoggedIn = ref(false)

const checkLoginStatus = () => {
  isLoggedIn.value = localStorage.getItem('user') !== null
}

const logout = () => {
  if (confirm('آیا مطمئن هستید که می‌خواهید از حساب کاربری خود خارج شوید؟')) {
    localStorage.removeItem('user')
    isLoggedIn.value = false
    router.push('/')
  }
}

onMounted(() => {
  checkLoginStatus()
  window.addEventListener('storage', checkLoginStatus)
})

onUnmounted(() => {
  window.removeEventListener('storage', checkLoginStatus)
})
</script>