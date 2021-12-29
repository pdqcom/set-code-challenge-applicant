/// <reference types="cypress" />

import { getTodoItems } from "../support/utils"

//This is a series of tests for our TODOmvc app
//You will need to fix each test

// RESOURECES:
// https://docs.cypress.io/api/table-of-contents

describe('functional requirements', () => {
  /**
   * Visit the relative path of our application via the baseUrl
   */
  beforeEach(() => {
    cy.visit('/')
  })

  /**
   * Create duplicate items
   * Validate that the items are seperate entities
   */
  it('allows duplicate list items', () => {
    cy.createTodo('my first todo')
    cy.createTodo('my first todo')
    // For 2 items to have the same title and be separate entities
    // they must have different ids
    cy.request('GET', '/todos')
      .then((response) => {
        const todos = response.body
        const n = todos.length
        const a = todos[n-2]
        const b = todos[n-1]
        expect(a.title).to.equal(b.title)
        expect(a.id).to.not.equal(b.id)
      })
  })

  /**
   * Complete a todo
   * Validate the completed UI element
   */
  it('completes a todo', () => {
    getTodoItems().last().find('.toggle').click()
    getTodoItems().last().should('have.class', 'completed')
  })

  /**
   * Validate a completed todo will persist
   */
  it('saves completed todos', () => {
    getTodoItems().last().should('have.class', 'completed')
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
  it('does not allow adding blank todos', (done) => {
    Cypress.on('uncaught:exception', (e) => {
      expect(e.message).to.include('Cannot add a blank todo')
      // I verify the app throws an error by calling `done()`
      // if the app doesn't throw an error, `done()` isn't called,
      // and Cypress will timeout.
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
   * make the request: with a post method or through the GUI
   * intercept the request
   * Validate that items are added with the correct properties.
   *
   * https://docs.cypress.io/api/commands/intercept
   */
  describe('/post requests', () => {
    it('posts new item to the server', () => {
      const msg = 'test api'
      cy.intercept('POST', '/todos').as('new-item')
      cy.visit('/')
      cy.createTodo(msg)
      cy.wait('@new-item')
        .its('request.body')
        .should('have.contain', {
          title: msg,
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
   * Send a request to /reset
   * Validates that it reset the state of the app
   */
  context('reset data using /reset', () => {
    it('resets state of app', () => {
      cy.intercept('POST', '/reset').as('reset')
      cy.request('POST', '/reset', {
        todos: []
      })
      cy.visit('/reset')
      cy.wait('@reset')
        // I assume the response from a post request
        // to /reset contains the server's state.todos
        // which should be an emtpy array
        .its('response.body.todos')
        .should('have.length', 0)
    })
  })

  describe('/get requests', () => {
    /**
     * When I reset the database
     * And reload the application
     * Then there should be no todo entries.
     *
     * make a get request to /todos
     * intercept the request
     * Validate that the default state is to return zero items
     */
    it('/get returns no todos', () => {
      cy.intercept('GET', '/todos', []).as('todos')
      cy.visit('/')
      cy.wait('@todos') // wait for `GET /todos` response
        // inspect the server's response
        .its('response.body')
        .should('have.length', 0)
      // then check the DOM
      cy.get('li.todo').should('not.exist')
    })
  })
})
