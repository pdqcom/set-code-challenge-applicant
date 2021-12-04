/// <reference types="cypress" />
import {getTodo, resetDatabase} from "../support/utils"
//This is a series of tests for our TODOmvc app
//You will need to fix each test

// RESOURECES:
// https://docs.cypress.io/api/table-of-contents

describe('functional requirements', () => {

  beforeEach(() => {
    resetDatabase()
    cy.visit('')
  })

  it('allows duplicate list items', () => {
    let todoText='my first todo'
    cy.createTodo(todoText)
    cy.createTodo(todoText)
    const lastItem = getTodo(0)
    lastItem.contains(todoText)
    const firstItem = getTodo(1)
    firstItem.contains(todoText)
  })

  it('creates only one todo at a time', () => {
    let todoText='my first todo'
    cy.createTodo(todoText)
    const list = '.todoapp .todo-list'
    cy.get(list).should("have.length",1)
  })
  
  it('adds newest todo to the bottom of the list', () => {
    cy.createTodo('my first todo')
    cy.createTodo('my second todo')
  })
  /**
   * TODO: Complete a todo
   * TODO: Validate the completed UI element
   */
  it('completes a todo', () => {})

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
      cy.visit('/')
      cy.get('.new-todo').type('test api{enter}')
      cy.wait('@new-item').its('request.body').should('have.contain', {
        title: 'api',
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
        .should('not.have.length', 1)
      // then check the DOM
      cy.get('li.todo').should('not.have.length', 1)
    })
  })
})
