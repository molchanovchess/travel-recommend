travelData = {
    "countries": [
        {
            "id": 1,
            "name": "Australia",
            "cities": [
                {
                    "name": "Sydney, Australia",
                    "imageUrl": "images/sydney.jpeg",
                    "description": "A vibrant city known for its iconic landmarks like the Sydney Opera House and Sydney Harbour Bridge."
                },
                {
                    "name": "Melbourne, Australia",
                    "imageUrl": "images/melburne.jpeg",
                    "description": "A cultural hub famous for its art, food, and diverse neighborhoods."
                }
            ]
        },
        {
            "id": 2,
            "name": "Japan",
            "cities": [
                {
                    "name": "Tokyo, Japan",
                    "imageUrl": "images/tokyo.jpeg",
                    "description": "A bustling metropolis blending tradition and modernity, famous for its cherry blossoms and rich culture."
                },
                {
                    "name": "Kyoto, Japan",
                    "imageUrl": "images/kyoto.jpg",
                    "description": "Known for its historic temples, gardens, and traditional tea houses."
                }
            ]
        },
        {
            "id": 3,
            "name": "Brazil",
            "cities": [
                {
                    "name": "Rio de Janeiro, Brazil",
                    "imageUrl": "images/rio.jpeg",
                    "description": "A lively city known for its stunning beaches, vibrant carnival celebrations, and iconic landmarks."
                },
                {
                    "name": "São Paulo, Brazil",
                    "imageUrl": "images/san.jpeg",
                    "description": "The financial hub with diverse culture, arts, and a vibrant nightlife."
                }
            ]
        }
    ],
    "temples": [
        {
            "id": 1,
            "name": "Angkor Wat, Cambodia",
            "imageUrl": "images/angkor.jpeg",
            "description": "A UNESCO World Heritage site and the largest religious monument in the world."
        },
        {
            "id": 2,
            "name": "Taj Mahal, India",
            "imageUrl": "images/taj.jpeg",
            "description": "An iconic symbol of love and a masterpiece of Mughal architecture."
        }
    ],
    "beaches": [
        {
            "id": 1,
            "name": "Bora Bora, French Polynesia",
            "imageUrl": "images/bora.jpg",
            "description": "An island known for its stunning turquoise waters and luxurious overwater bungalows."
        },
        {
            "id": 2,
            "name": "Copacabana Beach, Brazil",
            "imageUrl": "images/copa.jpg",
            "description": "A famous beach in Rio de Janeiro, Brazil, with a vibrant atmosphere and scenic views."
        }
    ]
};

 // Function to display recommendations
 function displayRecommendations(recommendations) {
    const recommendationsDiv = document.getElementById('recommendations');
    recommendationsDiv.innerHTML = ''; // Clear previous results

    recommendations.forEach(item => {
        const recommendation = document.createElement('div');
        recommendation.classList.add('recommendation');

        recommendation.innerHTML = `
            <h3>${item.name}</h3>
            <img src="${item.imageUrl}" alt="${item.name}">
            <p>${item.description}</p>
        `;

        recommendationsDiv.appendChild(recommendation);
    });
}

// Function to execute search based on keywords
function executeSearch() {
    document.getElementById('recommendations').style.display = 'flex';
    const query = document.getElementById('search').value.toLowerCase().trim();
    let filteredResults = [];

    // Check for keywords in the query
    if (query.includes("beach")) {
        filteredResults = travelData.beaches;
    } else if (query.includes("temple")) {
        filteredResults = travelData.temples;
    } else if (query.includes("country")) {
        // Flatten cities from all countries for search
        const allCities = travelData.countries.flatMap(country => country.cities);
        filteredResults = allCities.filter(city => city.name.toLowerCase().includes(query));
    } else {
        // If it's not a specific keyword, check all cities for matches
        const allCities = travelData.countries.flatMap(country => country.cities);
        filteredResults = allCities.filter(city => city.name.toLowerCase().includes(query));
    }

    // Display the results if any, else show a message
    if (filteredResults.length > 0) {
        displayRecommendations(filteredResults);
    } else {
        document.getElementById('recommendations').innerHTML = '<p>No results found.</p>';
    }
}

// Function to reset the search field and clear results
function resetSearch() {
    document.getElementById('search').value = '';
    document.getElementById('recommendations').innerHTML = ''; // Clear displayed recommendations
    document.getElementById('recommendations').style.display = 'none'; // Clear displayed recommendations
}

// Bind event listeners for search execution and reset
document.getElementById('search-button').addEventListener('click', executeSearch);
document.getElementById('reset-button').addEventListener('click', resetSearch);