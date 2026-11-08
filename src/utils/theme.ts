import { createGlobalState, useColorMode } from '@vueuse/core'
import githubMarkdownDarkHref from 'github-markdown-css/github-markdown-dark.css?url'
import githubMarkdownLightHref from 'github-markdown-css/github-markdown-light.css?url'

type ThemeMode = 'light' | 'dark'

const THEME_STORAGE_KEY = 'theme'
const MARKDOWN_THEME_LINK_ID = 'github-markdown-theme'

const MARKDOWN_THEME_HREF: Record<ThemeMode, string> = {
  light: githubMarkdownLightHref,
  dark: githubMarkdownDarkHref,
}

const getMarkdownThemeLink = (): HTMLLinkElement => {
  const existing = document.getElementById(MARKDOWN_THEME_LINK_ID)

  if (existing instanceof HTMLLinkElement) {
    return existing
  }

  const link = document.createElement('link')
  link.id = MARKDOWN_THEME_LINK_ID
  link.rel = 'stylesheet'

  document.head.insertBefore(link, document.head.querySelector('link[rel="stylesheet"], style'))

  return link
}

export const useTheme = createGlobalState(() => {
  if (typeof window !== 'undefined') {
    const stored = window.localStorage.getItem(THEME_STORAGE_KEY)
    if (stored !== null && stored !== 'light' && stored !== 'dark' && stored !== 'auto') {
      window.localStorage.setItem(THEME_STORAGE_KEY, 'auto')
    }
  }

  return useColorMode({
    storageKey: THEME_STORAGE_KEY,
    modes: { light: '', dark: 'dark' },
    disableTransition: false,
    onChanged(theme, defaultHandler) {
      if (typeof document === 'undefined') return

      defaultHandler(theme)
      document.documentElement.dataset.theme = theme

      const link = getMarkdownThemeLink()
      const href = MARKDOWN_THEME_HREF[theme]
      if (link.getAttribute('href') !== href) {
        link.href = href
      }
    },
  })
})
