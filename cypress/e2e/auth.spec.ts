import DevicesListPage from '../pages/devices-list.page'

const devicesListPage = new DevicesListPage()
describe('Authorization', () => {
  it('requires authorizations', () => {
    cy.visit('/')
      cy.get('#username')
      cy.get('#password')
  })

  it('logs in with test user', () => {
    cy.loginAsTestUser()
    devicesListPage.load()
  })

  it('User cant access any org', () => {
    cy.loginAsTestUser()
    cy.visit('/')
    cy.get('[data-testid="MonitorIcon"]')
    cy.url().then((previousUsersOrgUrl) => {
      cy.loginAsTestUser('user2') // login as a new user
      devicesListPage.load()
      cy.visit(previousUsersOrgUrl)
      cy.contains('404')
    })
  })

  it('log out affordance exists for users', () => {
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.get('[href="/logout"]')
  })

  it('logs out', () => {
    //Can't test Auth0 Pages https://docs.cypress.io/guides/testing-strategies/auth0-authentication#What-you-ll-learn
    cy.loginAsTestUser()
    devicesListPage.load()
    cy.get('[href="/logout"]').click()
      cy.get('input#username')
      cy.get('input#password')
  })
})
