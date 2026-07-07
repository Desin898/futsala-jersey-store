// search.js
const products = [
    // clubs
    { name: "Real Madrid 24/25 Home Jersey", url: "real-madrid.html", category: "CLUBS", count:1 },
    { name: "Barcelona 24/25 Home Jersey", url: "barcelona.html", category: "CLUBS", count:1},
    { name: "Manchester United 24/25 Home Jersey", url: "manchester-united.html", category: "CLUBS", count:1},
    { name: "Liverpool 24/25 Home Jersey", url: "Liverpool.html", category: "CLUBS", count:1},
    { name: "FC Bayern 24/25 Home Jersey", url: "fc-bayern.html", category: "CLUBS", count:1},
    { name: "PSG 24/25 Home Jersey", url: "psg.html", category: "CLUBS", count:1},
    { name: "Chelsea 24/25 Home Jersey", url: "chelsea.html", category: "CLUBS", count:1},
    { name: "Juventus 24/25 Home Jersey", url: "juventus.html", category: "CLUBS", count:1},
    { name: "Inter Miami 24/25 Home Jersey", url: "inter-miami.html", category: "CLUBS", count:1},
    
    // National Teams
    { name: "Argentina 2025 Anniversary Jersey", url: "argentina.html", category: "NATIONAL TEAMS", count:1 },
    { name: "France 2025 Home Jersey", url: "france.html", category: "NATIONAL TEAMS", count:1 },
    { name: "Protugal 2025 Home jersey ", url: "portugal.html", category: "NATIONAL TEAMS", count:1 },
    { name: "Germany 2025 Home jersey ", url: "germany.html", category: "NATIONAL TEAMS", count:1 },
    { name: "Brazil 2025 Home jersey ", url: "brazil.html", category: "NATIONAL TEAMS", count:1 },
    { name: "Spain 2025 Home jersey ", url: "spain.html", category: "NATIONAL TEAMS", count:1 },
    { name: "England 2025 Home jersey ", url: "England.html", category: "NATIONAL TEAMS", count:1 },
    { name: "Italy 2025 Home jersey ", url: "Italy.html", category: "NATIONAL TEAMS", count:1 },

    // Kids
    { name: "Real Madrid Kids Jersey", url: "real-madrid-kids.html", category: "KIDS", count: 1 },
    { name: "Mancheter United Kids Home Jersey", url: "man-united kids.html", category: "KIDS", count: 1 },
    { name: "Mancheter United Kids Away Jersey", url: "man-united-kids-away.html", category: "KIDS", count: 1 },
    { name: "Mancheter United Kids third Jersey", url: "man-united-third.html", category: "KIDS", count: 1 },
    { name: "Arsenal Kids third Jersey", url: "arsenal-kids.html", category: "KIDS", count: 1 },
    { name: "Arsenal Kids Home Jersey", url: "arsenal-kids-home.html", category: "KIDS", count: 1 },
    { name: "Germany Kids Anniversary Jersey", url: "germany-kids.html", category: "KIDS", count: 1 },
    { name: "Inter-Miami Kids Home Jersey", url: "miami-kids-home.html", category: "KIDS", count: 1 },
    { name: "Inter-Miami Kids Away Jersey", url: "miami-kids-away.html", category: "KIDS", count: 1 },
    { name: "FC Bayern Kids Pre-Match Jersey", url: "bayern-kids.html", category: "KIDS", count: 1 },
    { name: "Juventus Kids Pre-Match Jersey", url: "juventus-kids.html", category: "KIDS", count: 1 },
    { name: "Arsenal Kids Away Jersey", url: "arsenal-kids-away.html", category: "KIDS", count: 1 },
    
    // Women
    { name: "Scotland Women's Away Jersey", url: "scotland-women.html", category: "WOMEN", count:1 },
    { name: "Germany Women's Away Jersey", url: "germany-women.html", category: "WOMEN", count:1 },
    { name: "Italy Women's Away Jersey", url: "italy-women.html", category: "WOMEN", count:1 },
    { name: "Sweden Women's Away Jersey", url: "sweden-women.html", category: "WOMEN", count:1 },
    { name: "Belgium Women's Jersey", url: "belgium-women.html", category: "WOMEN", count:1 },
    { name: "Arsenal Women's Away Jersey", url: "arsenal-women.html", category: "WOMEN", count:1 },
    { name: "Arsenal Women's third Jersey", url: "arsenal-women-thirds.html", category: "WOMEN", count:1 },
    { name: "Jamaica Women's Home Jersey", url: "jamilca-women.html", category: "WOMEN", count:1 },
    { name: "Inter-Miami Women's Home Jersey", url: "inter-miami-women.html", category: "WOMEN", count:1 },
    { name: "Inter-Miami Women's Away Jersey", url: "inter-miami-women-away.html", category: "WOMEN", count:1 },
    { name: "Manchester United Women's Away  Jersey", url: "man-united-women.html", category: "WOMEN", count:1 },
    { name: "Real Madrid 24/25 Third Jersey (Women's)", url: "real-madrid-women.html", category: "WOMEN", count: 1 },




];

function initializeSearch() {
    const searchInput = document.getElementById('search-input');
    const searchSuggestions = document.getElementById('search-suggestions');

    if (!searchInput || !searchSuggestions) return;

    searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        if (searchTerm.length === 0) {
            searchSuggestions.classList.remove('active');
            return;
        }
        
        const filteredProducts = products.filter(product => 
            product.name.toLowerCase().includes(searchTerm)
        );
        
        if (filteredProducts.length > 0) {
            let suggestionsHTML = `
                <div class="suggestion-category">
                    <h4>PRODUCTS</h4>
                    <div class="suggestion-items">
            `;
            
            filteredProducts.slice(0, 5).forEach(product => {
                suggestionsHTML += `
                    <div class="suggestion-item" data-url="${product.url}">
                        <span class="item-name">${product.name}</span>
                        <span class="item-count">${product.count}</span>
                    </div>
                `;
            });
            
            suggestionsHTML += `
                    </div>
                </div>
                <div class="see-all" data-search="${searchTerm}">
                    SEE ALL RESULTS FOR "${searchTerm.toUpperCase()}"
                </div>
            `;
            
            searchSuggestions.innerHTML = suggestionsHTML;
            searchSuggestions.classList.add('active');
            
            document.querySelectorAll('.suggestion-item').forEach(item => {
                item.addEventListener('click', function() {
                    window.location.href = this.getAttribute('data-url');
                });
            });
            
            document.querySelector('.see-all')?.addEventListener('click', function() {
                window.location.href = `search.html?q=${encodeURIComponent(searchTerm)}`;
            });
        } else {
            searchSuggestions.classList.remove('active');
        }
    });

    document.addEventListener('click', function(event) {
        const isClickInsideSearch = searchInput.contains(event.target) || 
                                  searchSuggestions.contains(event.target);
        
        if (!isClickInsideSearch && searchSuggestions.classList.contains('active')) {
            searchSuggestions.classList.remove('active');
        }
    });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeSearch); 