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
    cy.visit('/')
  })

  /**
   * TODO: Create duplicate items
   * TODO: Validate that the items are seperate entities
   */
  it('allows duplicate list items', () => {
    const todoString = 'my first todo'
    cy.createTodo(todoString)
    cy.createTodo(todoString)
    cy.get('.todo').eq(0).contains(todoString)
    cy.get('.todo').eq(1).contains(todoString)

    // could also do it this way:
    cy.get('.todo').should(($todo) => {
      expect($todo.eq(0)).to.contain(todoString)
      expect($todo.eq(1)).to.contain(todoString)
    })

  })

  /**
   * TODO: Complete a todo
   * TODO: Validate the completed UI element
   */
  it('completes a todo', () => {
    cy.get('.todo .toggle').eq(0).click()
    cy.get('.todo').eq(0).should('have.class', 'completed');
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
  it('does not allow adding blank todos', (done) => {
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Cannot add a blank todo')
      done()
      return false
    })

    cy.createTodo(' ')

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
    it('posts new item to the server', () => {
      cy.intercept('POST', '/todos').as('new-item')
      cy.visit('/')
      cy.get('.new-todo').type('test api{enter}')
      cy.wait('@new-item').its('request.body').should('have.contain', {
        title: 'test api',
        completed: false
      })
      // validating in the DOM as well
      cy.get('.todo').last().contains('test api')
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
   * TODO: Validates that it reset the state of the app (checking for this in the following describe block)
   */
  context('reset data using /reset', () => {
    beforeEach(() => {
      cy.request({
        method: 'POST',
        url: '/reset',
        body: {
          todos: []
        }
      })
    })

    describe('/get requests', () => {
      /**
       * When I reset the database
       * And reload the application
       * Then there should be no todo entries.
       *
       * TODO: make a get request to /todos
       * TODO: intercept the request
       * TODO: Validate that the default state is to return zero items
       */
      it('/get returns no todos', () => {
        cy.intercept('GET', '/todos').as('todos')
        cy.visit('/')
        cy.wait('@todos') // wait for `GET /todos` response
          // inspect the server's response
          .its('response.body')
          .should('have.length', 0)
        // then check the DOM
        cy.get('.todo').should('not.exist')
      })
    })

  })
})