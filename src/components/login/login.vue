<template>
  <div class="login_box">
    <div class="login-box">
      <a-card
        :bordered="false"
        class="card bdr-8"
        style="position: relative; z-index: 99"
        headStyle="border-bottom:0px;"
        bodyStyle="width:400px;height:450px;padding: 0;display: flex;justify-content: flex-end;align-items: center;"
      >
        <div class="form">
          <a-form
            ref="formRef"
            hideRequiredMark
            :model="formState"
            :rules="rules"
            :wrapper-col="wrapperCol"
          >
            <a-form-item name="user">
              <a-input
                class="bdr-5"
                style="width: 100%"
                placeholder="请输入用户名"
                v-model:value="formState.user"
              >
                <template #prefix>
                  <UserOutlined
                    style="font-size: 26px"
                    class="mr-[8px]"
                    :style="fontColor"
                  />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item name="password">
              <a-input
                style="width: 100%"
                class="bdr-5"
                v-model:value="formState.password"
                placeholder="请输入密码"
                type="password"
              >
                <template #prefix>
                  <LockOutlined
                    style="font-size: 26px"
                    class="mr-[8px]"
                    :style="fontColor"
                  />
                </template>
              </a-input>
            </a-form-item>
            <a-form-item>
              <a-button
                type="primary"
                @click="onSubmit"
                :loading="loading"
                class="login-btn"
                :style="style"
              >
                登录
              </a-button>
            </a-form-item>
          </a-form>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import { defineComponent, reactive, ref, onMounted, computed } from 'vue'
