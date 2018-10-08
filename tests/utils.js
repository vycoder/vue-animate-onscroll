const createFixture = (instance, {  previousClassName = '',
                                    animationClass,
                                    repeat = false }) => {

  const run = function(isInView, isUpwards = false) {
    instance.isInView = () => isInView
    instance.run(this.el, this.binding, {isUpwards, previousClassName})
  }

  return {
    el: {
      className: previousClassName,
      getBoundingClientRect(){}
    },
    binding: {
      value: animationClass,
      modifiers: {repeat}
    },
    getClassName: function() { return this.el.className.trim() },
    getClassNames: function() { return this.getClassName().split(' ') },
    scrollDown: function(isInView) {
      run.call(this, isInView)
    },
    scrollUp: function(isInView) {
      run.call(this, isInView, true)
    }
  }
}

module.exports = createFixture