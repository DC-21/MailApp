import React, { useEffect, useState, useRef } from "react";

const SpeechComponent: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [isSupported, setIsSupported] = useState(true);
  const [step, setStep] = useState("initial");
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const speechSynthesis = window.speechSynthesis;

  useEffect(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      setIsSupported(false);
      return;
    }

    const SpeechRecognition =
      (window as any).webkitSpeechRecognition || window.SpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let interimTranscript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript.trim().toLowerCase();
        if (event.results[i].isFinal) {
          setTranscript((prevTranscript) => prevTranscript + transcript);
          handleUserResponse(transcript);
        } else {
          interimTranscript += transcript;
        }
      }
      console.log("Interim transcript:", interimTranscript);
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error", event);
    };

    recognitionRef.current = recognition;

    // Start the conversation when the component mounts
    speak(
      "Hello, how can I assist you? You can say 'send a new email' or 'view emails'."
    );
    startListening();
  }, []);

  const startListening = () => {
    if (recognitionRef.current && !isListening) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const stopListening = () => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const speak = (text: string) => {
    if (speechSynthesis.speaking) {
      console.error("Speech synthesis is already speaking.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onend = () => {
      console.log("Speech synthesis finished.");
    };
    utterance.onerror = (event) => {
      console.error("Speech synthesis error", event);
    };
    speechSynthesis.speak(utterance);
  };

  const handleUserResponse = (response: string) => {
    switch (step) {
      case "initial":
        if (response.includes("send a new email")) {
          setStep("sendEmail");
          speak(
            "You chose to send a new email. Please provide the recipient's email address."
          );
        } else if (response.includes("view emails")) {
          setStep("viewEmails");
          speak("You chose to view emails. Here are your recent emails.");
          // Logic to fetch and read out emails goes here
        } else {
          speak(
            "I didn't catch that. Please say 'send a new email' or 'view emails'."
          );
        }
        break;
      case "sendEmail":
        // Handle the email sending flow here
        speak(
          `You said the recipient's email address is ${response}. Please provide the subject of the email.`
        );
        // Update step as necessary to handle further inputs
        break;
      case "viewEmails":
        // Handle the email viewing flow here
        break;
      default:
        break;
    }
  };

  if (!isSupported) {
    return (
      <div>
        <h1>Speech Component</h1>
        <p>
          Your browser does not support the Web Speech API. Please use Google
          Chrome for full functionality.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Speech Component</h1>
      <button onClick={startListening} disabled={isListening}>
        Start Listening
      </button>
      <button onClick={stopListening} disabled={!isListening}>
        Stop Listening
      </button>
      <p>Transcript: {transcript}</p>
    </div>
  );
};

export default SpeechComponent;
