# Devi Chatbot 🌟

A web-based chatbot interface powered by Google Gemini API, built using Flask, JavaScript, and HTML/CSS.



##  Features

1. Real-time chat interface with Gemini AI
2. Maintains chat history per session
3. Create new chat or view past chats
4. Delete specific chat sessions
5. Responsive and dark-mode friendly UI


##  Technologies Used

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Flask (Python)
- **API**: Google Generative AI (Gemini)
- **Styling**: Flexbox-based layout
- **(Optional)**: MongoDB for storing chat history



##  Project Setup

1. Clone the repository:
git clone https://github.com/your-username/gemini-chatbot.git
cd gemini-chatbot



2. Install required packages:
pip install -r requirements.txt



3. Create a `.env` file in the root folder:
GOOGLE_API_KEY=your_google_gemini_api_key


4. Run the application:
python app.py


5. Open browser at:
http://localhost:5000



## 📁 Project Structure

gemini-chatbot/
├── app.py # Flask app entry point
├── templates/
│ └── index.html # Main HTML frontend
├── static/
│ ├── style.css # Custom CSS
│ └── script.js # JS logic (fetch, chat handling)
├── requirements.txt
├── README.md
└── .env # API key (not to be shared)

yaml
Copy
Edit

---

## 📌 Notes

- Make sure to replace `"your_google_gemini_api_key"` with your real key from [ai.google.dev](https://ai.google.dev/)
- Avoid sharing your `.env` file publicly
- Tested on Python 3.10+ and Chrome

