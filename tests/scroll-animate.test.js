const { ScrollAnimate } = require('../lib/vue-animate-onscroll.cjs')
const createFixture = require('./utils')

describe('ScrollAnimate', function() {
  let scrollAnimate = null
  
  beforeEach(() => scrollAnimate = ScrollAnimate() )

  describe('General tests', () => {
    test('should not remove existing classes', () => {
      const currentClassName = 'default'
      const animationClass = 'flip'
      const fixture = createFixture(scrollAnimate, {
        currentClassName,
        animationClass,
        isUpwards: true
      })
      fixture.run(true)
      expect(fixture.getClassName()).not.toBeNull()
      expect(fixture.getClassNames()).toContain(currentClassName)
    })
  })

  describe('Non-direction specific', () => {

    const animationClass = 'flip'

    test('should add animation classes', () => {
      const fixture = createFixture(scrollAnimate, {
        animationClass,
        isUpwards: false
      })
      fixture.run(true)
      expect(fixture.getClassName()).toEqual(animationClass)
    })

    test('should toggle animation when repeat is on', () => {
      const fixture = createFixture(scrollAnimate, {
        animationClass,
        isUpwards: false,
        repeat: true
      })
      fixture.run(true)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.run(false)
      expect(fixture.getClassName()).toBeFalsy()
      fixture.run(true)
      expect(fixture.getClassName()).toEqual(animationClass)
    })
    
    test('should not toggle animation when repeat is off', () => {
      const fixture = createFixture(scrollAnimate, {
        animationClass,
        isUpwards: false,
        repeat: false
      })
      fixture.run(true)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.run(false)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.run(true)
      expect(fixture.getClassName()).toEqual(animationClass)
      fixture.run(false)
      fixture.run(true)
      fixture.run(false)
      expect(fixture.getClassName()).toEqual(animationClass)
    })

  })
  
})