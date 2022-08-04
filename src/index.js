import ScrollAnimate from './scroll-animate'

export default {
  ScrollAnimate,
  install(Vue) {
    Vue.directive('animate-onscroll', {
      inserted(el, binding) {
        const scrollAnimate = ScrollAnimate(Date.now())
        const previousClassName = el.className
        const offset = parseInt(el.dataset.animateOnscrollOffset || 0);
        let lastScrollTop = window.pageYOffset
        scrollAnimate.run(el, binding, {isUpwards: false, previousClassName})
        window.addEventListener('scroll', function() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const isUpwards = scrollTop < lastScrollTop
          scrollAnimate.run(el, binding, {offset, isUpwards, previousClassName})
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        }, false)
      }
    })
  }
}
