<template>
  <div class="min-h-screen py-16 px-4">
    <div class="container mx-auto max-w-4xl">
      <div class="bg-white rounded-3xl shadow-xl p-10">
        <div class="flex items-center gap-3 mb-6 border-b pb-4">
          <div class="bg-sky-100 p-3 rounded-xl">
            <Info class="w-8 h-8 text-sky-600" />
          </div>
          <h1 class="text-4xl font-bold text-slate-800">درباره ما</h1>
        </div>
        <div class="space-y-6 text-gray-700 leading-relaxed text-lg">
          <p>
            <span class="font-bold text-sky-700">انباربان</span> با هدف ساده‌سازی فرآیند مدیریت انبارها طراحی شده است.
          </p>
          <p>
            تیم ما با سال‌ها تجربه در حوزه لجستیک و انبارداری، این نرم‌افزار را برای کسب‌وکارهای کوچک و متوسط توسعه داده است.
          </p>
          <div class="bg-sky-50 rounded-2xl p-6 mt-6">
            <p class="font-semibold text-sky-800 mb-2">🎯 اهداف ما:</p>
            <p>ارائه راهکاری سریع، امن و آسان برای ثبت و پیگیری کالاها.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Info } from 'lucide-vue-next'
</script>