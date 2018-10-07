const createFixture = (instance, {  currentClassName = '',
                                    animationClass,
                                    isUpwards,
                                    repeat = false }) => {
  return {
    el: {
      className: currentClassName,
      getBoundingClientRect(){}
    },
    binding: {
      value: animationClass,
      modifiers: {repeat}
    },
    state: { isUpwards, currentClassName },
    getClassName: function() { return this.el.className.trim() },
    getClassNames: function() { return this.getClassName().split(' ') },
    run: function(isInView) {
      instance.isInView = () => isInView
      instance.run(this.el, this.binding, this.state)
    }
  }
}

module.exports = createFixture