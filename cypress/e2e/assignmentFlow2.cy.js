
describe('Dynamic Table Data Verification, Flow 2', () => {
    it('Verifies Data Matching Between JSON and Table', () => {
      cy.visit("https://testpages.herokuapp.com/styled/tag/dynamic-table.html");
  
      cy.fixture('test.json').then((json) => {
        cy.contains("Table Data").click();
        cy.get("#jsondata").clear().type(JSON.stringify(json), { parseSpecialCharSequences: false });
        cy.contains("Refresh Table").click();
  
        cy.contains("#dynamictable td", json[0].name).should('exist');
  
        cy.get('#dynamictable tr:gt(0)').each(($row, index) => {
          cy.wrap($row).within(() => {
            cy.get('td:nth-child(1)').invoke('text').then((name) => {
              expect(name).to.eq(json[index].name);
            });
        
            cy.get('td:nth-child(2)').invoke('text').then((age) => {
              expect(parseInt(age)).to.eq(json[index].age);
            });
        
            cy.get('td:nth-child(3)').invoke('text').then((gender) => {
              expect(gender).to.eq(json[index].gender);
            });
          });
        });      
      });
    });
  });
  