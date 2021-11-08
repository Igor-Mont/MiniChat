import { useQuery } from "../../hooks/useQuery";
import io from 'socket.io-client';
import styles from './styles.module.scss';
import { useRef, useState } from "react";
import dayjs from "dayjs";

const socket = io("http://localhost:3333");

type Message = {
  room: string,
  text: string,
  createdAt: Date,
  username: string
}

export function Chat() {
  const chatRef = useRef<HTMLDivElement>();
  const query = useQuery();
  const room = query.get("selected_room");
  const username = query.get("username");

  socket.emit("select_room", {
    username,
    room
  }, response => {
    response.map( v => createMessage(v))
  });

  socket.on("message", data => {
    createMessage(data);
  })

  function createMessage(data) {
    if(chatRef.current != undefined) {
      chatRef.current.innerHTML += `
        <div className={${styles.messages}}>
          <div>
            <strong>${data.username}: </strong> <p>${data.text}</p> <p>${dayjs(data.createdAt).format("DD/MM HH:mm")}</p>
          </div>
        </div>
      `;
    }
  }

  return (
    <div className={styles.chatBox}>
      <h3>Olá {username} - Sala {room}</h3>

      <div ref={chatRef} className={styles.messages}>
        {/* {lastMessages.map( v => (
          <div>
            <strong>{v.username} </strong> <p>{v.text}</p> <p>{v.createdAt}</p>
          </div>
        ))} */}
      </div>

{/* define functon to keypress and onclick event */}
      <input onKeyPress={e => {
        if(e.key == "Enter") {
          const target = e.target as HTMLInputElement
          const message = target.value;

          const data = {
            room,
            message,
            username
          }

          socket.emit("message", data);

          target.value = ''
        }
      }} type="text" placeholder="Digite sua mensagem" />
    </div>
  );
}