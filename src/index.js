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
        const currentClassName = el.className
        window.addEventListener('scroll', function() {
          const isUpwards = this.oldScroll > this.scrollY
          scrollAnimate.run(el, binding, {isUpwards, currentClassName})
          this.oldScroll = this.scrollY
        })
      }
    })
  }
}