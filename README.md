### README: React Chatbot with Python Script Integration and Google Gemini AI

---

#### **Overview**
This project is a React.js-based chatbot powered by **ReactChatbotify**, integrated with a Python backend for processing files (e.g., PDFs) and leveraging **Google Gemini AI** for advanced conversational capabilities.

---

#### **Features**
- **React Chatbot:** Built using the ReactChatbotify library for a customizable, interactive chatbot interface.
- **File Upload & Analysis:** Allows users to upload files, which are analyzed using a Python backend.
- **Google Gemini AI Integration:** Provides advanced AI-driven conversational responses.
- **REST API Integration:** Facilitates seamless communication between the chatbot and the Python backend for data processing.

---

#### **Technologies Used**
1. **Frontend:**
   - React.js
   - ReactChatbotify
2. **Backend:**
   - Python (Flask)
   - Google Gemini AI
3. **API Communication:**
   - Fetch API for RESTful interactions

---

#### **Requirements**
- **Node.js**: `>=16.0.0`
- **Python**: `>=3.8`
- **Dependencies**:
  - Frontend: `react`, `react-chatbotify`
  - Backend: `flask`, `PyPDF2`, `google-generative-ai` (Google Gemini AI SDK)

Install frontend dependencies:
```bash
npm install
```

Install backend dependencies:
```bash
pip install flask PyPDF2 google-generative-ai
```

---

#### **Setup Instructions**
1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Run the Python Backend**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Start the Flask server:
     ```bash
     python app.py
     ```
   - The server will run on `http://localhost:5000`.

3. **Run the React Frontend**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Start the development server:
     ```bash
     npm start
     ```
   - The frontend will run on `http://localhost:3000`.

---

#### **How It Works**
1. **User Interaction:**
   - Users interact with the chatbot on the React.js frontend.
   - They can upload files (e.g., PDFs) for analysis.

2. **File Upload & Backend Communication:**
   - Uploaded files are sent to the Python backend (`/analyze_pdf` endpoint).
   - The backend extracts and analyzes data, returning a response.

3. **AI-Powered Insights:**
   - Google Gemini AI processes the analyzed data and provides detailed insights.
   - The chatbot displays the insights as part of the conversation.

---

#### **Frontend Example Code**
**FileUploadWidget.jsx**
```jsx
import React from "react";

const FileUploadWidget = ({ actionProvider }) => {
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("pdf", file);

      fetch("http://localhost:5000/analyze_pdf", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          actionProvider.handleApiResponse(data);
        })
        .catch((err) => {
          console.error("Error uploading file:", err);
        });
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
    </div>
  );
};

export default FileUploadWidget;
```

---

#### **Backend Example Code**
**app.py**
```python
from flask import Flask, request, jsonify
import PyPDF2
import google.generativeai as gemini

app = Flask(__name__)

@app.route('/analyze_pdf', methods=['POST'])
def analyze_pdf():
    pdf_file = request.files.get('pdf')
    if not pdf_file:
        return jsonify({"error": "No file provided"}), 400

    pdf_reader = PyPDF2.PdfReader(pdf_file)
    text = " ".join([page.extract_text() for page in pdf_reader.pages])

    gemini_response = gemini.generate_chat_response(prompt=text)

    return jsonify({"analysis": gemini_response})
```

---

#### **Configuration**
1. **Google Gemini AI Setup:**
   - Sign up for Google Gemini AI and obtain an API key.
   - Add the API key to your backend environment variables.

   ```bash
   export GOOGLE_AI_API_KEY=<your-api-key>
   ```

2. **ReactChatbotify Setup:**
   - Configure the chatbot messages and logic in `App.jsx`:
     ```jsx
     const config = {
       initialMessages: [createChatBotMessage("Hello! How can I assist you today?")],
       widgets: [
         {
           widgetName: "fileUpload",
           widgetFunc: (props) => <FileUploadWidget {...props} />,
         },
       ],
     };
     ```

---

#### **Future Improvements**
- Add support for analyzing other file formats (Excel, Word).
- Implement real-time AI conversations via WebSocket.
- Enhance Google Gemini AI responses with custom prompts.

---

#### **Contributing**
Feel free to open issues or create pull requests for improvements or bug fixes.

---

#### **License**
This project is licensed under the MIT License. See `LICENSE` for more details.
