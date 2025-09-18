import ProductCard from '../../src/components/ProductCard'

const product = {
  id: 199,
  name: 'Product One',
  price: 199.99,
  image:
    'https://images.unsplash.com/photo-1757492166964-518d2c8b9f41?w=700&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwyfHx8ZW58MHx8fHx8',
}

const name = 'Product New Name'

describe('<ProductCard />', () => {
  beforeEach(() => {
    cy.mount(<ProductCard product={product} />)
  })

  it('should render and display expected content', () => {
    cy.get('img').should('have.attr', 'src', product.image)
    cy.get('h2').contains(product.name)
    cy.get('.product-price').contains(product.price)
  })

  describe('Dialog Interaction', () => {
    beforeEach(() => {
      cy.get('.product-edit').click()
    })

    it('should open and display the dialog', () => {
      cy.get('[role="dialog"]').should('be.visible')

      cy.get('[role="dialog"]').contains('Update Product')
    })

    it('should close the dialog via x icon', () => {
      cy.get('[role="dialog"]')
        .find('button[data-slot="dialog-close"]')
        .last()
        .click()

      cy.get('[role="dialog"]').should('not.exist')
    })

    it('should close the dialog via cancel button', () => {
      cy.get('[role="dialog"]').find('#cancel-update-dialog').click()

      cy.get('[role="dialog"]').should('not.exist')
    })
  })

  describe('Update fields', () => {
    beforeEach(() => {
      cy.get('.product-edit').click()
    })

    it('should show product info into form fields', () => {
      cy.get('input[name="name"]').should('have.value', product.name)
      cy.get('input[name="price"]').should('have.value', product.price)
      cy.get('input[name="image"]').should('have.value', product.image)
    })

    it('should update product successfully', () => {
      cy.intercept('PUT', `/api/products/${product.id}`, {
        statusCode: 200,
        body: { success: true, data: { ...product, name: name } },
      }).as('requestUpdateProduct')

      cy.get('input[name="name"]').clear().type(name)
      cy.get('button[type="submit"]').click()

      cy.wait('@requestUpdateProduct').then(() => {
        cy.get('[role="dialog"]').should('not.exist')

        cy.get('h2').contains(name)
      })
    })
  })
})
