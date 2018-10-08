const { ScrollAnimate } = require('../lib/vue-animate-onscroll.cjs')
const createFixture = require('./utils')

describe('ScrollAnimate', function() {
  let scrollAnimate = null
  
  beforeEach(() => scrollAnimate = ScrollAnimate() )

  describe('General tests', () => {
    test('should not remove existing classes', () => {
      const previousClassName = 'default'
      const animationClass = 'flip'
      const fixture = createFixture(
        scrollAnimate, { previousClassName, animationClass }
      )

      expect(fixture.getClassName()).toBe(previousClassName)
      fixture.scrollDown(true)
      expect(fixture.getClassName()).not.toBeNull()
      expect(fixture.getClassNames()).toContain(previousClassName)
    })
  })

  describe('Non-directional', () => {
    const animationClass = 'flip'

    test('should add animation classes', () => {
      const fixture = createFixture(scrollAnimate, { animationClass })

      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass)
    })

    test('should toggle animation when repeat is on', () => {
      const fixture = createFixture(
        scrollAnimate, { animationClass, repeat: true }
      )

      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toEqual(animationClass)
    })
    
    test('should not toggle animation when repeat is off', () => {
      const fixture = createFixture(
        scrollAnimate, { animationClass, repeat: false }
      )

      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.scrollUp(false)
      fixture.scrollDown(true)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toEqual(animationClass)
    })

  })

  describe('Downwards animation', () => {
    const animationClass = {down: 'rotate'}

    test('should apply animation on scroll once', () => {
      const fixture = createFixture(scrollAnimate, { animationClass })
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass.down)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toEqual(animationClass.down)
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toEqual(animationClass.down)
      fixture.scrollUp(false)
      expect(fixture.getClassName()).toEqual(animationClass.down)
    })

    test('should toggle animation when repeat is on', () => {
      const fixture = createFixture(
        scrollAnimate, { animationClass, repeat: true }
      )
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass.down)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toEqual(animationClass.down)
      fixture.scrollUp(true)
      fixture.scrollUp(false)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass.down)
    })
  })

  describe('Upwards animation', () => {
    const animationClass = { up: 'jackInTheBox' }

    test('should apply animation on scroll once', () => {
      const fixture = createFixture(scrollAnimate, { animationClass })
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toEqual(animationClass.up)
      fixture.scrollUp(false)
      expect(fixture.getClassName()).toEqual(animationClass.up)
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toEqual(animationClass.up)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toEqual(animationClass.up)
    })

    test('should toggle animation when repeat is on', () => {
      const fixture = createFixture(
        scrollAnimate, { animationClass, repeat: true }
      )
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toBe(animationClass.up)
      fixture.scrollUp(false)
      expect(fixture.getClassName()).toBe(animationClass.up)
      fixture.scrollDown(true)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toBe(animationClass.up)
      fixture.scrollUp(false)
      fixture.scrollDown(true)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBeFalsy()
    })
  })

  describe('Bi-directional animation', () => {
    const animationClass = {up: 'zoomIn', down: 'zoomOut'}

    test('should toggle appropriate direction', () => {
      const fixture = createFixture(scrollAnimate, { animationClass })

      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toBe(animationClass.down)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBe(animationClass.down)
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toBe(animationClass.up)
      fixture.scrollUp(false)
      expect(fixture.getClassName()).toBe(animationClass.up)
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toBe(animationClass.down)
      fixture.scrollDown(false)
      expect(fixture.getClassName()).toBe(animationClass.down)
    })

    test('should toggle appropriate animation regardless of repeat', () => {
      const fixture = createFixture(
        scrollAnimate, { animationClass, repeat: true }
      )

      expect(fixture.getClassName()).toBeFalsy()
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toBe(animationClass.down)
      fixture.scrollDown(false)
      fixture.scrollUp(true)
      expect(fixture.getClassName()).toBe(animationClass.up)
      fixture.scrollUp(false)
      fixture.scrollDown(true)
      expect(fixture.getClassName()).toBe(animationClass.down)
    })
  })
  
})