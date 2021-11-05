/// <reference types="cypress" />

//This is a series of tests for our TODOmvc app
//You will need to fix each test

// RESOURECES:
// https://docs.cypress.io/api/table-of-contents

describe('functional requirements', () => {
  /**
   * TODO: visit the relative path of our application via the baseUrl
   */
  beforeEach(() => {
    cy.visit('')
  })

  /**
   * TODO: Create duplicate items
   * TODO: Validate that the items are seperate entities
   */
  it('allows duplicate list items', () => {
 
    cy.get('input.new-todo').type('test api{enter}')
    cy.get('input.new-todo').type('test api{enter}')
    cy.wait(1000)
    cy.get('.todo-list li').should('have.length', 2)
 
    cy.get('.todo-list li:first').should('contain', 'test api')
    cy.get('.todo-list li:last').should('contain', 'test api')

    cy.get('.todo-list li:first').should('not.have.class', 'completed')
    cy.get('.todo-list li:last').should('not.have.class', 'completed')

  })

  /**
   * TODO: Complete a todo
   * TODO: Validate the completed UI element
   */
  it('completes a todo', () => {

    cy.get('.todo-list li:first').should('not.have.class', 'completed')

    cy.get('.todo-list li:first .toggle').click()

    cy.get('.todo-list li:first').should('have.class', 'completed')

  })

  /**
   * When I attempt to add a todo
   * And the todo is an empty string
   * Then the application will throw an error
   *
   * TODO: Verify the application throws an error
   * TODO: Validate the contents of the the error
   *
   * https://docs.cypress.io/api/events/catalog-of-events#App-Events
   */
  it('does not allow adding blank todos', () => {
    cy.get('.new-todo').type('{enter}')
    cy.on('uncaught:exception', e => {
      return !e.message.includes('Cannot add a blank todo')
    })
    cy.get('input.new-todo').type(' {enter}')
    cy.get('li.todo').should('have.length', 2)
    cy.get('li.todo label').should('not.have.text', ' ')
      
  })
})

/**
 * Cypress allows to stub, mock and intercept network requests.
 * Using those methods, fulfill the criterious below.
 */
context('network requests', () => {
  /**
   * When I send a /post request to the server
   * And I hit the right endpoint
   * And I have the correct format
   * Then it should add a todo
   *
   * TODO: make the request: with a post method or through the GUI
   * TODO: intercept the request
   * TODO: Validate that items are added with the correct properties.
   *
   * https://docs.cypress.io/api/commands/intercept
   */
  describe('/post requests', () => {
    beforeEach(() => {
      cy.intercept('/todos', []).as('todos')
      cy.visit('/')
      cy.wait('@todos')
    })
    
    it('enter todos', () => {
      cy.intercept('POST', '/todos').as('post')
      cy.get('.new-todo').type('test api{enter}')
      cy.wait('@post')
        .its('request.body')
        .should('deep.include', {
          title: 'test api',
          completed: false
        })
    })
  })

  /**
   * TODO's persist in the database, we'll need to check that we can reset the state of the app
   *
   * When I send a post request to the server
   * And I hit the right endpoint
   * And I have the correct format
   * Then it should reset the todos in the database
   *
   * TODO: Send a request to /reset
   * TODO: Validates that it reset the state of the app
   */
  context('reset data using /reset', () => {
    
    beforeEach(() => {
      cy.request('PATCH', '/reset', {
        todos: []
      })
      cy.visit('/reset')
    })
  })

  describe('/get requests', () => {
    /**
     * When I reset the database
     * And reload the application
     * Then there should be no todo entries.
     *
     * TODO: make a get reuqest to /todos
     * TODO: intercept the request
     * TODO: Validate that the default state is to return zero items
     */
  
      
    it('/get returns no todos', () => {
      cy.intercept('GET', '/todos', []).as('todos')
      cy.visit('/')
      cy.wait('@todos') // wait for `GET /todos` response
        // inspect the server's response
        .its('response.body')
        .should('have.length', 0)
      // then check the DOM
      cy.get('li.todo').should('have.length', 0)
    })
  })
})
