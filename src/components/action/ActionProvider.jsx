class ActionProvider {
    constructor(createChatBotMessage, setStateFunc) {
      this.createChatBotMessage = createChatBotMessage;
      this.setState = setStateFunc;
    }
  
    async handleFileUpload(file) {
      console.log("Uploading file:", file);
  
      const formData = new FormData();
      formData.append("file", file);
  
      try {
        const response = await fetch("https://your-backend-api/upload", {
          method: "POST",
          body: formData,
        });
  
        if (response.ok) {
          const result = await response.json();
          this.addMessageToBotState(`File uploaded successfully! Response: ${result.message}`);
        } else {
          const errorResult = await response.text();
          this.addMessageToBotState(`Failed to upload file: ${errorResult}`);
        }
      } catch (error) {
        console.error("File upload error:", error);
        this.addMessageToBotState("An error occurred during file upload. Please try again.");
      }
    }
  
    addMessageToBotState(message) {
      const botMessage = this.createChatBotMessage(message);
      this.setState((prevState) => ({
        ...prevState,
        messages: [...prevState.messages, botMessage],
      }));
    }
  }
  
  export default ActionProvider;
  