import { faker } from '@faker-js/faker'

const requestBody = {
  name: faker.food.vegetable(),
  price: faker.number.float({ min: 10, max: 100, multipleOf: 0.02 }),
  image:
    'https://unsplash.com/photos/a-red-and-blue-abstract-painting-of-a-person-GTvCovF_xmo',
}

describe('Mock empty products', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('GET', '/api/products', {
      statusCode: 200,
      body: {
        data: [],
      },
    }).as('requestEmptyProducts')
  })

  it('should handle an empty array response', () => {
    cy.wait('@requestEmptyProducts')
      .its('response.statusCode')
      .should('eq', 200)

    cy.get('[data-cy="product-list"]').should('not.exist')

    cy.get('[data-cy="empty-products"]').should('be.visible')
  })
})

describe('API Mocking - products', () => {
  beforeEach(() => {
    cy.visit('/')

    cy.intercept('GET', '/api/products', {
      fixture: 'products.json',
    }).as('requestProducts')
  })

  it('should handle an array response with data', () => {
    cy.wait('@requestProducts').then((interception) => {
      if (!interception.response) return
      cy.get('[data-cy="product-list"] .product-item').should(
        'have.length',
        interception.response.body.data.length,
      )

      cy.get('[data-cy="empty-products"]').should('not.exist')
    })
  })

  it('should show each product info into DOM', () => {
    cy.wait('@requestProducts').then((interception) => {
      if (!interception.response) return

      const expectedProducts = interception.response.body.data

      cy.get('.product-item').each(($el, index) => {
        const productName = $el.find('.product-name').text().trim()
        const productPrice = $el.find('.product-price').text().trim()

        expect(productName).to.equal(expectedProducts[index].name)
        expect(productPrice).to.equal(`$${expectedProducts[index].price}`)

        expect(productPrice).to.match(/^\$\d+(\.\d{2})?$/)
      })
    })
  })

  it('should handle delete product', () => {
    cy.wait('@requestProducts').then((interception) => {
      if (!interception.response) return

      cy.intercept(
        'DELETE',
        `/api/products/${interception.response.body.data[0].id}`,
        {
          success: true,
          message: 'product has been removed',
        },
      ).as('requestDeleteProduct')

      cy.get('.product-item').first().find('.product-delete').click()

      cy.wait('@requestDeleteProduct').then(() => {
        cy.get('[data-sonner-toaster]')
          .should('be.visible')
          .and('contain.text', 'product has been removed')
      })
    })
  })

  it('should handle update product', () => {
    const { name } = requestBody

    cy.wait('@requestProducts').then((interception) => {
      if (!interception.response) return

      const product = interception.response.body.data[0]

      cy.intercept('PUT', `/api/products/${product.id}`, {
        statusCode: 200,
        body: { success: true, data: { ...product, name: name } },
      }).as('requestUpdateProduct')

      cy.get('.product-item').first().find('.product-edit').click()

      cy.get('#radix-«r0»').should('be.visible')
      cy.get('input[name="name"]').should('have.value', product.name)
      cy.get('input[name="price"]').should('have.value', product.price)
      cy.get('input[name="image"]').should('have.value', product.image)

      cy.get('input[name="name"]').clear().type(name)
      cy.get('button[type="submit"]').click()

      cy.wait('@requestUpdateProduct').then(() => {
        cy.get('[data-sonner-toaster]')
          .should('be.visible')
          .and('contain.text', 'Product updated successfully')

        cy.get('#radix-«r0»').should('not.exist')

        cy.get('.product-item')
          .first()
          .then(($element) => {
            const productName = $element.find('.product-name').text().trim()

            expect(productName).to.equal(name)
          })
      })
    })
  })
})
