let func

export function PullToRefresh (el, callback) {
  const block = document.createElement('div');
  const pStart = { x: 0, y: 0 };
  const pCurrent = { x: 0, y: 0 };
  let isLoading = false;
  let isOver = false;
  let animate = false;

  const spinner = '<svg class="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none"> <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/> <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/></svg>'
  const arrowDown = '<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"/></svg>'

  block.style.overflow = 'hidden'
  block.style.height = '0px'
  block.style.position = 'relative'
  block.innerHTML = `<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">${isLoading ? spinner : arrowDown}</div>`

  el.parentElement.insertBefore(block, el)

  this.reset = () => {
    animate = true
    block.style.transition = `.3s`;
    block.style.height = `0px`
    block.style.transform = `scale(0)`
    block.style.opacity = `0`

    return new Promise((resolve) => {
      setTimeout(() => {
        block.style.transition = `unset`;
        animate = false;
        return resolve()
      }, 300)
    })
  }

  this.loading = async () => {
    isLoading = true;
    await callback()

    pStart.x = 0;
    pStart.y = 0;
    pCurrent.x = 0;
    pCurrent.y = 0;

    await this.reset()

    document.body.classList.remove('overflow-hidden')
    isLoading = false;
  }

  this.swipeStart = (e) => {
    const rect = el.getBoundingClientRect()

    if (e.targetTouches) {
      let touch = e.targetTouches[0];
      pStart.x = touch.pageX;
      pStart.y = touch.pageY;
    } else {
      pStart.x = e.screenX;
      pStart.y = e.screenY;
    }

    isOver = rect.y <= pStart.y &&
      rect.x <= pStart.x &&
      rect.x + rect.width >= pStart.x
  }

  this.swipeEnd = (e) => {
    isOver = false
    if (window.scrollY <= 0 && !isLoading) {
      this.reset()
      document.body.classList.remove('overflow-hidden')
    }
  }

  this.swipe = (e) => {
    if (!isOver) return
    if (isLoading || animate) return
    if (window.scrollY > 0) return

    const pos = {
      x: 0,
      y: 0
    }

    if (e.targetTouches) {
      let touch = e.targetTouches[0];
      pos.x = touch.pageX;
      pos.y = touch.pageY;
    } else {
      pos.x = e.screenX;
      pos.y = e.screenY;
    }

    if (pStart.x + pStart.y === 0) {
      pStart.x = pos.x;
      pStart.y = pos.y;
    }

    pCurrent.x = pos.x;
    pCurrent.y = pos.y;

    const max = 100;
    let changeY = pStart.y < pCurrent.y ? Math.abs(pStart.y - pCurrent.y) : 0;
    const percent = changeY < max ? (changeY / max) * 100 : 100;

    if(changeY > 0) {
      document.body.classList.add('overflow-hidden')
    }

    if (window.scrollY === 0) {
      if (percent > 90) this.loading();
      block.style.height = `${50 * (percent * 0.01)}px`
      block.style.transform = `scale(${percent * 0.01})`
      block.style.opacity = `${percent * 0.01}`
    }

    block.innerHTML = `<div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">${isLoading ? spinner : arrowDown}</div>`
  }

  this.destroy = () => {
    block.outerHTML = ''
    document.removeEventListener("touchstart", this.swipeStart, false);
    document.removeEventListener("touchmove", this.swipe, false);
    document.removeEventListener("touchend", this.swipeEnd, false);
  }

  document.addEventListener("touchstart", this.swipeStart, false);
  document.addEventListener("touchmove", this.swipe, false);
  document.addEventListener("touchend", this.swipeEnd, false);
}

export default {
  mounted: (el, { value }) => {
    func = new PullToRefresh(el, value)
  },
  beforeUnmount() {
    func.destroy()
  }
}
