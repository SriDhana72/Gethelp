/* CONFIGURATION */
const urlConfig = {
    'Guided Conversations': 'https://gc.zohopublic.in/org/60047034906/flows/3189000001962375/embed',
};

/* DOM ELEMENTS */
const mainBtn = document.getElementById('crmMainBtn');
const optionsMenu = document.getElementById('crmOptions');
const modal = document.getElementById('crmModal');
const modalTitle = document.getElementById('crmModalTitle');

let isMenuOpen = false;

/* --- CHAT INTERFACE TEMPLATE --- */
const chatInterfaceTemplate = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; margin: 0; padding: 0; display: flex; flex-direction: column; height: 100vh; background: #f4f7f6; }
        #chat-container { flex: 1; overflow-y: auto; padding: 15px; display: flex; flex-direction: column; gap: 12px; scroll-behavior: smooth; }
        #chat-container::-webkit-scrollbar { width: 6px; }
        #chat-container::-webkit-scrollbar-track { background: #f1f1f1; }
        #chat-container::-webkit-scrollbar-thumb { background: #ccc; border-radius: 3px; }
        .msg { max-width: 80%; padding: 10px 14px; border-radius: 12px; font-size: 14px; line-height: 1.4; word-wrap: break-word; animation: fadeIn 0.3s ease; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }
        .bot { align-self: flex-start; background: #fff; color: #333; border-bottom-left-radius: 2px; box-shadow: 0 1px 2px rgba(0,0,0,0.1); }
        .user { align-self: flex-end; background: #009688; color: white; border-bottom-right-radius: 2px; box-shadow: 0 2px 4px rgba(0, 150, 136, 0.3); }
        .error { align-self: center; font-size: 12px; color: #d32f2f; margin-top: 5px; }
        .typing { font-style: italic; color: #888; font-size: 12px; margin-left: 15px; display:none; }
        #input-area { background: #fff; padding: 12px; border-top: 1px solid #eee; display: flex; gap: 10px; }
        input { flex: 1; padding: 10px 15px; border: 1px solid #ddd; border-radius: 20px; outline: none; font-size: 14px; }
        input:focus { border-color: #009688; }
        button { background: #009688; color: white; border: none; width: 42px; height: 42px; border-radius: 50%; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: 0.2s; }
        button:hover { background: #00796b; }
        button:disabled { background: #ccc; }
    </style>
</head>
<body>
    <div id="chat-container">
        <div class="msg bot">Hello! I am Arivu, your AI Assistant. How can I help you?</div>
    </div>
    <div class="typing" id="typing-indicator">Arivu is typing...</div>
    <div id="input-area">
        <input type="text" id="user-input" placeholder="Type a message..." autocomplete="off">
        <button id="send-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
        </button>
    </div>
    <script>
        const container = document.getElementById('chat-container');
        const input = document.getElementById('user-input');
        const btn = document.getElementById('send-btn');
        const typingIndicator = document.getElementById('typing-indicator');

        const API_URL = "https://agents.zoho.in/ziaagents/api/v1/agents/query";
        const ACCESS_TOKEN = "ACCESS_TOKEN_HERE"; 

        let sessionId = localStorage.getItem('zia_session_id') || 'sess_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('zia_session_id', sessionId);

        function scrollToBottom() { container.scrollTop = container.scrollHeight; }

        function addMessage(text, sender) {
            const div = document.createElement('div');
            div.className = 'msg ' + sender;
            div.innerHTML = text;
            container.appendChild(div);
            scrollToBottom();
        }

        async function sendMessage() {
            const text = input.value.trim();
            if (!text) return;
            addMessage(text, 'user');
            input.value = ''; input.disabled = true; btn.disabled = true;
            typingIndicator.style.display = 'block';

            try {
                // --- MOCK REPLY (Delete this when you have the real token) ---
                await new Promise(r => setTimeout(r, 1000));
                addMessage("I am Arivu. I received: " + text, 'bot');
                
                /* UNCOMMENT FOR REAL API
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: { 
                        'Content-Type': 'application/json',
                        'X-ZIAAGENTS-ORG': '60047455826',
                        'X-ZIAAGENTS-AGENT-ID': '3149000000462567',
                        'X-ZIAAGENTS-AGENT-SESSION-ID': sessionId,
                        'Authorization': 'Zoho-oauthtoken ' + ACCESS_TOKEN
                    },
                    body: JSON.stringify({ 'query': text, 'systemArgs': '' }) 
                });
                if (!response.ok) throw new Error("API Error");
                const data = await response.json();
                const botReply = data.response || data.message || JSON.stringify(data);
                addMessage(botReply, 'bot');
                */
            } catch (error) {
                addMessage("Error connecting to agent.", 'error');
                console.error(error);
            } finally {
                input.disabled = false; btn.disabled = false; typingIndicator.style.display = 'none'; input.focus();
            }
        }

        btn.addEventListener('click', sendMessage);
        input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
    <\/script>
</body>
</html>
`;

/* FUNCTIONS */

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

function resetIframe() {
    const oldIframe = document.getElementById('crmIframe');
    if (oldIframe) oldIframe.remove();
    const newIframe = document.createElement('iframe');
    newIframe.className = 'crm-iframe';
    newIframe.id = 'crmIframe';
    modal.appendChild(newIframe);
    return newIframe;
}

function openOption(type) {
    optionsMenu.classList.remove('show');
    mainBtn.classList.add('active');
    isMenuOpen = true;
    modalTitle.innerText = type;
    modal.style.display = 'flex';
    
    if (type === 'Talk to Arivu') {
        const iframe = resetIframe();
        const doc = iframe.contentWindow.document;
        doc.open();
        doc.write(chatInterfaceTemplate);
        doc.close();
    } else {
        // This will catch 'Guided Conversations'
        const iframe = resetIframe();
        iframe.src = urlConfig[type];
    }
}

function closeCrmWindow() {
    modal.style.display = 'none';
    const iframe = document.getElementById('crmIframe');
    if (iframe) iframe.src = ''; 
    mainBtn.classList.remove('active');
    optionsMenu.classList.remove('show');
    isMenuOpen = false;
}