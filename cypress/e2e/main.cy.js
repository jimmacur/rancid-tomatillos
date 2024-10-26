// Mock data to use for testing:
// import posters from '../fixtures/movie_posters.json' // (we've added mock data to this file for you!)
// import details from '../fixtures/movie_details.json' // (you will need to add your own mock data to this file!)

describe('Main Page', () => {
  beforeEach('catches GETs', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies', {
      statusCode: 200,
      fixture: 'movie_posters'
    })

    cy.intercept('GET', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/155', {
      statusCode: 200,
      fixture: 'batman_call'
    })

    cy.intercept('GET', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/496243', {
      statusCode: 200,
      fixture: 'parasite_call'
    })
    
    cy.visit('http://localhost:3000/')
  })
  
  it('checks page display', () => {
    // hint: you'll want to add an intercept here if you are making a network request on page load!
    cy.wait(5000)
    cy.get('h1').contains('Rancid Tomatillos')
    .get('.random-scroller-container').should('exist')
    .get('.random-scroller-container').children().should('have.length', 2)
    .get('.MoviesContainer').should('exist').children().should('have.length', 2)
    .get('.MoviesContainer > :nth-child(1) > .movie-poster').should('have.attr', 'alt', 'Poster for The Dark Knight')
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box > .upvote-span > .upvote-arrow').should('exist')
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box').should('contain', 32544)
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box > .downvote-span > .downvote-arrow').should('exist')
    .get('.MoviesContainer > :nth-child(2) > .movie-poster').should('have.attr', 'alt', 'Poster for Parasite')
    .get('.MoviesContainer > :nth-child(2) > .vote-count-box > .upvote-span > .upvote-arrow').should('exist')
    .get('.MoviesContainer > :nth-child(2) > .vote-count-box').should('contain', 18018)
    .get('.MoviesContainer > :nth-child(2) > .vote-count-box > .downvote-span > .downvote-arrow').should('exist')
  })

  it('should increment and decrement the vote count', () => {
    cy.intercept('PATCH', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/155', {
      statusCode: 201,
      body: {
        vote_direction: 'up' 
      }
    })
    cy.intercept('PATCH', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies/155', {
      statusCode: 201,
      body: {
        vote_direction: 'down' 
      }
    })
    cy.get('.MoviesContainer > :nth-child(1) > .vote-count-box').contains(32544)
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box > .upvote-span > .upvote-arrow').click()
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box').contains(32545)
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box > .downvote-span > .downvote-arrow').click()
    .get('.MoviesContainer > :nth-child(1) > .vote-count-box').contains(32544)
  })
  
  it('checks that movie click goes to movie details', () => {
    cy.get('.MoviesContainer > :nth-child(1)').click()
    .get('h1').contains('Rancid Tomatillos')
    .get('header > .home-button > .home-button-img').should('exist')
    .get('.MovieDetails > .backdrop').should('exist').should('have.attr', 'alt', 'The Dark Knight backdrop')
    .get('.MovieDetails > .movie-info > .details > .movie-title').should('contain', 'The Dark Knight')
    .get('.MovieDetails > .movie-info > .details > .release-date').should('contain', '2008-07-16')
    .get('.MovieDetails > .movie-info > .details > .genre-container').children().should('have.length', 4)
    .get('.MovieDetails > .movie-info > .details > .overview').should('contain', 'Batman raises the stakes')
  })

  it('returns to the homepage when user clicks the home button', () => {
    cy.get('.MoviesContainer > :nth-child(1)').click()
    .get('header > .home-button > .home-button-img').click()
    .get('.random-scroller-container').should('be.visible')
  })

  it('tells the user when the server is not operational', () => {
    cy.intercept('GET', 'https://rancid-tomatillos-api-cc6f59111a05.herokuapp.com/api/v1/movies', {
      statusCode: 404,
    })
    cy.get('h1').should('contain', 'Rancid Tomatillos')
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Oops! Something is wrong at the server! Please try accessing Rancid Tomatillos later!')
    })
    cy.wait(1000).get('.random-scroller-container-error > .error-message-title').should('contain', 'NO MOVIES RECIEVED!')
  })
})