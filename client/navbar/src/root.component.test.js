import React from 'react'
import { shallow } from 'enzyme'
import Root from './root.component'

test('App name goes to "/" path', () => {
  const wrapper = shallow(<Root />)
  wrapper.find('h2').simulate('click')

  wrapper.update()
  expect(wrapper.state().isAddRecipeFormDisplayed).toBeTruthy()

});