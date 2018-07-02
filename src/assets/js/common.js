/**
 * Created by Ray on 2017/2/24.
 */
export function go (url, $router) {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || ($router && typeof url === 'string' && !/http/.test(url))
  if (useRouter) {
    $router.push(url)
  } else {
    window.location.href = url
  }
}
