/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "icons/icon_cb_144.png",
    "revision": "462015857b863d5106b026784663cbc8"
  },
  {
    "url": "icons/icon_cb_192.png",
    "revision": "34df0205d584fd7a74caf9a9bd314742"
  },
  {
    "url": "icons/icon_cb_48.png",
    "revision": "9be939526cc07bd739ebbec8bfe344a3"
  },
  {
    "url": "icons/icon_cb_512.png",
    "revision": "e15aabb2c8e143f1dd66e9f941f90582"
  },
  {
    "url": "icons/icon_cb_72.png",
    "revision": "835b9306633f65f49f799f040ae1a2c7"
  },
  {
    "url": "icons/icon_cb_96.png",
    "revision": "a92211352d26bc35e9965dde03fcf7b8"
  },
  {
    "url": "icons/icon_cb_og.jpg",
    "revision": "0c69832de56b29b1f210052300ab870e"
  },
  {
    "url": "index.html",
    "revision": "069b724aceaf2ed9fe4991dcc0688c3b"
  },
  {
    "url": "manifest.json",
    "revision": "77b0d8b0ba8e857aa8a0e2ddb41db60f"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
