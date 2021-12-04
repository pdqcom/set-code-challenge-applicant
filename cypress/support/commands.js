/**
 * Duplicating the code to add todo's to the list is not very DRY. We should make a commnand to do that for us
 *
 * TODO: add command 'createTodo'
 * TODO: log the command in the cypress test pane
 *  WHERE:
 *  --> name === action
 *  --> message === todo
 *
 *  Because we want to keep our log clean, make sure to only log the above, not any of the cypress commands
 * https://docs.cypress.io/api/commands/log
 */
import { enterTodo, removeTodo } from "./utils"
Cypress.Commands.add('createTodo', (todoText) => {
    enterTodo(todoText, false)
    cy.log('Created Todo', todoText)
})
Cypress.Commands.add('removeTodo', (todoText) => {
    removeTodo(todoText, false)
    cy.log('Removed Todo', todoText)
})