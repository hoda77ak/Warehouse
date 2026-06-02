<template>
  <div class="min-h-screen py-16 px-4">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white rounded-3xl shadow-xl p-10">
        <div class="flex items-center gap-3 mb-6 border-b pb-4">
          <div class="bg-sky-100 p-3 rounded-xl">
            <Phone class="w-8 h-8 text-sky-600" />
          </div>
          <h1 class="text-4xl font-bold text-slate-800">تماس با ما</h1>
        </div>
        
        <div class="grid md:grid-cols-2 gap-6">
          <div class="bg-slate-50 rounded-2xl p-6 flex items-start gap-4">
            <MapPin class="w-6 h-6 text-sky-600 mt-1" />
            <div>
              <h3 class="font-bold text-slate-800 mb-1">آدرس</h3>
              <p class="text-gray-600">مشهد، خیابان ملاصدرا، برج باران، پلاک ۱۲۳</p>
            </div>
          </div>
          
          <div class="bg-slate-50 rounded-2xl p-6 flex items-start gap-4">
            <Mail class="w-6 h-6 text-sky-600 mt-1" />
            <div>
              <h3 class="font-bold text-slate-800 mb-1">ایمیل</h3>
              <p class="text-gray-600">info@anbarban.com</p>
            </div>
          </div>
          
          <div class="bg-slate-50 rounded-2xl p-6 flex items-start gap-4">
            <Phone class="w-6 h-6 text-sky-600 mt-1" />
            <div>
              <h3 class="font-bold text-slate-800 mb-1">تلفن</h3>
              <p class="text-gray-600">۰۵۱-۳۸۴۵۶۱۲۳</p>
            </div>
          </div>
          
          <div class="bg-slate-50 rounded-2xl p-6 flex items-start gap-4">
            <Clock class="w-6 h-6 text-sky-600 mt-1" />
            <div>
              <h3 class="font-bold text-slate-800 mb-1">ساعات کاری</h3>
              <p class="text-gray-600">شنبه تا پنجشنبه ۹ الی ۱۷</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Phone, MapPin, Mail, Clock } from 'lucide-vue-next'
</script>