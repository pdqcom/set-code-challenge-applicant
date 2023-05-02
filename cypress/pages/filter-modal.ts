class FilterModal {
  fillTextFilter(
    filterGroupId: string,
    category: string,
    field: string,
    operator: string,
    input: string
  ) {
    let filterGroup = cy.get(`[data-testid=filter-${filterGroupId}`)

    filterGroup
      .get('[data-testid=filter-category-selector]')
      .click()
      .get('ul > li')
      .contains(category)
      .click()

    filterGroup
      .get('[data-testid=filter-field-selector]')
      .click()
      .get('ul > li')
      .contains(field)
      .click()

    filterGroup
      .get('[data-testid=filter-operator-selector]')
      .click()
      .get('ul > li')
      .contains(operator)
      .click()

    filterGroup.get('[data-testid=filter-input-text]').type(input)
  }
  saveGroup(name: string) {
    cy.contains('Save as group').click()
    cy.get('[data-testid=create-group-name]').type(name)
    cy.get('[data-testid=save-group-button]').click()
  }

  applyFilter() {
    cy.get('[data-testid=apply-button]').click()
  }
}

export default FilterModal
