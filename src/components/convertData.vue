<template>
  <div>{{ result }}</div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const data = ref([
  {
    id: 1,
    name: 'building.create'
  },
  {
    id: 2,
    name: 'building.delete'
  },
  {
    id: 3,
    name: 'building.edit'
  },
  {
    id: 4,
    name: 'dashboard.create'
  },
  {
    id: 5,
    name: 'dashboard.delete'
  },
  {
    id: 6,
    name: 'energy.edit'
  },
  {
    id: 7,
    name: 'energy.create'
  },
  {
    id: 8,
    name: 'energy.delete'
  }
])

const result = ref({})

const convertData = () => {
  const category = []
  for (const item of data.value) {
    const splitName = item.name.split('.')
    const check = category.findIndex((subItem) => subItem === splitName[0])
    if (check === -1) category.push(splitName[0])
  }

  for (const item of category) {
    const filterData = data.value.filter((subItem) => subItem.name.split('.')[0] === item)
    const list = []
    for (const detail of filterData) {
      const splitName = detail.name.split('.')
      const wireData = {
        id: detail.id,
        name: splitName[1],
        html_id: detail.name
      }
      list.push(wireData)
    }
    result.value[item.charAt(0).toUpperCase() + item.slice(1)] = list
  }
}

onMounted(() => {
  convertData()
})
</script>
