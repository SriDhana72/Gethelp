/* CONFIGURATION */
const urlConfig = {
    'Live chat': '', // Leave this blank or add the Live Chat URL if provided
    // Update the 'GC' key with the new iframe link's source URL
    'GC': 'https://gc.zohopublic.in/org/60047034906/flows/3189000001962375/embed' 
};

/* DOM ELEMENTS */
const mainBtn = document.getElementById('crmMainBtn');
const optionsMenu = document.getElementById('crmOptions');
const modal = document.getElementById('crmModal');
const iframe = document.getElementById('crmIframe');
const modalTitle = document.getElementById('crmModalTitle');
let isMenuOpen = false;

/* FUNCTIONS */

/**
 * Toggles the main button and options menu visibility.
 * If the modal is open, it closes the modal instead.
 */
function toggleMenu() {
    if (modal.style.display === 'flex') {
        closeCrmWindow();
        return;
    }
    isMenuOpen = !isMenuOpen;
    if (isMenuOpen) {
        optionsMenu.classList.add('show');
        mainBtn.classList.add('active');
    } else {
        optionsMenu.classList.remove('show');
        mainBtn.classList.remove('active');
    }
}

/**
 * Opens the iframe modal with the URL corresponding to the selected option type.
 * @param {string} type - The key (e.g., 'Live chat', 'GC') to look up in urlConfig.
 */
function openOption(type) {
    // 1. Close the options menu
    optionsMenu.classList.remove('show');
    
    // 2. Set button state to active (X icon)
    mainBtn.classList.add('active'); 
    isMenuOpen = true;

    // 3. Configure and open the modal
    modalTitle.innerText = type;
    iframe.src = urlConfig[type] || 'about:blank';
    modal.style.display = 'flex';
}

/**
 * Closes the iframe modal and resets the button state.
 */
function closeCrmWindow() {
    modal.style.display = 'none';
    iframe.src = ''; // Clear the iframe source
    mainBtn.classList.remove('active');
    optionsMenu.classList.remove('show');
    isMenuOpen = false;
}