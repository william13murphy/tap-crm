importScripts("/precache-manifest.77a1fa70c5997901f02691bc3dd564d9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.2.0/workbox-sw.js");

workbox.precaching.precacheAndRoute(self._precacheManifest || [])

workbox.routing.registerRoute(
    new RegExp('.*\.(css|js|html|png|svg)'),
    workbox.strategies.staleWhileRevalidate()
)

workbox.routing.registerRoute(
    new RegExp('.*/api/.*'),
    workbox.strategies.staleWhileRevalidate({
      cacheName: 'tap-api'  
    })
)
