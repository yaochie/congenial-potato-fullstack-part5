describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // create user
    const user = {
      username: 'user1',
      password: 'user1password',
      name: 'User 1'
    }
    cy.request('POST', 'http://localhost:3001/api/users', user)

    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input#username').type('user1')
      cy.get('input#password').type('user1password')
      cy.get('button#login-button').click()

      cy.contains('User 1 logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('input#username').type('user1')
      cy.get('input#password').type('password')
      cy.get('button#login-button').click()

      cy.get('.error')
        .should('contain', 'invalid credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe.only('When logged in', function() {
    beforeEach(function() {
      cy.get('input#username').type('user1')
      cy.get('input#password').type('user1password')
      cy.get('button#login-button').click()
    })

    it('A blog can be created', function() {
      cy.contains('new blog').click()

      cy.get('input#title').type('My First Blog')
      cy.get('input#author').type('The Author')
      cy.get('input#url').type('mysite.com')
      cy.contains('create').click()

      cy.contains('Added new blog: My First Blog by The Author')
      cy.contains('My First Blog - The Author')

      cy.contains('show details').click()
      cy.contains('likes 0')
      cy.contains('mysite.com')
    })

    it('A blog can be created and liked', function() {
      cy.contains('new blog').click()

      cy.get('input#title').type('My First Blog')
      cy.get('input#author').type('The Author')
      cy.get('input#url').type('mysite.com')
      cy.contains('create').click()

      cy.contains('show details').click()
      cy.contains('like').click()
      cy.contains('likes 1')
    })
  })
})
