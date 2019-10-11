import Vue from 'vue'
import SvgIcon from '@/components/Svgicon.vue' // svg component

Vue.component('svg-icon', SvgIcon)
const req = require.context('@/assets/icons/svg', true, /\.svg$/)
const requireAll = requireContext => requireContext.keys().map(requireContext)
requireAll(req)
