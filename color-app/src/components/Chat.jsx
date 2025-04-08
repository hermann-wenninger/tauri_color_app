function Chat() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("");

  const sendPrompt = async () => {
    const reply = await invoke<string>("send_prompt", { prompt: input });
    setResponse(reply);
  };

  return (
    <div>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={sendPrompt}>Senden</button>
      <p>Antwort: {response}</p>
    </div>
  );
}

 export default Chat;