/// <reference types="cypress" />
import { getTodo, getTodoItems, resetDatabase, resetDatabaseTo, stubMathRandom } from "../support/utils"
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
    let todoText = 'my first todo'
    cy.createTodo(todoText)
    cy.createTodo(todoText)
    const item1 = getTodo(0)
    item1.contains(todoText)
    const item2 = getTodo(1)
    item2.contains(todoText)
  })

  it('creates only one todo at a time', () => {
    let todoText = 'my first todo'
    cy.createTodo(todoText)
    getTodoItems().should("have.length", 1)
  })

  it('adds newest todo to the bottom of the list', () => {
    let lastItemText = 'my second todo'
    cy.createTodo('my first todo')
    cy.createTodo(lastItemText)
    const lastItem = '.todoapp .todo-list li:last'
    cy.get(lastItem).contains(lastItemText)
  })

  it('completes a todo', () => {
    cy.createTodo('my first todo')
    cy.removeTodo('my first todo')
    getTodoItems()
      .should("have.length", 0);
  })

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

  describe('/post requests', () => {
    it('posts new item to the server', () => {
      cy.visit('/')
      stubMathRandom()
      cy.intercept(
        {
          method: 'POST',
          url: '/todos',
        },
        {
          title: 'mocked todo',
          completed: false,
          id: "777"
        }
      ).as('new-item-request')
      cy.get('.new-todo').type('test api{enter}')
      cy.wait('@new-item-request').its('request.body').should('have.contain', {
        title: 'test api',
        completed: false,
        id: "1"
      })
    })
  })

  context('reset data using /reset', () => {
    beforeEach(() => {
      resetDatabaseTo("fakedatabase.json")
    })
    it("can be reset", () => {
      cy.visit('/')
      getTodoItems().should("have.length", 2)
      resetDatabase()
      cy.visit('/')
      getTodoItems().should("have.length", 0)
    })
  })

  describe('/get requests', () => {
    /**
     * When I reset the database
     * And reload the application
     * Then there should be no todo entries.
     *
     */
    beforeEach(() => {
      resetDatabaseTo("fakedatabase.json")
    })
    it('/get returns no todos after reset', () => {
      resetDatabase()
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
