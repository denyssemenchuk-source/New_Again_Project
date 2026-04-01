<template>
  <div class="min-h-screen bg-gray-50 p-8 font-sans">
  <Pricing_card/>
<!--    <div class="max-w-[1100px] mx-auto mb-16">-->
<!--      <div class="flex flex-col md:flex-row justify-between items-center md:items-end mb-8 gap-4">-->
<!--        <h1 class="text-[32px] font-bold text-gray-900 tracking-tight">Start Your 3 Day Free Trial</h1>-->
<!--        <div class="flex items-center space-x-4">-->
<!--          <span class="text-[#70e000] text-sm font-semibold">Save up to 20% &#10549;</span>-->
<!--          <div class="flex border border-gray-200 rounded-md overflow-hidden bg-white shadow-sm">-->
<!--            <button-->
<!--              @click="billingCycle = 'annual'"-->
<!--              :class="['px-5 py-2 text-sm font-medium transition-colors', billingCycle === 'annual' ? 'bg-white text-gray-900 border-b-2 border-[#70e000]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100']"-->
<!--            >-->
<!--              Annual-->
<!--            </button>-->
<!--            <button-->
<!--              @click="billingCycle = 'monthly'"-->
<!--              :class="['px-5 py-2 text-sm font-medium transition-colors', billingCycle === 'monthly' ? 'bg-white text-gray-900 border-b-2 border-[#70e000]' : 'bg-gray-50 text-gray-500 hover:bg-gray-100']"-->
<!--            >-->
<!--              Monthly-->
<!--            </button>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->

<!--      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 justify-items-center">-->
<!--        <div-->
<!--          v-for="plan in plans"-->
<!--          :key="plan.name"-->
<!--          class="relative bg-white w-full max-w-[340px] rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-transparent hover:border-black transition-colors duration-300 overflow-hidden flex flex-col"-->
<!--        >-->
<!--          <div class="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r" :class="plan.gradient"></div>-->

<!--          <div class="p-7 flex-grow flex flex-col">-->
<!--            <h2 class="text-[22px] font-bold text-gray-900 mb-5">{{ plan.name }} - {{ billingCycle === 'annual' ? 'Annual' : 'Monthly' }}</h2>-->

<!--            <div>-->
<!--              <div class="inline-block bg-gray-100 text-gray-500 text-[11px] font-medium px-2 py-1 rounded mb-1">-->
<!--                3-days free then:-->
<!--              </div>-->
<!--            </div>-->

<!--            <div class="flex items-baseline mb-1">-->
<!--              <span class="text-[40px] font-extrabold text-gray-900 tracking-tight">${{ billingCycle === 'annual' ? plan.priceAnnual : plan.priceMonthly }}</span>-->
<!--              <span class="text-gray-500 text-sm ml-1 font-medium">/month</span>-->
<!--            </div>-->

<!--            <div class="min-h-[20px] mb-4">-->
<!--              <p v-if="billingCycle === 'annual'" class="text-gray-400 text-xs">-->
<!--                billed yearly at <del>${{ plan.yearlyOld }}</del> <span class="text-black font-semibold">${{ plan.yearlyNew }}</span>-->
<!--              </p>-->
<!--            </div>-->

<!--            <div class="min-h-[28px] mb-6">-->
<!--              <div v-if="billingCycle === 'annual'" class="bg-green-50 text-[#70e000] text-xs font-bold px-3 py-1 rounded inline-block">-->
<!--                ${{ plan.savings }} in savings-->
<!--              </div>-->
<!--            </div>-->

<!--            <button class="w-full py-2.5 font-bold text-sm text-white rounded-md transition-all duration-500 mb-6 bg-gradient-to-r from-orange-400 via-pink-500 to-orange-400 bg-[length:200%_auto] hover:bg-right shadow-sm border-transparent">-->
<!--              Try It Free-->
<!--            </button>-->

<!--            <hr class="border-gray-100 mb-6">-->

