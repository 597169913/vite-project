<template>
  <div
    class="calender-home"
    :style="{height: height+ 'px'}"
  >
    <full-calendar
      :options="calendarOptions"
      ref="calendar"
    />
    <day-setting-dialog ref="settingDialog" />
  </div>
</template>
<script setup>
import '@fullcalendar/core/vdom'
import FullCalendar from '@fullcalendar/vue3'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import DaySettingDialog from './DaySettingDialog.vue'

import { ref, reactive, getCurrentInstance } from 'vue'
import { ElMessage } from 'element-plus'
import useCalendar from '@/hooks/useCalendar'
const height = ref(document.documentElement.clientHeight - 300)
const plugins = [
      dayGridPlugin,
      interactionPlugin,
      timeGridPlugin
      // bootstrapPlugin
]
const {
  calendarOptions,
  eventSources,
  dayClick,
  handleDateSelect,
  handleEventRender,
  handleEvents,
  handleEventChange,
  handleEventContent,
  addFestival,
  addWeekend,
  getGuid
} = useCalendar(plugins)
</script>
<style scoped>
.calender-home {
  width: 95%;
  margin: 0 auto;
  height: 90%;
}
</style>
<style>
.delete-btn {
  position: absolute;
  right: 10px;
}
.fc-daygrid-day.fc-day-sat .fc-daygrid-day-number,
.fc-daygrid-day.fc-day-sun .fc-daygrid-day-number {
  color: red;
}
.fc-daygrid-day.fc-day-sat label,
.fc-daygrid-day.fc-day-sun label {
  color: red;
}
.fc-day-other a.holiday {
  border-color: #2c3e50;
  background-color: #2c3e50;
}
.fc-day-other.fc-day-sat .fc-daygrid-day-number,
.fc-day-other.fc-day-sun .fc-daygrid-day-number {
  color: #2c3e50;
}
.fc-daygrid-day:hover {
  background-color: #f3f8fa;
}
/* .fc-daygrid-day label {
  position: absolute;
  top: 10px;
  left: 10px;
}
.fc-daygrid-day span {
  position: absolute;
  right: 10px;
  top: 5px;
} */
.fc-daygrid-day-top p {
  width: 100%;
}
.fc-daygrid-day-top label {
  width: calc(50% - 10px);
  text-align: left;
  display: inline-block;
  margin-left: 10px;
}
.fc-daygrid-day-top span {
  text-align: right;
  display: inline-block;
  width: calc(50% - 10px);
  margin-right: 10px;
  color: #7d8292;
}
.fc-theme-standard td,
.fc-theme-standard th {
  border-color: #eaecf1;
}
</style>