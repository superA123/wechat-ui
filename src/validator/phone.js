/**
 * Created by Ray on 2017/4/27.
 */
export const phone = (value, component) => {
  var reg = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/
  return new RegExp(reg).test(value)
}
