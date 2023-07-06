describe('Home', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('successfully loads', () => {
    cy.title().should('eq', 'TekBlogg')
  })

  it('can navigate to article', () => {
    cy.get('[data-cy="article-link"]').first().click()
    cy.url().should('include', '/post')
  })

  it('can navigate to about page', () => {
    cy.get('[data-cy="about"]').click()
    cy.url().should('include', '/about')
  })
})
