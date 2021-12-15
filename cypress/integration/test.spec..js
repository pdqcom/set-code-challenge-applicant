/// <reference types="cypress" />

//This is a series of tests for our TODOmvc app
//You will need to fix each test

// RESOURECES:
// https://docs.cypress.io/api/table-of-contents

describe('functional requirements', () => {
  /**
   * visit the relative path of our application via the baseUrl, also resets the Database before each test.
   */
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3000/reset', {
      todos: []
    })
    cy.visit('http://localhost:3000')
  })

  /**
   * Create duplicate items
   * Validate that the items are seperate entities
   */
  it('allows duplicate list items', () => {

    // Create duplicate items using custom command from commands.js
    cy.createTodo('duplicate');
    cy.createTodo('duplicate');

    // Validate that the items are seperate entities
    cy.get(':nth-child(1) > .view').should('be.visible');
    cy.get(':nth-child(2) > .view').should('be.visible');

  })

  /**
   * Complete a todo
   * Validate the completed UI element
   */
  it('completes a todo', () => {

    // Create a todo
    cy.createTodo('complete me')

    // Mark the todo completed
    cy.get(':nth-child(1) > .view > .toggle').check();

    // Validate todo is marked as completed
    cy.get(':nth-child(1) > .view > .toggle').should('be.checked');

  })

  /**
   * When I attempt to add a todo
   * And the todo is an empty string
   * Then the application will throw an error
   *
   * Verify the application throws an error
   * Validate the contents of the the error
   *
   * https://docs.cypress.io/api/events/catalog-of-events#App-Events
   */
  it('does not allow adding blank todos', () => {

    //prepare to catch the exception
    cy.on('uncaught:exception', (err, runnable) => {
      expect(err.message).to.include('Cannot add a blank todo');

      //return false so that test doesn't fail (error is expected)
      return false
    })

    //create a blank todo, throwing the exception we expected earlier.
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
   * make the request: with a post method or through the GUI
   * intercept the request
   * Validate that items are added with the correct properties.
   *
   * https://docs.cypress.io/api/commands/intercept
   */
  describe('/post requests', () => {
    it('posts new item to the server', () => {

      cy.request('POST', 'http://localhost:3000/todos', {
        completed: false,
        id: "4538631948",
        title: "post-test"
      }).then((response) => {
        expect(response.body).to.have.property('title', 'post-test') // true
        expect(response.body).to.have.property('id', '4538631948') //true
        expect(response.body).to.have.property('completed', false) //true
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
   * Send a request to /reset
   * Validates that it reset the state of the app
   */
  context('reset data using /reset', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3000/reset', {
        todos: []
      })
      cy.visit('http://localhost:3000')
      cy.get('li.todo').should('not.have.length', 1)
    })

  })

  describe('/get requests', () => {
    /**
     * When I reset the database
     * And reload the application
     * Then there should be no todo entries.
     *
     * make a get reuqest to /todos
     * intercept the request
     * Validate that the default state is to return zero items
     */
    it('/get returns no todos', () => {
      cy.intercept('GET', 'http://localhost:3000/todos', []).as('todos')
      cy.visit('http://localhost:3000')
      cy.wait('@todos') // wait for `GET /todos` response
        // inspect the server's response
        .its('response.body')
        .should('not.have.length', 1)

      // then check the DOM
      cy.get('li.todo').should('not.have.length', 1)
    })
  })
})
