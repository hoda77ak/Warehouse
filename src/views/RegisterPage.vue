<template>
  <div class="min-h-screen py-16 px-4 flex items-center justify-center">
    <div class="container mx-auto max-w-5xl">
      <div class="grid md:grid-cols-2 gap-8">
        
        <!-- سمت چپ: بخش تبلیغاتی -->
        <div class="bg-gradient-to-br from-emerald-600 to-teal-700 rounded-3xl shadow-2xl p-8 md:p-10 text-white flex flex-col justify-center text-center order-2 md:order-1">
          <UserPlus class="w-20 h-20 mx-auto mb-6 opacity-90" />
          <h3 class="text-3xl font-bold mb-4">به خانواده انباربان بپیوندید</h3>
          <p class="text-lg opacity-90 mb-6">
            با ثبت‌نام از تمام امکانات ما استفاده کنید
          </p>
          <div class="border-t border-white/30 pt-6 mt-4">
            <p class="text-sm opacity-80">
              🔒 اطلاعات شما نزد ما محفوظ است
            </p>
          </div>
        </div>

        <!-- سمت راست: فرم ثبت‌نام -->
        <div class="bg-white rounded-3xl shadow-2xl p-8 md:p-10 order-1 md:order-2">
          <div class="text-center mb-8">
            <div class="flex justify-center mb-4">
              <div class="bg-gradient-to-r from-emerald-500 to-teal-600 p-3 rounded-2xl">
                <UserPlus class="w-10 h-10 text-white" />
              </div>
            </div>
            <h2 class="text-3xl font-bold text-slate-800">ثبت‌نام</h2>
            <p class="text-gray-500 mt-2">حساب کاربری جدید بسازید</p>
          </div>

          <form @submit.prevent="handleRegister">
            <div class="mb-4">
              <label class="block text-slate-700 mb-2 font-medium">نام کامل</label>
              <div class="relative">
                <User class="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="text" 
                  v-model="name" 
                  placeholder="علی محمدی"
                  class="w-full border-2 border-gray-200 rounded-xl p-3 pl-12 focus:border-emerald-500 focus:outline-none transition"
                  required
                >
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-slate-700 mb-2 font-medium">ایمیل</label>
              <div class="relative">
                <Mail class="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  type="email" 
                  v-model="email" 
                  placeholder="example@email.com"
                  class="w-full border-2 border-gray-200 rounded-xl p-3 pl-12 focus:border-emerald-500 focus:outline-none transition"
                  required
                >
              </div>
            </div>

            <div class="mb-4">
              <label class="block text-slate-700 mb-2 font-medium">رمز عبور</label>
              <div class="relative">
                <Lock class="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  :type="showPassword ? 'text' : 'password'" 
                  v-model="password" 
                  placeholder="••••••••"
                  class="w-full border-2 border-gray-200 rounded-xl p-3 pl-12 focus:border-emerald-500 focus:outline-none transition"
                  required
                >
                <button 
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute right-3 top-3 text-gray-400 hover:text-emerald-600"
                >
                  <Eye v-if="!showPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <div class="mb-6">
              <label class="block text-slate-700 mb-2 font-medium">تکرار رمز عبور</label>
              <div class="relative">
                <Lock class="w-5 h-5 absolute left-3 top-3 text-gray-400" />
                <input 
                  :type="showConfirmPassword ? 'text' : 'password'" 
                  v-model="confirmPassword" 
                  placeholder="••••••••"
                  class="w-full border-2 border-gray-200 rounded-xl p-3 pl-12 focus:border-emerald-500 focus:outline-none transition"
                  required
                >
                <button 
                  type="button"
                  @click="showConfirmPassword = !showConfirmPassword"
                  class="absolute right-3 top-3 text-gray-400 hover:text-emerald-600"
                >
                  <Eye v-if="!showConfirmPassword" class="w-5 h-5" />
                  <EyeOff v-else class="w-5 h-5" />
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              class="w-full bg-gradient-to-r from-emerald-500 to-teal-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all transform hover:-translate-y-0.5"
            >
              ثبت‌نام
            </button>
          </form>

          <p class="text-center text-gray-600 mt-6">
            قبلاً ثبت‌نام کردید؟
            <router-link to="/login" class="text-emerald-600 font-semibold hover:underline">
              وارد شوید
            </router-link>
          </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { UserPlus, User, Mail, Lock, Eye, EyeOff } from 'lucide-vue-next'

const router = useRouter()
const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const handleRegister = () => {
  if (!name.value || !email.value || !password.value || !confirmPassword.value) {
    alert('❌ لطفاً همه فیلدها را پر کنید')
    return
  }
  if (password.value !== confirmPassword.value) {
    alert('❌ رمز عبور و تکرار آن مطابقت ندارند')
    return
  }
  if (password.value.length < 6) {
    alert('❌ رمز عبور باید حداقل ۶ کاراکتر باشد')
    return
  }
  
  localStorage.setItem('user', JSON.stringify({ name: name.value, email: email.value }))
  alert('✅ ثبت‌نام موفقیت‌آمیز بود!')
  router.push('/login')
}
</script>