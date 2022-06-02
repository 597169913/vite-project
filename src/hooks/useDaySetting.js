import {
  ref,
  reactive,
  getCurrentInstance
} from 'vue'
export default function () {
  const holidayTypes = reactive(['假日', '周末'])
  const name = ref('')
  const type = ref('')
  const visible = ref(false)
  // const instance = getCurrentInstance()
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

  function close() {
    id = ''
    visible.value = false
    calendarApi = null
    selectInfo = null
    name.value = ''
    type.value = ''
  }

  function holidayChange(val) {
    name.value = val
    type.value = val !== '周末' ? '节假日' : '周末'
  }

  function show(calendarApiData, selectData) {
    visible.value = true
    calendarApi = calendarApiData
    selectInfo = selectData
  }

  function edit(clickInfo) {
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

  function sure() {
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
      const event = calendarApi.getEventById(id)
      event.setProp('title', name.value)
    }
    close()
  }

  function getGuid() {
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
  return {
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
  }
}