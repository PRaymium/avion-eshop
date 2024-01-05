import { useRoute, useRouter } from 'vue-router'

export function useReplaceWithQuery(query) {
  const router = useRouter()
  const route = useRoute()
  router.replace({
    query: {
      ...route.query,
      ...query
    }
  })
}
