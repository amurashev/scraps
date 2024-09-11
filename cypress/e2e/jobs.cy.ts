describe('Jobs page', () => {
  it('Contains page elements', () => {
    cy.visit('/apps/jobs')
    cy.get('[data-test="jobs_filter_query"]')
    cy.get('[data-test="jobs_filter_autocomplete"]')
    cy.get('[data-test="jobs_filter_search"]')

    cy.get('[data-test="jobs_filter_level_button"]')
    cy.get('[data-test="jobs_filter_remote_button"]')
    cy.get('[data-test="jobs_filter_jobType_button"]')
    cy.get('[data-test="jobs_filter_reset"]')

    cy.get('[data-test="jobs_list"]')
  })

  it('Should click to job and see job details page', () => {
    cy.visit('/apps/jobs')
    cy.wait(2000)
    cy.get('[data-test="jobs_list_item"]').then((jobs) => {
      jobs[0].click()
      cy.get('[data-test="jobs_jobView_title"]')
      cy.get('[data-test="jobs_jobView_description"]')
      cy.get('[data-test="jobs_jobView_apply"]')
      cy.get('[data-test="jobs_jobView_ignore"]')

      cy.get('body').focus().trigger('keydown', { key: 'Escape' })

      cy.get('[data-test="jobs_jobView_title"]').should('not.exist')
      cy.get('[data-test="jobs_jobView_description"]').should('not.exist')
    })

    cy.get('[data-test="jobs_list_item"]').then((jobs) => {
      jobs[1].click()
      cy.get('[data-test="jobs_jobView_title"]')
      cy.get('[data-test="jobs_jobView_description"]')
    })
  })

  it('Should be possible to apply job', () => {
    cy.visit('/apps/jobs')
    cy.wait(2000)

    cy.get('[data-test="jobs_list_item"]').then((jobs) => {
      jobs[0].click()

      const id = jobs[0].getAttribute('data-test-id')

      cy.get('[data-test="jobs_jobView_apply"]')
        .click()
        .then(() => {
          cy.get('[data-test="jobs_applyDialog"]')
          cy.get('[data-test="jobs_applyDialog_coverLetter"]')
          cy.get('[data-test="jobs_applyDialog_submit"]')
            .click()
            .then(() => {
              cy.get('[data-test="jobs_applyDialog"]').should('not.exist')
              cy.get('[data-test="toast"]')
              cy.get('[data-test="toast_title"]').contains(
                'You have applied to'
              )

              cy.get(`[data-test-id="${id}"]`).should('not.exist')
            })
        })
    })
  })
})
