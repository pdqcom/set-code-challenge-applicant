import CreatePackagePage from '../pages/create-package-page'
import NavBar from '../pages/nav-bar.page'
import PackagesPage from '../pages/packages-page'

const createPackagePage = new CreatePackagePage()
const packagesPage = new PackagesPage()
const navBar = new NavBar()

describe('Custom package powershell', () => {
  const customPackageName = 'test powershell package 1234'
  const customPackageDescription = 'test package made in cypress tests'
  const customPackageVersion = '12'
  const customPackageTimeout = '1'
  beforeEach(() => {
    cy.loginAsTestUser()
    cy.visit('/')
    cy.resetDemoData()
  })

  afterEach(() => {
    cy.visit('/')
    cy.resetDemoData()
  })

  it('Can create a custom package', () => {
    navBar.openPackages()
    packagesPage.createPackageButton.click()
    createPackagePage.fillPackageInfo(
      customPackageName,
      customPackageDescription,
      customPackageVersion,
      customPackageTimeout
    )
    createPackagePage.createPackageStep(
      './cypress/resources/hello-world.ps1',
      '0'
    )
    createPackagePage.saveButton.click()
    packagesPage.searchBox.click().type(customPackageName)
    packagesPage.packagesGrid.contains(customPackageName)
  })
})
