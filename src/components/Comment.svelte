<section>
  <div id="giscus-container" bind:this={container}></div>
</section>

<script>
import { AUTO_MODE, DARK_MODE } from '@constants/constants.ts'
import { onMount, onDestroy } from 'svelte'
import { writable } from 'svelte/store'
import { getStoredTheme } from '@utils/setting-utils.ts'

const mode = writable(AUTO_MODE)
let container
let mql
let observer
let sysListener

function resolveThemeValue(m) {
  if (m === AUTO_MODE) {
    return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
  }
  return m === DARK_MODE ? 'dark' : 'light'
}

function loadGiscus(theme) {
  if (!container) return
  container.innerHTML = ''
  const script = document.createElement('script')
  script.src = 'https://giscus.app/client.js'
  script.async = true
  script.crossOrigin = 'anonymous'
  script.setAttribute('data-repo', 'shyakocat/shyakocat.github.io-comments')
  script.setAttribute('data-repo-id', 'R_kgDOQywAvg')
  script.setAttribute('data-category', 'Announcements')
  script.setAttribute('data-category-id', 'DIC_kwDOQywAvs4C0h6_')
  script.setAttribute('data-mapping', 'title')
  script.setAttribute('data-strict', '0')
  script.setAttribute('data-reactions-enabled', '1')
  script.setAttribute('data-emit-metadata', '0')
  script.setAttribute('data-input-position', 'top')
  script.setAttribute('data-theme', theme)
  script.setAttribute('data-lang', 'zh-CN')
  container.appendChild(script)
}

let lastTheme = null

function updateGiscusTheme() {
  const theme = document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  // If effective theme didn't change, don't touch the iframe
  if (theme === lastTheme) return

  const iframe = document.querySelector('iframe.giscus-frame')
  if (iframe?.contentWindow) {
    iframe.contentWindow.postMessage({ giscus: { setConfig: { theme } } }, 'https://giscus.app')
    lastTheme = theme
    return
  }

  // If iframe is not ready, reload giscus with the desired theme
  loadGiscus(theme)
  lastTheme = theme
}

onMount(() => {
  const stored = getStoredTheme()
  mode.set(stored)
  let currentMode = stored
  const unsub = mode.subscribe((v) => currentMode = v)

  const initialTheme = resolveThemeValue(stored)
  loadGiscus(initialTheme)
  // remember applied theme to avoid unnecessary toggles
  lastTheme = initialTheme

  // react to system changes when in AUTO_MODE
  if (window.matchMedia) {
    mql = window.matchMedia('(prefers-color-scheme: dark)')
    // Use getStoredTheme() at the time of system change so we react correctly
    // even if theme was changed elsewhere (e.g. from AUTO to LIGHT/DARK).
    sysListener = () => {
      if (getStoredTheme() === AUTO_MODE) updateGiscusTheme()
    }
    if (mql.addEventListener) mql.addEventListener('change', sysListener)
    else mql.addListener(sysListener)
  }

  observer = new MutationObserver(updateGiscusTheme)
  observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

  return () => unsub()
})

onDestroy(() => {
  if (observer) observer.disconnect()
  if (mql) {
    if (mql.removeEventListener) mql.removeEventListener('change', sysListener)
    else mql.removeListener(sysListener)
  }
})
</script>