import NewestWatch from './components/NewestWatch';
import Highlights from './components/Highlights';
import Audience from './components/Audience';
import ForYou from './components/ForYou';
import { useScrollToTop } from '../../utils/format';

export default function Home() {
    const sections = [
        <NewestWatch />,
        <Highlights />,
        <ForYou />,
        <Audience />
    ];

    useScrollToTop();

    return (
        <div className="w-full flex flex-col bg-stone-100">
            {sections.map((Section, index) => (
                <div key={index}>
                    {Section}
                </div>
            ))}
        </div>
    );
}