/* eslint-disable  */
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";
import { io } from "socket.io-client";
import {
  authActionCreators,
  messageActionCreators
} from "../../services/Actions";
import axiosInstance from "../../services/Axios/axios";
import RenderLoanPage from "../RenderLoanPage";
import LoanMessage from "./LoanMessage";

function LoansMessagesDetailed() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { GetUserProfile } = bindActionCreators(authActionCreators, dispatch);
  const { GetMessages } = bindActionCreators(messageActionCreators, dispatch);
  const messagesNew = history.location?.state?.message;
  const currentChat = history.location?.state?.conversation;
  console.log('history', history)
  const [message, setMessage] = useState();
  const [messages, setMessages] = useState({});
  const [chats, setChats] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const auth = useSelector((state) => state?.auth);
  const scrollRef = useRef();
  const socket = useRef();

  console.log("messagesN", messagesNew);
  console.log("messages", messages);
  console.log("currentChat", currentChat);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      sender: auth?.user?._id,
      text: message,
      conversationId: currentChat?._id,
    };
    console.log("data", data);

    const recieverId = currentChat.members.find(
        (mem) => mem !== auth?.user?._id
      );
      console.log('recieverId', recieverId)
      //send this message to the socket server
      socket.current.emit("sendMessage", {
        sender: auth?.user?._id,
        recieverId,
        text: message,
      });

      try {
        const res = await axiosInstance.post("/messenger/messages", data);
        if (res) {
          setMessages(res.data);
        //   setChats(res.data.chat);
          setMessage("");
        }
      } catch (error) {
        console.log("error", error);
      }

  };

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getUserMessages", (data) => {
      setArrivalMessage({
        sender_id: data.sender,
        message: data.text,
        created_at: Date.now(),
      });
    });
    GetUserProfile();
    // GetMessages(messagesNew?.conversationId);
    // GetConversations(auth?.user?._id);
    // GetUsersForChat();
  }, []);

  console.log("messages", messages);
  console.log("arrivalMessage", arrivalMessage);
  console.log("chats", chats);
  console.log("currentChat", currentChat);

  useEffect(() => {
    //conect to socket server
    // setSocket(io("ws://localhost:8900"))

    //send user details to the server
    socket.current.emit("addUser", auth?.user?._id);

    //get users from the socket server
    socket.current.on("getUsers", (users) => {
      console.log("usersConnected to socket", users);
    });
  }, [auth?.user]);

  useEffect(() => {
    const getMessage = async () => {
      try {
        const res = await axiosInstance.get(
          `/messenger/messages/${currentChat?._id}`
        );
        setMessages(res.data);
        setChats(res.data.chat);
        console.log("res.data", res.data);
      } catch (error) {
        console.log("error", error);
      }
    };
    getMessage();
  }, [currentChat]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chats]);

  useEffect(() => {
    setMessages(messagesNew);
    setChats(messagesNew.chat);
  }, [messagesNew]);

  //update messages if there is new arrival message
  useEffect(() => {
    arrivalMessage && currentChat?.members.includes(arrivalMessage?.sender_id) &&  setChats([...chats, arrivalMessage]);


  }, [arrivalMessage]);


  return (
    <RenderLoanPage>
      <div className="LoansMessagesDetailed">
        <button className="backbtn" onClick={() => history.goBack()}>
          Back
        </button>
        <div className="chatBoxTop">
          {chats?.map((mes, i) => {
            console.log("mes", mes);
            // setConver(mes)
            return (
              <div ref={scrollRef}>
                <LoanMessage
                  key={i}
                  auth={auth}
                  own={mes?.sender_id === auth?.user?._id}
                  sender_id={mes?.sender_id}
                  mesgs={mes?.message}
                  date={mes?.data}
                />
              </div>
            );
          })}
        </div>
        <div className="buttonContainer">
          <textarea
            className="chatMessageInput"
            name="message"
            value={message}
            onChange={(e) => setMessage(e?.target?.value)}
            placeholder="Start writing your message here..."
          ></textarea>
          <button className="button" onClick={handleSubmit}>
            Send
          </button>
        </div>
      </div>
    </RenderLoanPage>
  );
}

export default LoansMessagesDetailed;
