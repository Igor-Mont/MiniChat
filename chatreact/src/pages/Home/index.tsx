import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from './styles.module.scss';

export function Home() {
  const [room, setRoom] = useState('');
  const [username, setUsername] = useState('');

  return (
    <main className={styles.formWrapper}>
      <h1>Papo de Dev</h1>
      <form>
        <h2>Seleciona a sala:</h2>
        <select name="select_room" value={room} onChange={e => setRoom(e.target.value)} >
          <option>Selecione a sala</option>
          <option value="reactjs">React</option>
          <option value="node">Node</option>
          <option value="elixir">Elixir</option>
          <option value="reactnative">React Native</option>
        </select>

        <h2>Informe seu nome:</h2>
        <label htmlFor="nameUser">Nome:</label>
        <input type="text" name="username" id="nameUser" value={username} onChange={e => setUsername(e.target.value)} />
{/* add keypress event */}
        <button type="submit">
          <Link to={`/chat?selected_room=${room}&username=${username}`}>Entrar</Link>
        </button>
      </form>
    </main>

  );
}