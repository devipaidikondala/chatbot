document.addEventListener('DOMContentLoaded', function () {
  const chatBox = document.getElementById('chat-box');
  const userInput = document.getElementById('user-input');
  const sendBtn = document.getElementById('send-btn');
  const chatForm = document.getElementById('chat-form');
  const newChatBtn = document.getElementById('new-chat-btn');
  const chatHistoryList = document.getElementById('chat-history');

  // Append message to chat
  function appendMessage(role, content) {
    const msg = document.createElement('div');
    msg.classList.add('message', role === 'user' ? 'user-message' : 'bot-message');
    msg.textContent = content;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  // Send message to backend
  async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    appendMessage('user', message);
    userInput.value = '';

    try {
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      });

      const data = await response.json();

      if (data.response) {
        appendMessage('bot', data.response);
        loadChatHistory();
      } else {
        appendMessage('bot', '⚠️ Unexpected response from server.');
      }
    } catch (err) {
      appendMessage('bot', '❌ Failed to connect to server.');
      console.error('Send error:', err);
    }
  }

  // Load chat history summary
  async function loadChatHistory() {
    try {
      const response = await fetch('/get_chat_history_summary');
      const chats = await response.json();

      chatHistoryList.innerHTML = '';
      chats.forEach(chat => {
        const item = document.createElement('div');
        item.classList.add('chat-item');
        item.textContent = `${chat.title} (${chat.message_count})`;

        item.addEventListener('click', () => loadChatSession(chat.chat_id));

        const delBtn = document.createElement('button');
        delBtn.textContent = '🗑️';
        delBtn.classList.add('delete-btn');
        delBtn.addEventListener('click', async (e) => {
          e.stopPropagation();
          await deleteChatSession(chat.chat_id);
        });

        item.appendChild(delBtn);
        chatHistoryList.appendChild(item);
      });
    } catch (err) {
      console.error('Failed to load chat history:', err);
    }
  }

  // Load specific chat session
  async function loadChatSession(chatId) {
    try {
      const response = await fetch(`/get_chat_session/${chatId}`);
      const messages = await response.json();

      chatBox.innerHTML = '';
      messages.forEach(msg => {
        appendMessage(msg.role, msg.content);
      });
    } catch (err) {
      console.error('Failed to load session:', err);
    }
  }

  // Delete chat session
  async function deleteChatSession(chatId) {
    try {
      await fetch(`/delete_chat_session/${chatId}`, { method: 'DELETE' });
      chatBox.innerHTML = '';
      loadChatHistory();
    } catch (err) {
      console.error('Failed to delete chat:', err);
    }
  }

  // Start a new chat
  async function startNewChat() {
    try {
      await fetch('/new_chat', { method: 'POST' });
      chatBox.innerHTML = '';
      loadChatHistory();
    } catch (err) {
      console.error('Failed to start new chat:', err);
    }
  }

  // Event Listeners
  chatForm.addEventListener('submit', function (e) {
    e.preventDefault();
    sendMessage();
  });

  sendBtn.addEventListener('click', sendMessage);
  newChatBtn.addEventListener('click', startNewChat);

  // Initial load
  loadChatHistory();
});
