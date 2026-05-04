/* eslint-disable no-undef */

describe('Login Sayfası Testleri', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/');
  });

  it('Başarılı form doldurulduğunda submit edebiliyorum ve success sayfasını açabiliyorum', () => {
    cy.get('#email').type('erdem.guntay@wit.com.tr');
    cy.get('#password').type('Erdem12345'); 
    cy.get('#terms').check();
    
    cy.get('button').should('not.be.disabled').click();
    
    cy.url().should('include', '/success');
    cy.contains('Giriş Başarılı!').should('be.visible');
  });

  it('Hatalı durumlarda beklenen hata mesajları görünüyor ve buton disabled kalıyor', () => {
    cy.get('#email').type('yanlis-email');
    cy.get('button').should('be.disabled');
    cy.contains('Lütfen geçerli bir e-posta adresi giriniz.').should('be.visible');

    cy.get('#password').type('123');
    cy.get('button').should('be.disabled');
    cy.get('.invalid-feedback').should('have.length', 2);
    cy.contains('Şifreniz en az 8 karakter olmalı').should('be.visible');

    cy.get('#email').clear().type('erdem.guntay@wit.com.tr');
    cy.get('#password').clear().type('Erdem12345');
    cy.get('button').should('be.disabled');
  });
});