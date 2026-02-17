import './home.css'
import NewestWatch from './components/NewestWatches/NewestWatch';
import Highlights from './components/Highlights/Highlights';

export default function Home() {
  return (
    <div className="home">
      <NewestWatch />
      <Highlights />
    </div>
  );
}