<template>
  <ul class="flex items-center justify-center mt-5 gap-2">
    <li
      v-for="(link, key) in getPageLinks"
      :key="key"    
    >
      <button
        v-if="link.url"
        class=" px-4 py-2"
        @click="$emit('changePage', link.url)"
        :class="link.active ? 'bg-primary text-white' : 'bg-gray-100' "
      >
        {{ link.label }}
      </button>
      <span v-else class="">{{ link.label }}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'DynamicPagination',
  props: {
    itemsToPaginate: {
      required: true
    }
  },
  emits: ['changePage'],
  computed: {
    getPageLinks() {
      const links = []
      const totalPages = this.itemsToPaginate.last_page || 0
      const currentPage = this.itemsToPaginate.current_page || 1

      const maxVisiblePages = 5 // Maximum visible pages

      if (totalPages <= maxVisiblePages) {
        for (let i = 1; i <= totalPages; i++) {
          links.push({
            label: i.toString(),
            url: `${this.itemsToPaginate?.path}?page=${i}`,
            active: i === currentPage
          })
        }
      } else {
        if (currentPage <= 2) {
          for (let i = 1; i <= maxVisiblePages - 1; i++) {
            links.push({
              label: i.toString(),
              url: `${this.itemsToPaginate?.path}?page=${i}`,
              active: i === currentPage
            })
          }
          links.push({ label: '...', url: '', active: false })
          links.push({
            label: totalPages.toString(),
            url: `${this.itemsToPaginate?.path}?page=${totalPages}`,
            active: currentPage === totalPages
          })
        } else if (currentPage >= totalPages - 1) {
          links.push({
            label: '1',
            url: `${this.itemsToPaginate?.path}?page=1`,
            active: currentPage === 1
          })
          links.push({ label: '...', url: '', active: false })
          for (let i = totalPages - (maxVisiblePages - 2); i <= totalPages; i++) {
            links.push({
              label: i.toString(),
              url: `${this.itemsToPaginate?.path}?page=${i}`,
              active: i === currentPage
            })
          }
        } else {
          links.push({
            label: '1',
            url: `${this.itemsToPaginate?.path}?page=1`,
            active: currentPage === 1
          })
          links.push({ label: '...', url: '', active: false })
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            links.push({
              label: i.toString(),
              url: `${this.itemsToPaginate?.path}?page=${i}`,
              active: i === currentPage
            })
          }
          links.push({ label: '...', url: '', active: false })
          links.push({
            label: totalPages.toString(),
            url: `${this.itemsToPaginate?.path}?page=${totalPages}`,
            active: currentPage === totalPages
          })
        }
      }

      return links
    }
  }
}
</script>
