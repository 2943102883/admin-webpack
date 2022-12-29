<template>
  <Icon :spin="spin" :rotate="rotate" :style="style">
    <template #component="svgProps">
      <svg
        v-bind="svgProps"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1024 1024"
      >
        <g id="图层_2" data-name="图层 2">
          <g id="图层_1-2" data-name="图层 1">
            <path
              class="cls-1"
              d="M673.05,338V507.78H640.73V338c0-2.88-2.56-5.75-5.44-5.75H183.13c-2.89,0-5.44,2.87-5.44,5.75V699.24a5.83,5.83,0,0,0,5.44,5.43H535.45v32.64H183.13c-20.8,0-38.08-17.6-38.08-38.07V338a38.38,38.38,0,0,1,38.08-38.07H635.29C656.09,299.88,673.05,317.16,673.05,338Z"
            />
            <path
              class="cls-1"
              d="M747.29,212.74v295H715v-295a6.19,6.19,0,0,0-5.76-5.76H257.05c-2.56,0-5.45,2.88-5.45,5.76v59.85H219V212.74c0-20.48,17.6-38.08,38.08-38.08H709.21C730,174.66,747.29,192.26,747.29,212.74Z"
            />
            <path
              class="cls-1"
              d="M518.7,441.59,405.77,554.52l-60.46-60.43A16.21,16.21,0,1,0,322.39,517l71.91,71.89a16.21,16.21,0,0,0,22.93,0l124.4-124.39a16.21,16.21,0,0,0-22.93-22.93Z"
            />
            <path
              class="cls-1"
              d="M734.05,559.53c-79.91,0-144.91,65-144.91,144.91s65,144.9,144.91,144.9,144.9-65,144.9-144.9S814,559.53,734.05,559.53Zm0,257.81A112.91,112.91,0,1,1,847,704.44,113,113,0,0,1,734.05,817.34Z"
            />
            <path
              class="cls-1"
              d="M791.36,705.31H739.14v-48a16,16,0,0,0-32,0v64a16,16,0,0,0,16,16h68.22a16,16,0,1,0,0-32Z"
            />
          </g>
        </g>
      </svg>
    </template>
  </Icon>
</template>
<script>
import { defineComponent } from 'vue'
import Icon from '@ant-design/icons-vue'

export default defineComponent({
  components: { Icon },
  setup() {},
  props: {
    spin: {
      type: Boolean,
      default: false,
    },
    style: {
      type: [Object, String],
    },
    rotate: {
      type: Number,
    },
  },
})
</script>
