<template>
  <div class="min-h-screen py-16 px-4">
    <div class="container mx-auto max-w-5xl">
      <div class="bg-white/70 backdrop-blur-sm rounded-3xl shadow-2xl p-12 text-center border border-white/30">
        <div class="flex justify-center mb-6">
          <div class="bg-gradient-to-r from-sky-500 to-indigo-600 p-5 rounded-full shadow-lg">
            <Package class="w-16 h-16 text-white" />
          </div>
        </div>
        <h1 class="text-3xl md:text-5xl font-bold bg-gradient-to-r from-sky-700 to-indigo-700 bg-clip-text text-transparent mb-4 p-6 md:p-10">
          به انباربان خوش آمدید
        </h1>
        <p class="text-xl text-gray-600 mb-8">
          مدیریت هوشمند انبار و کالاها، ساده و سریع
        </p>
        <div class="flex gap-4 justify-center">
          <router-link to="/warehouse" class="bg-gradient-to-r from-sky-500 to-indigo-600 text-white px-8 py-3 rounded-xl hover:shadow-xl transition-all flex items-center gap-2">
            <Package class="w-5 h-5" />
            ورود به انبار
          </router-link>
          <router-link to="/register" class="border-2 border-slate-300 text-slate-700 px-8 py-3 rounded-xl hover:bg-slate-100 transition-all flex items-center gap-2">
            <UserPlus class="w-5 h-5" />
            ثبت‌نام
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Package, UserPlus } from 'lucide-vue-next'
</script>