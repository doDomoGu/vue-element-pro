<template>
  <div class="markdown-body">
    <slot></slot>
  </div>
</template>
<script>
import '@/assets/highlight/monokai-sublime.css'

export default {
  name: 'Markdown',
}
</script>
<style scoped>
.markdown-body {
  
  box-sizing: border-box;
  min-width: 200px;
  /* max-width: 980px; */
  padding: 20px;
  margin-top: 10px;
  background:#fff;
}
</style>