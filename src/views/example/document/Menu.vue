<template>
  <markdown>
    <md-content />
  </markdown>
</template>
<script>
import markdown from '@/components/markdown'
import mdContent from './Menu.md'

export default {
  components: { markdown, mdContent },
  name: 'document-menu'
}
</script>