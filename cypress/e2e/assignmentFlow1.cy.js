describe('Dynamic Table Data Verification, Flow 1', () => {
  it('Verifies Data Matching Between JSON and Table', () => {
    cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");

    cy.fixture('test.json').then((json) => {
      cy.contains("Table Data").click();
      cy.get("#jsondata").clear().type(JSON.stringify(json), { parseSpecialCharSequences: false });
      cy.contains("Refresh Table").click();

      cy.contains("#dynamictable td", json[0].name).should('exist');

      cy.get('#dynamictable tr').each(($row, index) => {
        if (index > 0) { 
          cy.wrap($row).within(() => {
            cy.get('td:nth-child(1)').invoke('text').as('name');
            cy.get('td:nth-child(2)').invoke('text').as('age');
            cy.get('td:nth-child(3)').invoke('text').as('gender');
          });

          cy.get('@name').then((name) => {
            const jsonName = json[index - 1].name; 
            expect(name).to.eq(jsonName);
          });

          cy.get('@age').then((age) => {
            const jsonAge = json[index - 1].age; 
            expect(parseInt(age)).to.eq(jsonAge);
          });

          cy.get('@gender').then((gender) => {
            const jsonGender = json[index - 1].gender; 
            expect(gender).to.eq(jsonGender);
          });
        }
      });      
    });
  });
});

