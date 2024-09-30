import { defineStore } from 'pinia'
import { ref } from 'vue'

interface Converter {
  id: string
  name: string
  from: string
  to: string
  convert: (amount: number) => number
  from_media?: string
  to_media?: string
}

export const useConvertersStore = defineStore('converters', () => {
  const converters = ref<Converter[]>([
    {
      id: '1',
      name: 'USD en EUR',
      from: 'USD',
      to: 'EUR',
      convert: (amount: number) => amount * 0.82
    },
    {
      id: '2',
      name: 'Mo en Écrevisses',
      from: 'Mo',
      to: "Jpeg d'écrevisse",
      convert: (amount: number) => amount * 59,
      to_media:
        'https://ibp.info6tm.fr/api/v1/files/629524948792f45b53783de4/methodes/article_small/image.jpg'
    }
  ])
  const selectedConverter = ref<Converter | null>(null)

  function findConverter(name: string) {
    return converters.value.find((c) => c.name === name)
  }

  return { converters, findConverter, selectedConverter }
})
