// call this to Disable
let pos = 0
let disabled = false

export function disableScroll() {
  pos = document.documentElement.scrollTop
  disabled = true

  if (window.innerHeight < document.body.clientHeight) {
    document.body.style.top = `${-document.documentElement.scrollTop}px`
    document.body.style.width = '100%'
    document.body.style.position = 'fixed'
    document.body.style.overflowY = 'scroll'
  }

}

// call this to Enable
export function enableScroll() {
  if (disabled) {
    document.body.style.position = ''
    document.body.style.overflowY = ''
    window.scrollTo(0, pos);
  }

  pos = 0
  disabled = false
}
