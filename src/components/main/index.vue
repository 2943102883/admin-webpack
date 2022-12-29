<template>
  <!-- 主界面框架 -->
  <a-layout style="display: flex">
    <!-- 左侧模块导航栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      collapsedWidth="48"
      width="235"
      class="custom-sider"
      :style="{ overflow: 'auto', height: '100vh' }"
      collapsible
    >
      <div
        class="d-flex flex-column-to justify-space-between"
        style="height: 100%"
      >
        <div>
          <div
            class="justify-center d-flex pt-[24px] pl-[14px] items-center pb-[28px] pr-[14px]"
            v-if="collapsed != true"
          >
            <img src="../../assets/image/logo.png" class="w-[48px] h-[48px]" />
            <p class="mb-0 text-[16px] pl-[8px] text-white font-medium">
              {{ systemName }}
            </p>
          </div>
          <div
            class="justify-center d-flex pt-[24px] pl-[14px] items-center pb-[28px] pr-[14px]"
            v-else
          >
            <img src="../../assets/image/logo.png" class="w-[36px] h-[36px]" />
          </div>
          <a-menu
            theme="dark"
            mode="inline"
            class="sider-menu"
            :openKeys="openKeys"
            v-model:selectedKeys="selectedKeys"
            :inlineCollapsed="collapsed"
            @openChange="onOpenChange"
            v-if="menuLinsName.length"
          >
            <template v-for="item in menuLinsName" :key="item.name">
              <template v-if="item.meta && !item.meta.hide">
                <template v-if="!item.children || item.children.length === 0">
                  <a-menu-item
                    @click="go(item)"
                    :key="item.name"
                    v-if="item.meta && !item.meta.hide"
                  >
                    <template #icon>
                      <component
                        :is="item.meta.icon"
                        :style="{ fontSize: '18px' }"
                      ></component>
                    </template>
                    {{ item.meta.title }}
                  </a-menu-item>
                </template>
                <template v-else>
                  <a-sub-menu
                    :class="
                      item.name === actRoute ? 'ant-menu-item-selected' : ''
                    "
                    :key="item.name"
                  >
                    <template #icon>
                      <component
                        :is="item.meta.icon"
                        :style="{ fontSize: '18px' }"
                      ></component>
                    </template>
                    <template #title>
                      {{ item.meta.title }}
                    </template>
                    <template
                      v-for="(itemSub, index) in item.children"
                      :key="index"
                    >
                      <template
                        v-if="!itemSub.children || itemSub.children.length == 0"
                      >
                        <a-menu-item
                          style="margin: 0"
                          :key="itemSub.name"
                          v-if="itemSub.meta && !itemSub.meta.hide"
                          @click="go(itemSub)"
                        >
                          <span class="flex items-center">
                            <component
                              :is="itemSub.meta.icon"
                              style="font-size: 18px"
                            ></component>
                            <span>{{ itemSub.meta.title }}</span>
                          </span>
                        </a-menu-item>
                      </template>
                      <template>
                        <a-sub-menu :key="'secondSub' + index">
                          <template #title>
                            <span>
                              <component
                                :is="'Icon' + itemSub.meta.icon"
                                style="font-size: 18px"
                              ></component>
                              <span class="nav-text">
                                {{ itemSub.meta.title }}
                              </span>
                            </span>
                          </template>
                          <a-menu-item
                            :style="{ background: '#f5f5f5' }"
                            v-for="secondItemSub in itemSub.children"
                            :key="secondItemSub.name"
                            @click="go(secondItemSub)"
                          >
                            <span class="flex items-center">
                              <component
                                :is="secondItemSub.meta.icon"
                                style="font-size: 18px"
                              ></component>
                              <span>{{ secondItemSub.meta.title }}</span>
                            </span>
                          </a-menu-item>
                        </a-sub-menu>
                      </template>
                    </template>
                  </a-sub-menu>
                </template>
              </template>
            </template>
            <!-- <template v-for="item in getMeunList()">
              <a-menu-item
                :key="item.to.name"
                class="px-6"
                @click="go(item)"
                v-if="!item.isHide"
              >
                <div class="flex items-center">
                  <component
                    :is="item.icon"
                    :style="{ fontSize: '18px', marginRight: '4px' }"
                  ></component>
                  <span class="nav-text">{{ item.text }}</span>
                </div>
              </a-menu-item>
            </template> -->
          </a-menu>
        </div>

        <div>
          <div>
            <a-menu
              theme="dark"
              mode="inline"
              class="sider-menu"
              v-model:selectedKeys="selectedKeys"
              :inlineCollapsed="collapsed"
            >
              <template v-for="item in menuBaseName">
                <a-menu-item
                  :key="item.name"
                  class="px-6"
                  @click="go(item)"
                  v-if="item.meta && !item.meta.hide"
                >
                  <div class="flex items-center">
                    <component
                      :is="item.meta.icon"
                      :style="{ fontSize: '18px', marginRight: '4px' }"
                    ></component>
                    <span class="nav-text">{{ item.meta.title }}</span>
                  </div>
                </a-menu-item>
              </template>
            </a-menu>
          </div>
          <div class="d-flex" style="margin-bottom: 12px; cursor: pointer">
            <a-popover placement="right">
              <template #content>
                <div
                  style="
                    width: 80px;
                    border-bottom: 1px solid #eee;
                    padding: 8px 0;
                  "
                  class="items-center d-flex justify-space-between align-center"
                >
                  <a
                    @click="go({ name: 'UserPersonal' })"
                    style="color: rgba(0, 0, 0, 0.85)"
                  >
                    个人信息
                  </a>
                  <component :is="'LeafUser'"></component>
                </div>
                <div
                  style="width: 80px; padding: 8px 0"
                  class="items-center d-flex justify-space-between align-center"
                >
                  <a @click="logout" style="color: rgba(0, 0, 0, 0.85)">退出</a>

                  <component :is="'LeafSignOut'"></component>
                </div>
                <div
                  style="width: 80px; padding: 8px 0"
                  class="items-center d-flex justify-space-between align-center"
                ></div>
              </template>
              <a-avatar
                alt="头像"
                :style="{ margin: '0 auto' }"
                :size="36"
                :src="userAvatarSrc"
              />
            </a-popover>
          </div>
        </div>
      </div>
    </a-layout-sider>
    <a-layout style="flex: auto">
      <!-- 主工作区 -->
      <a-layout-content :style="{ overflow: 'hidden', height: '100vh' }">
        <transition name="fade">
          <router-view></router-view>
        </transition>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>
