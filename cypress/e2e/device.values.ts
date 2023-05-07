import DevicesListPage from '../pages/devices-list.page'

const devicesListPage = new DevicesListPage()
beforeEach(() => {
  cy.loginAsTestUser()
  cy.resetDemoData()
})

it.skip('confirms all devices have been updated', () => {
  // this tests doesn't make sense to run until a test
  // to test updating devices is created
  // Test to update all devices should go here
  devicesListPage.load()
  cy.contains('Last deployment').click()
  cy.contains('Last deployment').click()
  cy.getFirstDevice().then((values) => {
    expect(values.status).to.equal('SUCCEEDED')
  })
})
