export default () => {

  const getClientHeight = () => document.documentElement.clientHeight

  const isInScrollView = ({top, bottom}) => top < getClientHeight() && bottom > 0
  
  const isDirectionAgnostic = (params) => typeof params === 'string'

  const shouldResetAnimation = ({params, isUpwards, repeat}) => repeat &&
                                    (isUpwards && params.down || !isUpwards && params.up)

  const applyAnimationClass = (el, current, newClass) => el.className = `${current} ${(newClass || '')}`

  return {
    run(el, {value: params, modifiers}, {isUpwards, currentClassName}) {

      if(!isInScrollView(el.getBoundingClientRect())) {
        if (modifiers.repeat && isDirectionAgnostic(params)) {
          return applyAnimationClass(el, currentClassName)
        }
        return
      }

      if (isDirectionAgnostic(params)) {
        return applyAnimationClass(el, currentClassName, params)
      }

      if (params.down && params.up) { // implicit repeat
        const animationClass = isUpwards ? params.up : params.down
        return applyAnimationClass(el, currentClassName, animationClass)
      }
      
      if(shouldResetAnimation({params, isUpwards, ...modifiers})) {
        return applyAnimationClass(el, currentClassName)
      }
      return applyAnimationClass(el, currentClassName, params.up || params.down)
    }
  }
  
}



