// import store from '../store/index.js'

export default function (value, root) {
  let parents = new Set(value.map(item => item.parent))
  return value.filter(item => (parents.has(item.value) || item.parent !== root))
}