<script>
import { useRoute, useRouter } from 'vue-router'
import { userModuleAvatar } from '@doxlab/atomleaf/module/user/api'
import { useStore, mapMutations, mapGetters } from 'vuex'
import { computed, defineComponent, reactive, ref, toRefs, watch } from 'vue'
import Icon from '@ant-design/icons-vue'

// @ is an alias to /src
const getTreeDataByKey = (childs = [], findKey) => {
  let findItem = null
  for (let i = 0, len = childs.length; i < len; i++) {
    let item = childs[i]
    if (item.children && item.children.length > 0) {
      findItem = getTreeDataByKey(item.children, findKey)
    }
    if (item.name && item.name == findKey) {
      findItem = item
    }
    if (findItem != null) {
      break
    }
  }
  return findItem
}
export default defineComponent({
  components: { Icon },
  setup() {
    const router = useRouter()
    const $store = useStore()
    let { logout } = mapMutations('User', ['logout'])

    let handle = {
      $store,
      ...mapGetters('User', ['userInfo']),
      ...mapGetters('Menu', ['getMenuList']),
    }

    let user = handle.userInfo()

    const image = ref('')
    const systemName = ref('')
    const route = useRoute()
    const state = reactive({
      selectedKeys: [],
      rootSubmenuKeys: [],
      itemMenu: [],
      actRoute: '', //最高级当前菜单
      actNavRoute: '', //第二级当前菜单栏
    })
    const base = ['System', 'User']

    const menuList = handle.getMenuList()
    state.rootSubmenuKeys = menuList.map((item) => item.name)

    // 获取基础功能和用户meun
    const getMenuBase = () => {
      return menuList.filter((data) => base.includes(data.name))
    }

    // 获取正常menu
    const getMenuList = () => {
      return menuList.filter((data) => !base.includes(data.name))
    }
    // 跟踪路由变化绑定当前项 selectedKeys
    const bindNavRoute = function () {
      // 监听最高级路由是否发生变化，-1为变化，需重新加载Mune,为>0时不需要加Mune，只需要判断nav子菜单的当前项
      let index = route.matched.findIndex((data) => data.name == state.actRoute)
      // 如果不为-1，说明最高级菜单还没切换
      if (index == -1) {
        checkout()
      } else {
        // 判断路由变化后的路由是否为当前路由下的子路由，不是为-1，是就不改变当前菜单选中项
        let navMenu = getTreeDataByKey(menuList, route.name)

        if (navMenu) {
          state.selectedKeys = [route.name]
          state.actNavRoute = route.name
        } else {
          state.selectedKeys = [state.actNavRoute]
        }
      }
    }

    bindNavRoute()
    // 最高级菜单切换
    function checkout() {
      state.selectedKeys = [route.name]
      let item = {}
      menuList.forEach((data) => {
        for (let val of route.matched) {
          if (data.name == val.name) {
            item = data
          }
        }
      })
      if (Object.keys(item).length > 0) {
        state.actRoute = item.name
        state.itemMenu = item.children
      }
    }

    // 监听路由变化
    watch(
      () => route.name,
      () => {
        bindNavRoute()
      },
      {
        immediate: false,
        deep: false,
      },
    )
    const userAvatarSrc = computed(() => {
      if (user.avatar && user.avatar.id) {
        return userModuleAvatar(user.avatar.id, user.avatar.name, 'small')
      } else {
        return ''
      }
    })
    // 导航
    function go(item) {
      if (item.name) {
        router.push({ name: item.name })
      }
    }

    let openKeys = ref([])

    const onOpenChange = (openMenuKeys) => {
      const latestOpenKey = openMenuKeys.find(
        (key) => openKeys.value.indexOf(key) === -1,
      )

      if (state.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        openKeys.value = openMenuKeys
      } else {
        openKeys.value = latestOpenKey ? [latestOpenKey] : []
      }
    }

    const menuBaseName = ref(getMenuBase())
    const menuLinsName = ref(getMenuList())
    const getPath = (env) => {
      let Path = {
        ADMIN: '端校易平台',
        CATERING: '配餐管理',
        GOVERNMENT: '监管统计',
        ORG: '机构课程管理',
        SCHOOL: '课后服务管理',
      }

      return Path[env.VUE_APP_MENU] || ''
    }

    systemName.value = getPath(process.env)
    return {
      menuList,
      userAvatarSrc,
      onOpenChange,
      ...toRefs(state),
      go,
      openKeys,
      logout,
      menuBaseName,
      menuLinsName,
      systemName,
    }
  },
  data() {
    return {
      collapsed: false,
    }
  },
})
</script>
<style scoped>
.logo {
  margin: 16px 0;
  align-content: center;
}

.site-layout .site-layout-background {
  background: #fff;
}

.sider-menu.ant-menu-inline-collapsed {
  width: 48px;
}

[data-theme='dark'] .site-layout .site-layout-background {
  background: #141414;
}

.flex-column {
  flex-direction: column;
}

.align-center {
  align-content: center;
}

.justify-center {
  justify-content: center;
}

.justify-space-between {
  justify-content: space-between;
}

.flex-grow-1 {
  flex-grow: 1;
}

.flex-column-to {
  flex-direction: column;
}

:deep(.sider-menu.ant-menu-inline-collapsed
    > .ant-menu-submenu
    > .ant-menu-submenu-title) {
  margin-bottom: 0 !important;
}

:deep(.sider-menu.ant-menu-inline-collapsed > .ant-menu-item) {
  padding: 0 16px !important;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.custom-sider::-webkit-scrollbar {
  width: 1px;
  /*height: 4px;*/
}

.custom-sider::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: rgba(0, 0, 0, 0.2);
}

.custom-sider::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  border-radius: 0;
  background: rgba(0, 0, 0, 0.1);
}

@media print {
  :deep(.ant-layout-sider) {
    display: none;
  }
}
</style>
