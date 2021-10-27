describe('Home page', () => {
    beforeEach(() => {
        cy.visit('/');
    })

    it('should header contains recipe heading with a message that there are no recipes', () => {
        cy.findByRole('heading')
            .should('contain', 'My Recipes')
        cy.get('p')
            .findByText('There are no recipes to list.')
            .should('exist')
    });

    it('should contain an add recipe button that opens a form when clicked', () => {
        cy.findByRole('button')
            .click();

        cy.get('form')
            .findByRole('button')
            .should('exist');
    })

    it('should contain a form with fields \'Recipe Name\' and \'Recipe Instructions\' after clicking the \'Add Recipe\' button', () => {
        cy.findByRole('button')
            .click();

        expect(cy.findByRole('textbox', {name: /Recipe name/i})).toExist();

        cy.findByRole('textbox', {name: /Recipe instructions/i}).should('exist');
    })

    it("displays a recipe name under the 'My Recipes' heading after it has been added through the 'Add Recipe' form", () => {
        const recipeName = 'Tofu Scramble Tacos';
        cy.findByRole('button')
            .click();
        cy.findByRole('textbox', {name: /Recipe name/i})
            .type(recipeName);
        cy.findByRole('textbox', {name: /instructions/i})
            .type("1. heat a skillet on medium with a dollop of coconut oil {enter} 2. warm flour tortillas");

        return cy.findByRole('button').click()
            .then(() => {
                expect(cy.findByRole('listitem', /tofu scramble tacos/i)).toExist();
                expect(cy.findByRole('listitem', /1. heat a skillet/i)).toExist();
            })
    })

    it("displays multiple recipe names under the 'My Recipes' heading after recipes have been added.", () => {
        const recipeNameOne = 'Tofu Scramble Tacos';
        const recipeNameTwo = 'Burger a la mode';

        cy.findByRole('button').click();
        cy.findByRole('textbox', {name: /Recipe name/i})
            .type(recipeNameOne);
        cy.findByRole('textbox', {name: /instructions/i})
            .type("1. heat a skillet on medium with a dollop of coconut oil\n 2. warm flour tortillas");
        cy.findByRole('button').click();

        cy.findByRole('button').click();
        cy.findByRole('textbox', {name: /Recipe name/i})
            .type(recipeNameTwo);
        cy.findByRole('textbox', {name: /instructions/i})
            .type("Buns, meat, cheese, veggies, etc");
        cy.findByRole('button').click()
            .then(() => {
                expect(cy.findByText(new RegExp(recipeNameOne, 'i'))).toExist();
                expect(cy.findByText(/1. heat a skillet/i)).toExist();
                expect(cy.findByText(/burger a la mode/i)).toExist();
                expect(cy.findByText(/mode/i)).toExist();

                expect(cy.findAllByRole('listitem')
                    .should('have.lengthOf', 2)).toExist();
            })
    });
});
