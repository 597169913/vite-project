<template>
  <div>测试：{{name}}</div>
</template>
<script setup>
import { ref, reactive } from 'vue'
const name = ref('name1')
</script>