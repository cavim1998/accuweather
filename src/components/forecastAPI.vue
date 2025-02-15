<template>
  <div>{{ temperatureNow }}</div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { Actions, Getters } from '@/core/enums/accuweather'

const { dispatch, getters } = useStore()

const temperatureNow = computed(() => getters[Getters.DATA])

onMounted(async () => {
  const locationKey = await dispatch(String(Actions.GET_LOCATION_KEY))
  dispatch(String(Actions.CALL_TODAY_TEMPERATURE), locationKey)
})
</script>
