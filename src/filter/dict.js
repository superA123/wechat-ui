// import store from '../store/index.js'

export default function (value, type) {
  let filtDict = JSON.parse(window.sessionStorage.getItem('dict')).filter(item => (item.type === type && item.value === value))
  return filtDict[0] ? filtDict[0].label : value
}
