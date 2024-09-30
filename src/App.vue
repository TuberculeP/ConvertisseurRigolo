<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useConvertersStore } from './stores/converters'
import { computed, ref } from 'vue'
import { NInputNumber, NSelect, NCard } from 'naive-ui'
const convertersStore = useConvertersStore()
const { converters, selectedConverter } = storeToRefs(convertersStore)

const selectOptions = computed(() =>
  converters.value.map((c) => ({
    label: c.name,
    value: c.id
  }))
)
const onOptionSelect = (id: string) => {
  selectedConverter.value = converters.value.find((c) => c.id === id) || selectedConverter.value
}

const initialEntry = ref(0)
const result = computed(() => selectedConverter.value?.convert(initialEntry.value))
</script>

<template>
  <main>
    <h1>Convertisseur Rigolo : {{ selectedConverter?.name }}</h1>
    <n-select
      :options="selectOptions"
      :default-value="selectedConverter?.id"
      @update:value="onOptionSelect"
    >
    </n-select>

    <n-card
      class="card"
      v-if="selectedConverter"
      :title="'Convertisseur ' + selectedConverter.name"
    >
      <h2>Entrée</h2>
      <n-input-number v-model:value="initialEntry" placeholder="Entrez une valeur">
        <template #suffix> {{ selectedConverter.from }} </template>
      </n-input-number>
      <h2>Sortie</h2>
      <n-input-number v-model:value="result" disabled>
        <template #suffix> {{ selectedConverter.to }} </template>
      </n-input-number>
      <img v-if="selectedConverter.to_media" :src="selectedConverter.to_media" alt="" />
    </n-card>
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}

.card {
  margin: 20px 30px;
  width: fit-content;
  img {
    max-width: 350px;
  }
}
</style>
