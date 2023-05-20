import CreatePackagePage from '../pages/create-package-page'
import DeployMenu from '../pages/deploy-menu.page'
import DeviceDetailsPage from '../pages/device-details.page'
import DevicesListPage from '../pages/devices-list.page'
import NavBar from '../pages/nav-bar.page'
import PackagesPage from '../pages/packages-page'
import DeviceInfo from '../utils/device-info'

const createPackagePage = new CreatePackagePage()
const packagesPage = new PackagesPage()
const navBar = new NavBar()
const devicesListPage = new DevicesListPage()
const deployMenu = new DeployMenu()
const deviceDetailsPage = new DeviceDetailsPage()

describe('Custom package powershell', () => {
  const customPackageName = 'test powershell package 1234'
  const customPackageDescription = 'test package made in cypress tests'
  const customPackageVersion = '12'
  const customPackageTimeout = '1'
  before(() => {
    cy.loginAsTestUser()
  })

  beforeEach(() => {
    cy.loginAsTestUser()
    cy.visit('/')
  })

  it('Can create a custom package', () => {
    navBar.openPackages()
    cy.contains('button', 'Got it').click()
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
