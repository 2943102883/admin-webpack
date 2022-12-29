<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="30.6"
    height="24.89"
    viewBox="0 0 30.6 24.89"
  >
    <g id="yuefeng_logo" transform="translate(0.25)">
      <g id="图层_1" data-name="图层 1">
        <rect
          id="矩形_2"
          data-name="矩形 2"
          width="11.57"
          height="10.33"
          transform="translate(0.5 2.12)"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <line
          id="直线_1"
          data-name="直线 1"
          y2="2.12"
          transform="translate(0.51)"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <line
          id="直线_2"
          data-name="直线 2"
          x2="6.09"
          transform="translate(3.24 7.27)"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <line
          id="直线_3"
          data-name="直线 3"
          y2="3.37"
          transform="translate(6.29 5.44)"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <path
          id="路径_1"
          data-name="路径 1"
          d="M12.43,16.39H.56v3.85H12.13v3.68H.14"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <path
          id="路径_2"
          data-name="路径 2"
          d="M16.94,24.59V1.87H28.3V24.14h2.05"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <line
          id="直线_4"
          data-name="直线 4"
          x1="5.46"
          y2="6.07"
          transform="translate(20.03 10.06)"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
        <line
          id="直线_5"
          data-name="直线 5"
          x2="5.58"
          y2="6.19"
          transform="translate(19.89 10.01)"
          fill="none"
          stroke="#a7adb4"
          stroke-miterlimit="10"
          stroke-width="1.5"
        />
      </g>
    </g>
  </svg>
</template>
<script>
import { defineComponent } from 'vue'

export default defineComponent({
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
