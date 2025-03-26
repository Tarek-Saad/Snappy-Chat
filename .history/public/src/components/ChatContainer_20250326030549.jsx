useEffect(() => {
  const fetchMessages = async () => {
    if (!currentChat) return;
    const storedUser = localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY);
    if (storedUser) {
      const data = JSON.parse(storedUser);
      const response = await axios.post(recieveMessageRoute, {
        from: data._id,
        to: currentChat._id,
      });
      setMessages(response.data);
    }
  };
  fetchMessages();
}, [currentChat]);

useEffect(() => {
  if (socket.current) {
    socket.current.on("msg-recieve", (msg) => {
      setMessages((prev) => [...prev, { fromSelf: false, message: msg }]);
    });
  }
}, []);
