/**
 * Created by Ray on 2017/4/27.
 */
export const email = (value, component) => {
  var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/
  return new RegExp(reg).test(value)
}
