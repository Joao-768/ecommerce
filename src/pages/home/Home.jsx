import NewestWatch from './components/NewestWatch';
import Highlights from './components/Highlights';
import Audience from './components/Audience';

export default function Home({ onNavigate }) {
  return (
    <div className="w-full flex flex-col bg-stone-100">
      <NewestWatch onNavigate={onNavigate}/>
      <Highlights/>
      <Audience/>
    </div>
  );
}
