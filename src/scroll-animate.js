export default () => {

  const getClientHeight = () => document.documentElement.clientHeight

  const isInScrollView = ({top, bottom}) => top < getClientHeight() && bottom > 0
  
  const isDirectionAgnostic = (params) => typeof params === 'string'

  const isBiDirectional = (params) => params.down && params.up

  const hasBeenApplied = (current = '', prev = '') => current.trim() !== prev.trim()

  const shouldResetAnimation = ({params, isUpwards, repeat}) => repeat &&
                                    (isUpwards && params.down || !isUpwards && params.up)

  const applyAnimationClass = (el, current, newClass = '') => el.className = `${current} ${newClass}`

  return {
    isInView: isInScrollView,
    run(el, {value: params, modifiers}, {isUpwards, previousClassName = ''}) {

      if(!this.isInView(el.getBoundingClientRect())) {
        if (modifiers.repeat && isDirectionAgnostic(params)) {
          return applyAnimationClass(el, previousClassName)
        }
        return
      }

      if (isDirectionAgnostic(params)) {
        return applyAnimationClass(el, previousClassName, params)
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



