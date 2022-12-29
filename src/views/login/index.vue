<template>
  <div class="login-bg">
    <Login :toPath="HomeIndex"/>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Login from '../../components/login/login'
import { HomeIndex } from '@/config/index'

export default defineComponent({
  components: { Login },
  setup() {
    return {
      HomeIndex: HomeIndex(),
    }
  },
})
</script>
<style lang="less" scoped>
.login-bg {
  width: 100%;
  height: 100%;
}
</style>
