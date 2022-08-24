export default () => {

  const getClientHeight = () => document.documentElement.clientHeight

  const isInScrollView = ({top, bottom}, offset) => (top + offset) < getClientHeight() && (bottom - offset) > 0
  
  const isDirectionAgnostic = (params) => !(params.down || params.up)

  const isOutAnimationOnly = (params) => !params.in && params.out

  const isBiDirectional = (params) => params.down && params.up

  const hasBeenApplied = (current = '', prev = '') => current.trim() !== prev.trim()

  const shouldResetAnimation = ({params, isUpwards, repeat}) => repeat &&
                                    (isUpwards && params.down || !isUpwards && params.up)

  const applyAnimationClass = (el, current, newClass = '') => {
    el.className = `${current} ${newClass}`.trim()
  }

  return {
    isInView: isInScrollView,
    run(el, {value: params, modifiers}, {useParent, offset, isUpwards, previousClassName = ''}) {
      
      if(isOutAnimationOnly(params)) {
        console.warn("animate-on-scroll", "'out' parameter can't be used alone. 'in' required")
        return
      }

      let rect = null;
      if(useParent) {
        rect = el.parentNode.getBoundingClientRect();
      } else {
        rect = el.getBoundingClientRect();
      }
      if(!this.isInView(rect, offset)) {
        const animationClass = params.out || ''
        if (modifiers.repeat && (isDirectionAgnostic(params) || animationClass)) {
          return applyAnimationClass(el, previousClassName, animationClass)
        }
        return
      } 

      if (isDirectionAgnostic(params)) {
        const animationClass = params.in || params
        return applyAnimationClass(el, previousClassName, animationClass)
      }

      if (modifiers.repeat ||
          isBiDirectional(params) ||
          !hasBeenApplied(el.className, previousClassName)) {
        const animationClass = isUpwards ? params.up : params.down
        return applyAnimationClass(el, previousClassName, animationClass)
      }

      if(shouldResetAnimation({params, isUpwards, ...modifiers})) {
        return applyAnimationClass(el, previousClassName)
      }

    }
  }
  
}
