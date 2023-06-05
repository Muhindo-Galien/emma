import moment from 'moment'
import { createGlobalState } from 'react-hooks-global-state'

const { setGlobalState, useGlobalState, getGlobalState } = createGlobalState({
  connectedAccount: '',
  contract: null,
  products: [],
  electronics:[],
  clothing:[],
  toys:[],
  product: null,
  hasBought:false,
  myorders:[],
  alert: { show: false, msg: '', color: '' },
  loading: { show: false, msg: '' },
})
const truncate = (text, startChars, endChars, maxLength) => {
  if (text.length > maxLength) {
    let start = text.substring(0, startChars)
    let end = text.substring(text.length - endChars, text.length)
    while (start.length + end.length < maxLength) {
      start = start + '.'
    }
    return start + end
  }
  return text
}

const daysRemaining = (days) => {
  const todaysdate = moment()
  days = Number((days + '000').slice(0))
  days = moment(days).format('YYYY-MM-DD')
  days = moment(days)
  days = days.diff(todaysdate, 'days')
  return days === 1 ? '1 day' : days + ' days'
}

const setAlert = (msg, color = 'green') => {
  setGlobalState('loading', false);
  setGlobalState('alert', { show: true, msg, color });
  setTimeout(() => {
    setGlobalState('alert', { show: false, msg: '', color });
  }, 3000);
};

const setLoadingMsg = (msg) => {
  const loading = getGlobalState('loading');
  setGlobalState('loading', { show: true, msg });
};

export {
  setLoadingMsg,
  setAlert,
  useGlobalState,
  setGlobalState,
  getGlobalState,
  truncate,
  daysRemaining,
}