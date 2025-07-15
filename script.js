document.addEventListener('DOMContentLoaded', () => {

    const gridContainer = document.getElementById('legacy-grid');
    const modal = document.getElementById('issue-modal');
    const modalCloseButton = document.querySelector('.modal-close-button');
    
    // --- 1. Populate the Grid ---
    issuesData.forEach((issue, index) => {
        // Create the card element
        const card = document.createElement('div');
        card.className = 'issue-card';
        card.style.backgroundImage = `url('${issue.backgroundImage}')`;
        
        // Set a data attribute to link the card to its data
        card.dataset.index = index;

        // Create the card's inner content
        card.innerHTML = `
            <div class="card-content">
                <h2 class="card-year">${issue.year}</h2>
                <div class="card-info">
                    <p><strong>Keynote by:</strong> ${issue.keynote}</p>
                    <p>Attendees: <span class="attendees">${issue.attendees}</span></p>
                    ${issue.internationalReach ? `<p><strong>International Reach:</strong> ${issue.internationalReach}</p>` : ''}
                </div>
            </div>
        `;
        
        // Add the card to the grid
        gridContainer.appendChild(card);
    });

    // --- 2. Handle Clicking a Card ---
    gridContainer.addEventListener('click', (event) => {
        const card = event.target.closest('.issue-card');
        if (card) {
            const issueIndex = card.dataset.index;
            const issueData = issuesData[issueIndex];
            populateAndShowModal(issueData);
        }
    });

    // --- 3. Function to Populate and Show Modal ---
    function populateAndShowModal(data) {
        document.getElementById('modal-issue-number').textContent = data.issueNumber;
        document.getElementById('modal-year').textContent = data.year;
        document.getElementById('modal-place').textContent = data.place;
        document.getElementById('modal-keynote').textContent = data.keynote;
        
        // Populate lists
        const intervieweesList = document.getElementById('modal-interviewees');
        intervieweesList.innerHTML = ''; // Clear previous entries
        data.interviewees.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            intervieweesList.appendChild(li);
        });

        const editorsList = document.getElementById('modal-editors');
        editorsList.innerHTML = ''; // Clear previous entries
        data.editorsInChief.forEach(name => {
            const li = document.createElement('li');
            li.textContent = name;
            editorsList.appendChild(li);
        });

        modal.style.display = 'flex';
    }

    // --- 4. Handle Closing the Modal ---
    function closeModal() {
        modal.style.display = 'none';
    }

    modalCloseButton.addEventListener('click', closeModal);
    
    // Also close if the user clicks on the overlay background
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });
});