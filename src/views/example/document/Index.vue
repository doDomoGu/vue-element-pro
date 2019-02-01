<template>
  <div>
    <router-link :to="{'name':'document-md','query':{'p':'menu'}}" >菜单</router-link>
    <router-link :to="{'name':'document-md','query':{'p':'mock'}}" >Mockjs</router-link>
    <markdown>
      <md-menu v-if="p=='menu'" />
      <md-mock v-else-if="p=='mock'" />
    </markdown>
  </div>
</template>
<script>
import markdown from '@/components/markdown'
import mdMenu from './Menu.md'
import mdMock from './Mock.md'

export default {
  components: { 
    markdown,
    mdMenu,
    mdMock 
  },
  name: 'document-menu',
  mounted(){
    this.init()
  },
  watch: {
    '$route' () {
        this.init()
    }
  },
  data(){
    return {
      "p" : "menu"
    }
  },
  methods:{
    init(){
      if(this.$route.query && this.$route.query.p){
        this.p = this.$route.query.p
      }
      
    }
  }
}
</script>