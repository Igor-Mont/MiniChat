import React, { MouseEventHandler, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './styles.module.scss';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function verifyInputs(room: string, username: string): boolean {
  if (room.length >= 10 || username.trim() === '' && username.length <= 2) return false;

  return true;
}

export function Home() {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  const navigate = useNavigate();

  function handleEnterInRoom(event: KeyboardEvent) : void {
    const verify = verifyInputs(room, username);

    if (event.key == "Enter" && verify) {
      navigate(`/chat?selected_room=${room}&username=${username}`);
    }

    toast("Dados invalidos")
  }
  const notify = () => toast("Dados Invalidos")
  
  function handleEnterInRoomClick () {
    if (room.length >= 10 || username.trim() === '' && username.length <= 2) return notify();

    navigate(`/chat?selected_room=${room}&username=${username}`);
  }


  return (
    <main className={styles.formWrapper}>
      <ToastContainer />
      <h1>Papo de Dev</h1>
      <form>
        <select name="select_room" value={room} onChange={e => setRoom(e.target.value)} >
          <option>Selecione a sala</option>
          <option value="reactjs">React</option>
          <option value="node">Node</option>
          <option value="elixir">Elixir</option>
          <option value="reactnative">React Native</option>
        </select>
        <input type="text" placeholder="Nome" name="username" id="nameUser" value={username} onChange={e => setUsername(e.target.value)} />
        <button onClick={handleEnterInRoomClick} type="button">
          Entrar na sala
        </button>
      </form>
    </main>

  );
}