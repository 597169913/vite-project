<template>
  <el-dialog :title="title" :visible="visible" @close="close" width="400px">
    <el-form ref="form" label-width="90px">
      <el-form-item label="节假日名称">
        <el-select v-model="name" @change="holidayChange">
          <el-option v-for="item in holidayNames" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="节假日类型">
        <el-select v-model="type">
          <el-option v-for="item in holidayTypes" :label="item" :value="item" :key="item"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button @click="close">取消</el-button>
      <el-button @click="sure" type="primary">确定</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  data() {
    return {
      visible: false,
      title: '设置节假日',
      holidayTypes: ['假日', '周末'],
      name: '',
      type: '',
      holidayNames: [
        '春节',
        '清明节',
        '劳动节',
        '端午节',
        '中秋节',
        '国庆节',
        '元旦',
        '周末'
      ]
    }
  },
  methods: {
    close() {
      this.id = ''
      this.visible = false
    },
    holidayChange(val) {
      this.name = val
      this.type = val !== '周末' ? '节假日' : '周末'
    },
    show(calendarApi, selectInfo) {
      this.visible = true
      this.calendarApi = calendarApi
      this.selectInfo = selectInfo
    },
    edit(clickInfo) {
      const event = clickInfo.event
      const calendarApi = clickInfo.view.calendar
      if (!this.calendarApi) {
        this.calendarApi = calendarApi
      }
      this.visible = true
      this.name = event.title
      this.id = event.id
      if (event.title === '周末') {
        this.type = '周末'
      } else {
        this.type = '假日'
      }
    },
    sure() {
      if (!this.id) {
        this.calendarApi.addEvent({
          id: this.getGuid(),
          title: this.name,
          start: this.selectInfo.startStr,
          end: this.selectInfo.endStr,
          allDay: this.selectInfo.allDay,
          className: 'holiday',
          color: 'red',
          editable: true
        })
      } else {
        const event = this.calendarApi.getEventById(this.id)
        event.setProp('title', this.name)
      }
      this.close()
    },
    getGuid() {
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
  }
}
</script>