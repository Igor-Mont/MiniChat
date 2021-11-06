import { useRef, useState } from "react";
import io from "socket.io-client";
import styles from './styles.module.scss';

const socket = io("http://localhost:3333");

function App() {
  const [selectedRoom, setSelectedRoom] = useState('');
  console.log(selectedRoom)
  const selectRef = useRef(null);
  const select_room = selectRef && selectRef.current
  const [username, setUsername] = useState('');

  // socket.emit("select_room", {
  //   username,
  // })

  return (
    <main className={styles.formWrapper}>
      <h1>Papo de Dev</h1>
      <form>
        <h2>Seleciona a sala:</h2>
        <select name="select_room" value={selectedRoom} onChange={e => setSelectedRoom(e.target.value)} >
          <option>Selecione a sala</option>
          <option value="reactjs">React</option>
          <option value="node">Node</option>
          <option value="elixir">Elixir</option>
          <option value="reactnative">React Native</option>
        </select>

        <h2>Informe seu nome:</h2>
        <label htmlFor="nameUser">Nome:</label>
        <input type="text" name="name" id="nameUser" value={username} onChange={e => setUsername(e.target.value)} />
      </form>
    </main>
  )
}

export default App
