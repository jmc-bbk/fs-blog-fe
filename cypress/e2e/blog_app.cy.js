describe('Blog App', function() {
  const testUser = {
    username: 'Franklin',
    password: 'Crickets',
    name: 'Benjamin'
  }

  const testBlog = {
    title: 'My Latest Masterpiece!',
    author: 'Philip Redwood',
    url: 'deus-ex.io'
  }

  const testUserOther = {
    username: 'Carrie',
    password: 'Elephants',
    name: 'Carrie'
  }

  const testBlogOther = {
    title: 'A Different Masterpiece!',
    author: 'Frederick Rowland',
    url: 'a-myth.io',
    likes: 9999
  }

  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/tests/reset`)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUser)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, testUserOther)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('#input-username').type(testUser.username)
      cy.get('#input-password').type(testUser.password)
      cy.get('#button-submit').click()
      cy.contains(`Welcome ${testUser.name}!`)
    })

    it('fails with wrong credentials', function() {
      cy.get('#input-username').type(testUser.username)
      cy.get('#input-password').type('incorrect creds')
      cy.get('#button-submit').click()
      
      cy
        .get('.notification')
        .contains('Invalid username or password, punk.')
      
      cy.should('not.contain', `Welcome ${testUser.name}!`)
    })
  })

  describe('Create a new blog', function() {
    beforeEach(function() {
      cy.login(testUser)
    })

    it('should contain a new blog button', function() {
      cy.contains('new blog')
    })

    it('should allow creation of a new blog', function() {
      cy.contains('new blog').click()
      cy.get('#blog-form-input-title').type(testBlog.title)
      cy.get('#blog-form-input-author').type(testBlog.author)
      cy.get('#blog-form-input-url').type(testBlog.url)
      cy.get('#blog-form-button-submit').click()

      cy
        .get('.notification')
        .contains(`Blog ${testBlog.title} by ${testBlog.author} has been added!`)

      cy.get('#blog-defaults').contains(`${testBlog.title} by ${testBlog.author}`)
    })
  })

  describe('Interact with own blog', function() {
    beforeEach(function() {
      cy.login(testUser)
      cy.createBlog(testBlog)
    })

    it('should contain a default blog', function() {
      cy.contains(`${testBlog.title} by ${testBlog.author}`)
    })

    it('should be able to like a blog', function() {
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('Likes: 1')
    })

    it('should be possible for owner to delete blog', function() {
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.on('window:confirm', (str) => {
        expect(str).to.eq(`Are you sure you want to delete ${testBlog.title}?`)
        return true
      })
    })
  })

  describe('Interact with multiple blogs', function() {
    beforeEach(function() {
      // First create a blog from another user
      cy.login(testUserOther)
      cy.createBlog(testBlogOther)
      // Login to the test uer and create a blog
      cy.login(testUser)
      cy.createBlog(testBlog)
    })

    it.only('should not be able to delete other user blog', function() {
      cy
        .contains(`${testBlogOther.title} by ${testBlogOther.author}`)
        .parent() // div
        .parent()
        .as('otherBlog') // div-blog
        .contains('view')
        .click()

      cy
        .get('@otherBlog')
        .should('not.contain', 'delete')
    })

    it.only('should be ordered by number of likes', function() {
      // Blogs are pre-ordered by likes defined in POST requests
      
      // 999 likes
      cy
        .get('.blog-container')
        .eq(0)
        .should('contain', `${testBlogOther.title} by ${testBlogOther.author}`)

      // 0 likes
      cy
        .get('.blog-container')
        .eq(1)
        .should('contain', `${testBlog.title} by ${testBlog.author}`)
    })
  })

})
