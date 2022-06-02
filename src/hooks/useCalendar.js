import moment from 'moment'
import {
  calendar as calenderFormate
} from '@/views/calendar/utils/calendar'
import {
  formatDate
} from '@/views/calendar/utils/dateTime'
import {
  reactive,
  getCurrentInstance
} from 'vue'
import {
  ElMessage
} from 'element-plus'
export default function (plugins) {
  const calendarOptions = reactive({
    height: document.documentElement.clientHeight - 200,
    locale: 'zh-cn',
    // themeSystem: 'bootstrap',
    plugins: plugins,
    initialView: 'dayGridMonth',
    headerToolbar: {
      // 日历头部按钮位置
      left: 'prev,next',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay'
    },
    footerToolbar: {
      center: 'custom1 custom2'
    },
    firstDay: 0, // 设置一周中显示的第一天是哪天，周日是0，周一是1，类推。,
    eventColor: '#3BB2E3',
    // aspectRatio: 1,
    initialDate: moment().format('YYYY-MM-DD'),
    eventLimit: true,
    buttonText: {
      today: '今天',
      month: '月',
      week: '周',
      day: '日'
    },
    slotLabelFormat: {
      hour: '2-digit',
      minute: '2-digit',
      meridiem: false,
      hour12: false // 设置时间为24小时
    },
    customButtons: {
      custom1: {
        text: '批量全年设置节假日',
        click: () => {
          addFestival()
        }
      },
      custom2: {
        text: '批量设置当前月的周末',
        click: () => {
          addWeekend()
        }
      },
      custom3: {
        text: '设置节假日',
        click: () => {
          alert('clicked the custom3 button!')
        }
      },
      custom4: {
        text: '设置周末',
        click: () => {
          alert('clicked the custom4 button!')
        }
      }
    },
    allDayText: '全天',
    views: {
      dayGridMonth: {
        displayEventTime: false, //是否显示时间
        dayCellContent(item) {
          // const day = new Date(item.date).getDate()
          // return {
          //   html: `<a class="fc-daygrid-day-number">${day}</a>`
          // }
          let _date = formatDate(item.date, 'yyyy-MM-dd').split('-')
          const _dateF = calenderFormate.solar2lunar(
            _date[0],
            _date[1],
            _date[2]
          )
          const festivalName = _dateF.lunarFestival || _dateF.festival
          const subName = festivalName ?
            festivalName :
            _dateF.IDayCn === '初一' ?
            _dateF.IMonthCn :
            _dateF.IDayCn
          return {
            html: `<p id="${_dateF.festival ? 'holiday-item' : ''
              }"><label>${_dateF.cDay}</label><span>${subName}</span></p>`
          }
        }
      }
    },
    selectMinDistance: 0,
    editable: true,
    selectable: true,
    selectMirror: false,
    dayMaxEvents: true,
    weekends: true,
    select: handleDateSelect,
    dayClick: dayClick,
    eventClick: handleEventClick,
    eventsSet: handleEvents,
    eventChange: handleEventChange,
    eventContent: handleEventContent,
    eventBackgroundColor: '#212121'
  })
  const eventSources = reactive({})
  const instance = getCurrentInstance()

  function dayClick() {
    alert('触发dayClick事件！')
  }

  function handleDateSelect(selectInfo) {
    // let title = prompt('Please enter a new title for your event')
    let calendarApi = selectInfo.view.calendar
    calendarApi.unselect() // clear date selection
    instance.refs.settingDialog.show(calendarApi, selectInfo)
  }

  function handleEventClick(clickInfo) {
    // if (
    //   confirm(
    //     `Are you sure you want to delete the event '${clickInfo.event.title}'`
    //   )
    // ) {
    //   clickInfo.event.remove()
    // }
    instance.refs.settingDialog.edit(clickInfo)
  }

  function handleEventRender(event, element) {
    element.qtip({
      content: event.description
    })
  }

  function handleEvents(events) {
    this.currentEvents = events
  }

  function handleEventChange(event) {
    console.log(event)
  }

  function handleEventContent(arg) {
    const italicEl = document.createElement('span')
    italicEl.innerHTML = arg.event._def.title
    const italicEl1 = document.createElement('span')
    italicEl1.className = 'delete-btn'
    italicEl1.innerHTML = '删除'
    const arrayOfDomNodes = [italicEl, italicEl1]
    italicEl1.onclick = evt => {
      evt.stopPropagation()
      arg.event.remove()
    }
    return {
      domNodes: arrayOfDomNodes
    }
  }

  function addFestival() {
    const festival = [{
        date: '1-1',
        title: '元旦节',
        holidays: 1
      },
      {
        date: '12-30',
        title: '春节',
        holidays: 7,
        isLunar: true
      },
      {
        date: '5-1',
        title: '劳动节',
        holidays: 3
      },
      {
        date: '5-5',
        title: '端午节',
        holidays: 1,
        isLunar: true
      },
      {
        date: '8-15',
        title: '中秋节',
        holidays: 1,
        isLunar: true
      },
      {
        date: '10-1',
        title: '国庆节',
        holidays: 7
      }
    ]
    const datas = []
    const calendarApi = instance.refs.calendar.getApi()
    const year = new Date(calendarApi.currentData.currentDate).getFullYear()
    festival.forEach(val => {
      const strs = val.date.split('-')
      const month = parseInt(strs[0])
      const day = parseInt(strs[1])
      const func = (year, month, startDay, title, holidays = 1) => {
        const startTime = new Date(`${year}-${month}-${startDay}`)
        for (let i = 0; i < holidays; i++) {
          const time = new Date(startTime).getTime() + i * 1000 * 60 * 60 * 24
          datas.push({
            date: formatDate(new Date(time), 'yyyy-MM-dd'),
            title
          })
        }
      }
      if (val.isLunar) {
        // 农历节假日
        let item = calenderFormate.lunar2solar(year, month, day)
        if (item < 0 && val.title === '春节') {
          // 考虑到除夕可能是在农历十二月二十九
          item = calenderFormate.lunar2solar(year, month, day - 1)
        }
        func(item.cYear, item.cMonth, item.cDay, val.title, val.holidays)
      } else {
        func(year, month, day, val.title, val.holidays)
      }
    })
    // 清明属于二十四节气
    const qingming = calenderFormate.getTerm(year, 7)
    datas.push({
      date: `${year}-4-${qingming}`,
      title: '清明节'
    })
    datas.forEach(val => {
      calendarApi.addEvent({
        id: getGuid(),
        title: val.title,
        start: new Date(val.date),
        end: new Date(val.date),
        allDay: true,
        className: 'holiday',
        color: 'red',
        editable: true
      })
    })
    ElMessage.success(`${year}节假日设置成功！`)
    // instance.refs.calendar.render()
  }

  function addWeekend() {

  }

  function getGuid() {
    const S4 = () =>
      (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (S4() + S4() + '-' + S4() + '-' + S4() + '-' + S4() + '-' + S4() + S4() + S4())
  }
  return {
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
  }
}