<!--            <ul class="space-y-4">-->
<!--              <li v-for="(feature, index) in plan.features" :key="index" class="flex items-start">-->
<!--                <svg class="w-[18px] h-[18px] text-[#70e000] mt-[2px] shrink-0" fill="currentColor" viewBox="0 0 24 24">-->
<!--                  <path d="M12 2L14.4 9.6L22 12L14.4 14.4L12 22L9.6 14.4L2 12L9.6 9.6L12 2Z"/>-->
<!--                </svg>-->
<!--                <div class="ml-3" v-html="feature"></div>-->
<!--              </li>-->
<!--            </ul>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->

    <div class="max-w-[1100px] mx-auto bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-6">

      <div class="mb-6">
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass-20-solid"
          placeholder="Шукати продукти..."
          class="max-w-sm"
          size="md"
        />
      </div>

      <UTable
        :columns="columns"
        :rows="paginatedRows"
        :data="paginatedRows"
        v-model:sort="sort"
        class="w-full border-t border-gray-600"
        :ui="{
          th: { padding: 'py-4', font: 'font-semibold', color: 'text-gray-100' },
          td: { padding: 'py-4' }
        }"
      >
        <template #thumbnail-data="{ row }">
          <img :src="row.thumbnail" alt="Product" class="w-[100px] h-[100px] object-contain rounded-md bg-white" />
        </template>
        <template #thumbnail-cell="{ row }">
          <img :src="row.original?.thumbnail || row.thumbnail" alt="Product" class="w-[100px] h-[100px] object-contain rounded-md bg-white" />
        </template>

        <template #title-data="{ row }">
          <span class="font-medium text-gray-900">{{ row.title }}</span>
        </template>
        <template #title-cell="{ row }">
          <span class="font-medium text-gray-900">{{ row.original?.title || row.title }}</span>
        </template>

        <template #description-data="{ row }">
          <div class="max-w-xs whitespace-normal text-gray-500 text-sm leading-relaxed">{{ row.description }}</div>
        </template>
        <template #description-cell="{ row }">
          <div class="max-w-xs whitespace-normal text-gray-500 text-sm leading-relaxed">{{ row.original?.description || row.description }}</div>
        </template>

        <template #price-data="{ row }">
          <span class="font-bold text-gray-900">${{ row.price }}</span>
        </template>
        <template #price-cell="{ row }">
          <span class="font-bold text-gray-900">${{ row.original?.price || row.price }}</span>
        </template>

        <template #rating-data="{ row }">
          <span :class="row.rating >= 4.5 ? 'text-[#70e000] font-bold' : 'text-red-500 font-bold'">
            {{ row.rating }}
          </span>
        </template>
        <template #rating-cell="{ row }">
          <span :class="(row.original?.rating || row.rating) >= 4.5 ? 'text-[#70e000] font-bold' : 'text-red-500 font-bold'">
            {{ row.original?.rating || row.rating }}
          </span>
        </template>

        <template #brand-data="{ row }">
          <span class="text-gray-400 text-sm">{{ row.brand || 'Без бренду' }}</span>
        </template>
        <template #brand-cell="{ row }">
          <span class="text-gray-400 text-sm">{{ row.original?.brand || row.brand || 'Без бренду' }}</span>
        </template>

        <template #category-data="{ row }">
          <span class="text-gray-400 text-sm">{{ row.category }}</span>
        </template>
        <template #category-cell="{ row }">
          <span class="text-gray-400 text-sm">{{ row.original?.category || row.category }}</span>
        </template>
      </UTable>

      <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
        <div class="text-sm text-gray-500 font-medium">
          Всього знайдено: {{ filteredAndSortedRows.length }}
        </div>

        <UPagination
          v-model="page"
          v-model:page="page"
          :page-count="parsedPageCount"
          :items-per-page="parsedPageCount"
          :total="filteredAndSortedRows.length || 1"
          :active-button="{ color: 'green', variant: 'solid' }"
          :inactive-button="{ color: 'gray', variant: 'solid' }"
        />
      </div>
    </div>

  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
const colorMode = useColorMode()
colorMode.preference = 'light'

const columns = [
  { id: 'thumbnail', accessorKey: 'thumbnail', key: 'thumbnail', header: 'Фото', label: 'Фото' },
  { id: 'title', accessorKey: 'title', key: 'title', header: 'Назва', label: 'Назва', sortable: true },
  { id: 'description', accessorKey: 'description', key: 'description', header: 'Опис', label: 'Опис' },
  { id: 'price', accessorKey: 'price', key: 'price', header: 'Ціна', label: 'Ціна', sortable: true },
  { id: 'rating', accessorKey: 'rating', key: 'rating', header: 'Оцінка', label: 'Оцінка', sortable: true },
  { id: 'brand', accessorKey: 'brand', key: 'brand', header: 'Бренд', label: 'Бренд', sortable: true },
  { id: 'category', accessorKey: 'category', key: 'category', header: 'Категорія', label: 'Категорія', sortable: true }
]

const searchQuery = ref('')
const page = ref(1)
const pageCount = ref(5)
const parsedPageCount = computed(() => Number(pageCount.value)) // Надійне перетворення в число
const sort = ref({ column: 'title', direction: 'asc' })


const { data } = await useFetch('https://dummyjson.com/products?limit=200')
const products = computed(() => data.value?.products || [])

// Фільтрація і сортування
const filteredAndSortedRows = computed(() => {
  let result = [...products.value]

  if (searchQuery.value) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(item =>
      item.title.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q) ||
      item.category.toLowerCase().includes(q)
    )
  }

  if (sort.value.column) {
    const { column, direction } = sort.value
    result.sort((a, b) => {
      const valA = a[column]
      const valB = b[column]
      if (valA === valB) return 0
      if (direction === 'asc') return valA < valB ? -1 : 1
      return valA > valB ? -1 : 1
    })
  }

  return result
})

// Пагінація: беремо відрізок від масиву залежно від обраної сторінки
const paginatedRows = computed(() => {
  const start = (page.value - 1) * parsedPageCount.value
  const end = page.value * parsedPageCount.value
  return filteredAndSortedRows.value.slice(start, end)
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');
body { font-family: 'Inter', sans-serif; }
</style>
