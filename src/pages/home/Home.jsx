import MainWatch from './components/MainWatch';
import Highlights from './components/Highlights';
import Audience from './components/Audience';
import ForYou from './components/ForYou';
import { useScrollToTop } from '../../utils/format';

export default function Home() {
    const sections = [
        <MainWatch />,
        <Highlights />,
        <ForYou />,
        <Audience />
    ];

    useScrollToTop();

    return (
        <div className="w-full flex flex-col">
            {sections.map((Section, index) => (
                <div key={index}>
                    {Section}
                </div>
            ))}
        </div>
    );
}