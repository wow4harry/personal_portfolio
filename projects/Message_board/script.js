document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('messageForm');
    const nameInput = document.getElementById('nameInput');
    const messageInput = document.getElementById('messageInput');
    const messagesList = document.getElementById('messagesList');
    
    // load messagee from localStorage
    let messages = JSON.parse(localStorage.getItem('messages')) || [];
    

    renderMessages();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const newMessage = {
            name: nameInput.value.trim(),
            content: messageInput.value.trim(),
            timestamp: new Date().toISOString()
        };

        if (newMessage.name && newMessage.content) {
            messages.push(newMessage);
            saveMessages();
            renderMessages();
            form.reset();
        } else {
            alert('enter name and message');
        }
    });

    function renderMessages() {
        messagesList.innerHTML = '';
        messages.forEach((message, index) => {
            const messageElement = document.createElement('div');
            messageElement.className = 'message';
            messageElement.innerHTML = `
                <div class="message-header">
                    <span>${message.name}</span>
                    <span>${new Date(message.timestamp).toLocaleString()}</span>
                    <button class="delete-btn" data-index="${index}">delete</button>
                </div>
                <div class="message-content">${message.content}</div>
            `;
            messagesList.appendChild(messageElement);
        });

        // add delete listener
        document.querySelectorAll('.delete-btn').forEach(button => {
            button.addEventListener('click', deleteMessage);
        });
    }

    function deleteMessage(e) {
        const index = e.target.dataset.index;
        messages.splice(index, 1);
        saveMessages();
        renderMessages();
    }

    function saveMessages() {
        localStorage.setItem('messages', JSON.stringify(messages));
    }
});