import ScrollAnimate from './scroll-animate'

export default {
  ScrollAnimate,
  install(Vue) {
    Vue.directive('animate-onscroll', {
      inserted(el, binding) {
        const scrollAnimate = ScrollAnimate(Date.now())
        const params = binding.value;
        const useParent = el.parentNode.childNodes.length == 1
        const offset = parseInt(el.dataset.animateOnscrollOffset || 0);
        let previousClassName = el.className
        let lastScrollTop = window.pageYOffset
        previousClassName = previousClassName.replace((params.in || params),'').replace(params.out,'');
        window.addEventListener('scroll', function() {
          let scrollTop = window.pageYOffset || document.documentElement.scrollTop
          const isUpwards = scrollTop < lastScrollTop
          scrollAnimate.run(el, binding, {useParent, offset, isUpwards, previousClassName})
          lastScrollTop = scrollTop <= 0 ? 0 : scrollTop
        }, false)
      }
    })
  }
}