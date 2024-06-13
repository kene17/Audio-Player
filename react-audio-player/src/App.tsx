import './App.css';
import AudioPlayer from './sections/Audio/AudioPlayer';
import AudioList from './sections/AudioList/AudioList';
import Navbar from './sections/Navbar/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <AudioList />
      <div style={{ padding: '20px' }}>
        <AudioPlayer />
      </div>
    </>
  );
}

export default App;
