import './App.css';
import AudioPlayer from './sections/Audio/AudioPlayer';
import AudioList from './sections/AudioList/AudioList';
import Navbar from './sections/Navbar/Navbar';
import { NavContextProvider } from './store/NavContext';

function App() {
  return (
    <NavContextProvider>
      <Navbar />
      <AudioList />
      <div style={{ padding: '20px' }}>
        <AudioPlayer />
      </div>
    </NavContextProvider>
  );
}

export default App;
