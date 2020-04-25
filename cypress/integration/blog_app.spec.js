describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')

    // create users
    const user = {
      username: 'user1',
      password: 'user1password',
      name: 'User 1'
    }
    const user2 = {
      username: 'user2',
      password: 'pwd2',
      name: 'User 2'
    }
    cy.createUser(user)
    cy.createUser(user2)

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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'user1', password: 'user1password' })
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

    describe('and a blog is created', function() {
      beforeEach(function() {
        cy.createBlog({
          title: 'My First Blog',
          author: 'The Author',
          url: 'mysite.com'
        })
      })

      it('A blog can be created and liked', function() {
        cy.contains('show details').click()
        cy.contains('like').click()
        cy.contains('likes 1')
      })

      it('A blog can be deleted by the creating user', function() {
        cy.contains('remove').click()
        cy.get('div.blog').should('not.exist')
      })

      it('A blog cannot be deleted by a different user', function() {
        cy.contains('Logout').click()

        cy.get('input#username').type('user2')
        cy.get('input#password').type('pwd2')
        cy.get('button#login-button').click()

        cy.contains('remove').should('not.exist')
      })
    })

    describe('blogs are sorted by likes', function() {
      beforeEach(() => {
        cy.createBlog({
          title: 'My First Blog',
          author: 'The Author',
          url: 'mysite.com'
        })
        cy.createBlog({
          title: 'My Second Blog',
          author: 'The Author',
          url: 'mysite.com'
        })
        cy.createBlog({
          title: 'My Third Blog',
          author: 'The Author',
          url: 'mysite.com'
        })
      })

      it('sorted', function() {
        cy.get('div.blog')
          .contains('My First Blog').parent()
          .contains('show details').click()

        cy.get('div.blog')
          .contains('My First Blog').parent()
          .get('button.like-button').click()

        cy.get('div.blog')
          .contains('My Third Blog').parent()
          .contains('show details').click()

        cy.get('div.blog')
          .contains('My Third Blog').parent()
          .find('button.like-button').as('likeButton')

        cy.get('@likeButton').click()
        cy.get('@likeButton').click()
        cy.get('@likeButton').click()

        // check that the blogs are in the order we expect
        cy.get('div.blog').then(blogs => {
          expect(blogs[0]).to.contain('My Third Blog')
          expect(blogs[1]).to.contain('My First Blog')
          expect(blogs[2]).to.contain('My Second Blog')
        })
      })
    })
  })
})
