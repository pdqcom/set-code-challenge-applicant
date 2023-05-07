import DeployMenu from '../pages/deploy-menu.page'
import DevicesListPage from '../pages/devices-list.page'
import FilterModal from '../pages/filter-modal'
import DeviceInfo from '../utils/device-info'

const devicesListPage = new DevicesListPage()
const filterModal = new FilterModal()
describe('filter', () => {
  let deviceInfo: DeviceInfo

  beforeEach(() => {
    cy.loginAsTestUser()
    cy.visit('/')
    cy.resetDemoData()
    devicesListPage.load()
  })

  afterEach(() => {
    cy.visit('/')
    cy.resetDemoData()
  })

  it('Can create a filter', () => {
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Software', 'Name', 'contains', 'edge')
    filterModal.applyFilter()
  })

  it('Can save a group', () => {
    let groupName = 'has edge'
    devicesListPage.openFilterModal()
    filterModal.fillTextFilter('0', 'Software', 'Name', 'contains', 'edge')
    filterModal.saveGroup(groupName)
    devicesListPage.getGroupTab(groupName)
  })
})
