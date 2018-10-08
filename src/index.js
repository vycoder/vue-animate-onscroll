import ScrollAnimate from './scroll-animate'

export default {
  ScrollAnimate,
  install(Vue) {
    let scrollAnimate;
    Vue.directive('animate-onscroll', {
      bind(el, binding) {
        scrollAnimate = ScrollAnimate()
      },
      inserted(el, binding) {
        const previousClassName = el.className
        window.addEventListener('scroll', function() {
          const isUpwards = this.oldScroll > this.scrollY
          scrollAnimate.run(el, binding, {isUpwards, previousClassName})
          this.oldScroll = this.scrollY
        })
      }
    })
  }
}