<template>
  <div class="min-h-screen py-16 px-4 flex items-center justify-center">
    <div class="container mx-auto max-w-5xl">
      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- سمت راست: فرم ورود -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
          <div class="text-center mb-8">
            <div class="flex justify-center mb-4">
              <div class="bg-gradient-to-r from-sky-500 to-indigo-600 p-3 rounded-2xl">
                <LogIn class="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 class="text-3xl font-bold text-slate-800">خوش آمدید</h2>
            <p class="text-gray-500 mt-2">لطفاً وارد حساب کاربری خود شوید</p>
          </div>

          <form @submit.prevent="handleLogin">
            <div class="mb-5">
              <label class="block text-slate-700 mb-2 font-medium">ایمیل</label>
              <div class="relative">
                <Mail class="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="example@email.com"
                  class="w-full border-2 border-gray-200 rounded-xl p-3 pl-12 focus:border-sky-500 focus:outline-none transition"
                  required
                >
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-slate-700 mb-2 font-medium">رمز عبور</label>
              <div class="relative">
                <Lock class="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="password" 
                  placeholder="••••••••"
                  class="w-full border-2 border-gray-200 rounded-xl p-3 pl-12 focus:border-sky-500 focus:outline-none transition"
                  required
                >
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-gray-400 hover:text-sky-600"
                >
                  <Eye v-if="!showPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              ورود
            </button>
          </form>

          <p class="text-center text-gray-600 mt-6">
            حساب کاربری ندارید؟
            <router-link to="/register" class="text-sky-600 font-semibold hover:underline">
              ثبت‌نام کنید
            </router-link>
          </p>
        </div>

        <!-- سمت چپ: بخش تبلیغاتی -->
        <div class="bg-gradient-to-br from-sky-600 to-indigo-700 rounded-3xl shadow-2xl p-8 md:p-10 text-white flex flex-col justify-center text-center">
          <Package class="w-20 h-20 mx-auto mb-6 opacity-90" />
          <h3 class="text-3xl font-bold mb-4">انباربان</h3>
          <p class="text-lg opacity-90 mb-6">
            مدیریت هوشمند انبار و کالاها
          </p>
          <div class="border-t border-white/30 pt-6 mt-4">
            <p class="text-sm opacity-80">
              ✨ ثبت‌نام کنید و از امکانات پیشرفته ما استفاده کنید
            </p>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn, Mail, Lock, Eye, EyeOff, Package } from 'lucide-vue-next'

const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)

const handleLogin = () => {
  if (email.value && password.value) {
    localStorage.setItem('user', JSON.stringify({ email: email.value }))
    
    // 🔁 این خط رو اضافه کن
    window.dispatchEvent(new Event('storage'))
    
    alert('✅ ورود موفقیت‌آمیز بود!')
    router.push('/warehouse')
  } else {
    alert('❌ لطفاً ایمیل و رمز عبور را وارد کنید')
  }
}
</script>