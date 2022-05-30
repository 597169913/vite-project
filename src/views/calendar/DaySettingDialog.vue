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
        <el-select v-model="type" placeholder="请选择">
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
import { ref, reactive, defineExpose, getCurrentInstance } from 'vue'
let title = ref('设置节假日')
const holidayTypes = reactive(['假日', '周末'])
const name = ref('')
const type = ref('')
const visible = ref(false)
const instance = getCurrentInstance()
let calendarApi = null
let selectInfo = null
let id = null
const holidayNames = reactive([
  '春节',
  '清明节',
  '劳动节',
  '端午节',
  '中秋节',
  '国庆节',
  '元旦',
  '周末'
])
function close () {
  id = ''
  visible.value = false
}
function holidayChange (val) {
  name.value = val
  type.value = val !== '周末' ? '节假日' : '周末'
}
function show (calendarApiData, selectData) {
  visible.value = true
  calendarApi = calendarApiData
  selectInfo = selectData
}
function edit (clickInfo) {
  const event = clickInfo.event
  const calendarApiData = clickInfo.view.calendar
  if (!calendarApi) {
    calendarApi = calendarApiData
  }
  visible.value = true
  name.value = event.title
  id = event.id
  if (event.title === '周末') {
    type.value = '周末'
  } else {
    type.value = '假日'
  }
}
function sure () {
  if (!id) {
    calendarApi.addEvent({
      id: getGuid(),
      title: name.value,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      allDay: selectInfo.allDay,
      className: 'holiday',
      color: 'red',
      editable: true
    })
  } else {
    const event = calendarApi.getEventById(instance.id)
    event.setProp('title', name.value)
  }
  close()
}
function getGuid () {
  const S4 = () =>
    (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
  return (
    S4() +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    '-' +
    S4() +
    S4() +
    S4()
  )
}
defineExpose({
  show,
  edit
})
</script>