const createFixture = (instance, {  previousClassName = '',
                                    animationClass,
                                    repeat = false,
                                    offset = 0 }) => {

  const run = function(isInView, isUpwards = false, offset = 0) {
    instance.isInView = () => isInView
    instance.run(this.el, this.binding, {offset, isUpwards, previousClassName})
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
      run.call(this, isInView, false, offset)
    },
    scrollUp: function(isInView) {
      run.call(this, isInView, true, offset)
    }
  }
}

module.exports = createFixture