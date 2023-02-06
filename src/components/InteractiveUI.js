import React, { useEffect, useInsertionEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { Configuration, OpenAIApi } from "openai";
import Speech from "speak-tts";
// import recordBtn from "./record-btn.png";

const configuration = new Configuration({
  apiKey: process.env.REACT_APP_OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const BetterUI = () => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
    isMicrophoneAvailable,
  } = useSpeechRecognition();

  const [savedUserInput, setSavedUserInput] = useState("");
  const [chatGptRes, setChatGptRes] = useState("");
  const [speech, setSpeech] = useState();
  const [convoStart, setConvoStart] = useState(false);

  useEffect(() => {
    const speech = new Speech();
    speech
      .init({
        volume: 1,
        lang: "en-GB",
        rate: 1,
        pitch: 1,
        voice: "Google UK English Female",
        splitSentences: true,
      })
      .then((data) => {
        // The "data" object contains the list of available voices and the voice synthesis params
        console.log("Speech is ready, voices are available", data);
        setSpeech(speech);
      })
      .catch((e) => {
        console.error("An error occured while initializing : ", e);
      });
  }, []);

  const talk = (what2say) => {
    speech
      .speak({
        text: what2say,
        queue: false, // current speech will be interrupted,
        listeners: {
          onstart: () => {
            console.log("Start utterance");
          },
          onend: () => {
            console.log("End utterance");
          },
          onresume: () => {
            console.log("Resume utterance");
          },
          onboundary: (event) => {
            console.log(
              event.name +
                " boundary reached after " +
                event.elapsedTime +
                " milliseconds."
            );
          },
        },
      })
      .then(() => {
        // if everyting went well, start listening again
        console.log("Success !");
        userStartConvo();
      })
      .catch((e) => {
        console.error("An error occurred :", e);
      });
  };

  const attemp1 = ". At the end, try your best to engage in the conversation.";
  const attemp2 =
    ". At the end, ask a follow up question when appropriate to keep the conversation going.";

  console.log("savedUserInput", savedUserInput);
  async function onSubmit() {
    try {
      try {
        // it saved the previous convo between the AI and bot

        console.log(
          "data being fed",
          savedUserInput + ". " + transcript + attemp2
        );

        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: savedUserInput + ". " + transcript + attemp2,
          temperature: 0.6,
          max_tokens: 200, // FIXME: 2048
        });
        console.log("completion.data", completion.data);
        const what2say = completion.data.choices[0].text;
        setSavedUserInput(savedUserInput + ". " + transcript + ". " + what2say); // updated the savedUserInput so that it can connect the previous convo
        setChatGptRes(what2say);
        talk(what2say);
      } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
          console.error(error.response.status, error.response.data);
        } else {
          console.error(`Error with OpenAI API request: ${error.message}`);
        }
      }
    } catch (error) {
      // Consider implementing your own error handling logic here
      console.error(error);
    }
  }

  useEffect(() => {
    if (!listening && transcript) {
      (async () => {
        await onSubmit();
      })();
    }
  }, [listening, transcript]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  if (!isMicrophoneAvailable) {
    return <span>Microphone is not available.</span>;
  }

  const resetEverything = () => {
    resetTranscript();
    setChatGptRes("");
  };

  const userStartConvo = () => {
    SpeechRecognition.startListening();
    resetEverything();
    if (!convoStart) {
      setConvoStart(true);
    }
  };

  console.log("convoStart", convoStart);
  return (
    <div>
      {/* <p>Microphone: {listening ? "on" : "off"}</p> */}
      {/* <span>push to talk: </span> */}
      {!convoStart ? (
        <button onClick={userStartConvo}>start</button>
      ) : (
        <button
          onClick={() => {
            speech?.cancel();
            resetEverything();
            SpeechRecognition.stopListening();
            if (convoStart) {
              setConvoStart(false);
            }
          }}
        >
          stop
        </button>
      )}

      {listening && (
        <p style={{ color: "black", fontSize: "12px" }}>listening...</p>
      )}
      <p>{transcript}</p>
      <p style={{ color: "orange" }}>{chatGptRes}</p>
    </div>
  );
};

export default BetterUI;
