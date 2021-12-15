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
Cypress.Commands.add('createTodo', (todo) => {
    //clear the entry box and add an item to the todolist
    cy.get('.new-todo').clear();
    cy.get('.new-todo').type(todo + '{enter}');
    cy.log('created a new todo')
})
