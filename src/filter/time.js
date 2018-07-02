/**
 * Created by neusoft on 2017/4/5.
 */
var moment = require('moment')

export default function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm'
  return moment(value).format(formatString)
}
