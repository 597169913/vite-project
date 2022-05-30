<template>
  <el-dialog
    :title="title"
    v-model="visible"
    @close="close"
    width="400px"
  >
    <el-form
      ref="form"
      label-width="90px"
    >
      <el-form-item label="节假日名称">
        <el-select
          v-model="name"
          @change="holidayChange"
          placeholder="请选择"
        >
          <el-option
            v-for="item in holidayNames"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="节假日类型">
        <el-select
          v-model="type"
          placeholder="请选择"
        >
          <el-option
            v-for="item in holidayTypes"
            :label="item"
            :value="item"
            :key="item"
          ></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <div>
        <el-button @click="close">取消</el-button>
        <el-button
          @click="sure"
          type="primary"
        >确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, defineExpose } from 'vue'
import useDaySetting from '@/hooks/useDaySetting'
let title = ref('设置节假日')
const {
  name,
  type,
  visible,
  holidayTypes,
  holidayNames,
  holidayChange,
  show,
  edit,
  close,
  sure,
  getGuid
} = useDaySetting()
defineExpose({
  show,
  edit
})
</script>