import { mapActions, useStore } from 'vuex'
import { message } from 'ant-design-vue'
import { useRouter } from 'vue-router'
export default defineComponent({
  props: {
    bgImgUrl: {
      type: String,
    },
    bgColor1: {
      type: String,
      default: '#40A9FF',
    },
    bgColor2: {
      type: String,
      default: '#364D79',
    },
    gradient: {
      type: Boolean,
      default: true,
    },
    deg: {
      type: String,
      default: '0deg',
    },
    title: {
      type: String,
      default: '',
    },
    toPath: {
      type: String,
      default: 'HomeIndex',
    },
  },
  setup(props) {
    const $store = useStore()
    const router = useRouter()
    const imgSrc = ref(props.bgImgUrl)
    const loading = ref(false)
    const formRef = ref()
    const systemName = ref('')
    const style = ref('')
    const fontColor = ref('')
    onMounted(() => {
      window.addEventListener('keydown', clickEnter)
    })
    const clickEnter = (e) => {
      if (e.keyCode == 13) {
        onSubmit()
      }
    }
    const handler = {
      $store,
      ...mapActions('User', ['doLogin', 'logout']),
    }
    const formState = reactive({
      user: '',
      password: '',
    })
    const rules = {
      user: [
        {
          required: true,
          message: '请输入用户名',
          trigger: 'change',
        },
      ],
      password: [
        {
          required: true,
          message: '请输入用户密码',
          trigger: 'change',
        },
      ],
    }
    const onSubmit = () => {
      formRef.value
        .validate()
        .then(() => {
          handleLogin()
        })
        .catch((error) => {
          console.log('error', error)
        })
    }

    const getLoginType = (env) => {
      let Path = {
        ADMIN: 'admin',
        CATERING: 'catering',
        GOVERNMENT: 'government',
        ORG: 'org',
        SCHOOL: 'school',
      }

      return Path[env.VUE_APP_MENU] || ''
    }

    const handleLogin = () => {
      loading.value = true
      const user = formState.user.trim()
      const pass = formState.password.trim()
      const type = getLoginType(process.env)
      window.localStorage.setItem('type', type)
      handler
        .doLogin({ user, pass, type })
        .then(() => {
          loading.value = false
          router.push({ name: props.toPath })
        })
        .catch((err) => {
          message.error('密码错误')
          console.log('密码错误', err)
          loading.value = false
        })
    }

    // 根据属性设置登录的背景'
    const backStyle = computed(() => {
      let style = {
        // width: '100%',
        // height: '100%',
        // 'min-width': '1200px',
        // overflow: 'hidden',
        // position: 'relative'
      }
      if (props.gradient) {
        style['background-color'] = props.bgColor1
        style[
          'background-image'
        ] = `linear-gradient(0deg, ${props.bgColor1} 0%, ${props.bgColor2} 100%)`
      }
      return style
    })

    const getPath = (env) => {
      let Path = {
        ADMIN: '后台管理平台',
        CATERING: '配餐管理平台',
        GOVERNMENT: '教育主管管理平台',
        ORG: '机构管理平台',
        SCHOOL: '学校管理平台',
      }

      return Path[env.VUE_APP_MENU] || ''
    }

    systemName.value = getPath(process.env)
    const setStyle = (env) => {
      let path = {
        ADMIN: {
          backgroundColor: '#F5893B',
          borderColor: '#F5893B',
        },
        CATERING: {
          backgroundColor: '#007C97',
          borderColor: '#007C97',
        },
        GOVERNMENT: {
          backgroundColor: '#4F00B5',
          borderColor: '#4F00B5',
        },
        ORG: {
          backgroundColor: '#DA1717',
          borderColor: '#DA1717',
        },
        SCHOOL: {
          backgroundColor: '#4B73FF',
          borderColor: '#4B73FF',
        },
      }
      return path[env.VUE_APP_MENU] || ''
    }
    style.value = setStyle(process.env)
    const setColor = (env) => {
      let path = {
        ADMIN: {
          color: '#F5893B',
        },
        CATERING: {
          color: '#007C97',
        },
        GOVERNMENT: {
          color: '#4F00B5',
        },
        ORG: {
          color: '#DA1717',
        },
        SCHOOL: {
          color: '#4B73FF',
        },
      }
      return path[env.VUE_APP_MENU] || ''
    }
    fontColor.value = setColor(process.env)
    return {
      imgSrc,
      formRef,
      loading,
      formState,
      rules,
      systemName,
      // labelCol: {
      //   span: 7,
      // },
      wrapperCol: {
        span: 24,
      },
      //方法
      onSubmit,
      backStyle,
      setStyle,
      setColor,
      style,
      fontColor,
    }
  },
})
</script>
<style scoped lang="less">
.login_box {
  position: fixed;
  width: 100%;
  height: 100%;
  background-image: url(../../assets/image/login_bg.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
}
.login-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.bdr-8 {
  border-radius: 8px;
}
.bdr-5 {
  border-radius: 5px;
}
.card {
  width: 400px;
  height: 450px;
  display: flex;
  align-items: center;
  .left-logo {
    width: 50%;
    flex: 1.3;
    height: 100%;
    background: #4b73ff;
    border-radius: 0px 0px 0px 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 60px;
    img {
      width: 180px;
      height: 80px;
    }
  }
  .form {
    width: 50%;
    flex: 1.5;
    height: 100%;
    background: #ffffff;

    padding: 60px;
    display: flex;
    justify-content: center;
    align-items: left;
    flex-direction: column;
    .login {
      background: #4b73ff;
      border-radius: 50px;
      color: #fff;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
:deep(.ant-card) {
  background: transparent;
}
:deep(.login-btn) {
  background: #4b73ff;
  border-radius: 30px;
  width: 280px;
}
:deep(.ant-input-affix-wrapper) {
  border: 0px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
:deep(.ant-input-affix-wrapper .ant-input) {
  position: relative;
  text-align: inherit;
  border: none;
  padding: 0;
  font-size: 17px;
}
.img {
  padding-right: 24px;
}
.ant-form-item {
  width: 280px;
}

.anim {
  width: 100%;
  height: 100%;
  position: relative;
  min-width: 1400px;
  z-index: 1;
}
.animbg {
  position: absolute;
  left: -10%;
  display: block;
  width: 120%;
  margin: 0 auto;
}

.animone {
  top: 40%;
  animation: lefttoright 2s 0.5s linear infinite alternate;
  display: block;
}

.animtow {
  top: 50%;
  animation: righttoleft 5s linear infinite alternate;
}

.animthree {
  top: 60%;
  animation: lefttoright 3.5s ease-in-out infinite alternate;
}

.footer {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 351px;
  color: #000;
  font-size: 14px;
  overflow: hidden;
  z-index: 1;
}
.footer-title-box {
  position: absolute;
  bottom: 10%;
  width: 100%;
  z-index: 10;
}
.footerTitle {
  position: absolute;
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 60px;
  z-index: 2;
  font-size: 16px;
}
@keyframes lefttoright {
  10% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(50px);
  }

  100% {
    transform: translateX(0px);
  }
}

@keyframes righttoleft {
  0% {
    transform: translateX(0px);
  }

  50% {
    transform: translateX(-50px);
  }

  100% {
    transform: translateX(0px);
  }
}
</style>
