// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('my-cache').then(function(cache) {
      return cache.addAll(['./index.html', './ws.js'])
    })
  )
})

// 拦截所有请求事件,这个拦截请求是拦截请求文件的请求，例如index.html, ws.js
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener('fetch', e => {
  // debugger
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) { // 有缓存， 返回缓存
        return response
      }
      console.log('fetch source')
    })
  )
})