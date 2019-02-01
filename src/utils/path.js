import path from 'path'

export function resolvePath(basePath, routePath) {
  // console.log(' ')
  // console.log('basePath: ' + basePath)
  // console.log('routePath: ' + routePath)
  // console.log(path.resolve(basePath, routePath))
  return path.resolve(basePath, routePath)
}