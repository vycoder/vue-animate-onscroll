var ScrollAnimate = function(el) {

  var oldClasses = el.className;

  function isInScrollView(rect){
    return rect.top < document.documentElement.clientHeight && rect.bottom > 0;
  }

  function isDirectionAgnostic(params) {
    return typeof params === 'string';
  }

  function shouldResetAnimation(isUpwards, modifiers, params) {
    return modifiers.repeat &&
      (isUpwards && params.down || !isUpwards && params.up);
  }

  return {
    dispatch: function(isUpwards, binding) {
      var params = binding.value;
      var modifiers = binding.modifiers;

      if(!isInScrollView(el.getBoundingClientRect())) {
        if (modifiers.repeat && isDirectionAgnostic(params)) {
          el.className = oldClasses;
        }
        return;
      }

      if (isDirectionAgnostic(params)) {
        el.className = params;
        return;
      }

      if (params.down && params.up) { // implicit repeat
        el.className = isUpwards ? params.up : params.down;
        return;
      }
      
      if(shouldResetAnimation(isUpwards, modifiers, params)) {
        el.className = oldClasses;
        return;
      }
      el.className = params.up || params.down;
    }
  }
}

export default {
  install(Vue) {
    var scrollAnimate;
    Vue.directive('animate-onscroll', {
      bind(el, binding) {
        scrollAnimate = ScrollAnimate(el);
      },
      inserted(el, binding) {
        window.addEventListener('scroll', function() {
          var isUpwards = this.oldScroll > this.scrollY;
          scrollAnimate.dispatch(isUpwards, binding);
          this.oldScroll = this.scrollY;
        });
      }
    });
  }
}