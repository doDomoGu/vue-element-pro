<template>
  <div>
    <!-- <el-card class="box-card">
      <div slot="header">
        <a class="link-type link-title" target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/guide/advanced/theme.html">
          {{ $t('theme.documentation') }}
        </a>
      </div>
      <div class="box-item">
        <span class="field-label">{{ $t('theme.change') }} : </span>
        <el-switch v-model="theme"/>
        <code style="margin-top:15px;">{{ $t('theme.tips') }}</code>
      </div>
    </el-card> -->
    <div class="block" id="theme-switch">
      主题切换： 
      <el-radio-group v-model="theme">
        <el-radio-button label="1">默认主题</el-radio-button>
        <el-radio-button label="2">主题2(Purple)</el-radio-button>
        <el-radio-button label="3">主题3(Teal)</el-radio-button>
      </el-radio-group>
    </div>
    <div id="theme-preview">
      <div class="block block-button">
        <div class="block__title">按钮</div>
        <el-button>default</el-button>
        <el-button type="primary">primary</el-button>
        <el-button type="success">success</el-button>
        <el-button type="info">info</el-button>
        <el-button type="warning">warning</el-button>
        <el-button type="danger">danger</el-button>
      </div>

      <div class="block block-button2">
        <div class="block__title">按钮(带图标)</div>
        <el-button type="primary" icon="el-icon-edit"/>
        <el-button type="primary" icon="el-icon-share"/>
        <el-button type="primary" icon="el-icon-delete"/>
        <el-button type="primary" icon="el-icon-search">搜索</el-button>
        <el-button type="primary">
          上传
          <i class="el-icon-upload el-icon-right"/>
        </el-button>
      </div>

      <div class="block block-tag">
        <div class="block__title">标签</div>
        <el-tag>default</el-tag>
        <el-tag type="success">success</el-tag>
        <el-tag type="info">info</el-tag>
        <el-tag type="warning">warning</el-tag>
        <el-tag type="danger">danger</el-tag>

        <!-- <el-tag v-for="tag in tags" :type="tag.type" :key="tag.type" >
          {{ tag.name }}
        </el-tag> -->
      </div>

      <div class="block">
        <div class="block__title">单选框</div>
        <el-radio-group v-model="radioValue">
          <el-radio :label="'A'">选项 A</el-radio>
          <el-radio :label="'B'">选项 B</el-radio>
          <el-radio :label="'C'">选项 C</el-radio>
        </el-radio-group>
      </div>

      <div class="block">
        <div class="block__title">开关</div>
        <el-switch v-model="switchValue" ></el-switch>
      </div>

      <div class="block">
        <div class="block__title">滑块</div>
        <el-slider v-model="sliderValue" />
      </div>
    </div>
  </div>
</template>

<script>
// import { toggleClass } from '@/utils'
// import '@/assets/custom-theme/index.css' // the theme changed version element-ui css

export default {
  name: 'Theme',
  data() {
    return {
      theme: 1,
      switchValue: true,
      sliderValue: 50,
      radioValue: 'A'
    }
  },
  watch: {
    theme(val) {
      let className = ''
      if(val == 1){
          className = ''
      }else if(val == 2){
          className = 'custom-purple'
      }else if(val == 3){
          className = 'custom-teal'
      }

      document.body.className = className
      //toggleClass(document.body, 'custom-theme')
    }
  }
}
</script>

<style lang="scss" scoped>
/* .field-label{
  vertical-align: middle;
}
.box-card {
  width: 400px;
  max-width: 100%;
  margin: 20px auto;
} */
#theme-switch {
  background: rgb(114, 222, 241)q
}

#theme-preview {
  border:1px solid #999;
  padding: 20px;
}

.block {
  padding: 30px 0;
  .block__title {
    margin-bottom: 20px;
  }
}

.block-button {
  .el-button {
    width: 100px;
  }
}
.block-button2 {
  .el-button {
    width: 120px;
  }
}

.block-tag {
  .el-tag {
    margin-right: 15px;
  }
}




</style>
