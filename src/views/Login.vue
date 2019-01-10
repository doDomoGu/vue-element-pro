<template>
  <el-container>
    <el-header>
      Vue Element Pro
    </el-header>
    <el-main>
      <el-form :model="loginForm"
               :rules="rules"
               ref="loginForm"
               label-width="0px">
        <el-form-item prop="username">
          <el-input v-model="loginForm.username"
                    placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password"
                    placeholder="密码"
                    v-model="loginForm.password"
                    @keyup.enter.native="submitForm('loginForm')"></el-input>
        </el-form-item>
        <el-button type="primary" class="submit-btn"
                   @click="submitForm('loginForm')">登录</el-button>
      </el-form>
    </el-main>
    <el-footer>
      © 2019 abc, Inc.
    </el-footer>
  </el-container>
</template>
<script>
export default {
  data: function () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.$store.dispatch('auth/Login', [this.loginForm.username, this.loginForm.password]).then(res => {
            if (res.code === 0) {
              this.$router.push({ name: 'home' });
            } else {
              this.$alert(res.msg, '消息提示', {
                confirmButtonText: '确定',
                type: 'error',
                showClose: false,
                callback: action => { }
              });
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.el-container {
  background-color: #2d3a4b;
  min-height: 100%;
  width: 100%;
  overflow: hidden;
  & > .el-header {
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    margin-top: -230px;
    text-align: center;
    font-size: 30px;
    color: #fff;
  }

  & > .el-main {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 300px;
    height: 300px;
    margin: -150px 0 0 -150px;
  }

  & > .el-footer {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    color: rgb(190, 190, 190);
    font-size: 14px;
  }
}

.submit-btn {
  width: 100%;
  height: 36px;
}
</style>
