import ScrollAnimate from './scroll-animate'

export default {
  ScrollAnimate,
  install(Vue) {
    Vue.directive('animate-onscroll', {
      inserted(el, binding) {
        const scrollAnimate = ScrollAnimate(Date.now())
        const previousClassName = el.className
        let lastScrollTop = window.pageYOffset
        window.addEventListener('scroll', function() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const isUpwards = scrollTop < lastScrollTop
          scrollAnimate.run(el, binding, {isUpwards, previousClassName})
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        }, false)
      }
    })
  }
}