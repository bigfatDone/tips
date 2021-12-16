<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
const getList = () => {
  // 跟上面一样的代码
}

  // 这样直接获取当前节点的实例
const container = ref<HTMLElement>() // container节点
const blank = ref<HTMLElement>() // blank节点

const list = ref<any>([]) // 列表
const page = ref(1) // 当前页数
const limit = 200 // 一页展示
// 最大页数
const maxPage = computed(() => Math.ceil(list.value.length / limit))
// 真实展示的列表
const showList = computed(() => list.value.slice(0, page.value * limit))
// 滚动行为
const handleScroll = () => {
  // 当前页数与最大页数的比较
  if (page.value > maxPage.value) return
  const clientHeight = container.value?.clientHeight
  const blankTop = blank.value?.getBoundingClientRect().top
  if (clientHeight === blankTop) {
    // blank出现在视图，则当前页数加1
    page.value++
  }
}

onMounted(async () => {
  const res = await getList()
  list.value = res
})
</script>

<template>
  <div id="container" @scroll="handleScroll" ref="container">
    <div class="sunshine" v-for="(item) in showList" :key="item.tid">
      <img :src="item.src" />
      <span>{{ item.text }}</span>
    </div>
    <!-- 标志位,当出现的时候就说明到底了,就要翻页 -->
    <div ref="blank"></div> 
  </div>
</template>