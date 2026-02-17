import './highlights.css';

export default function Highlights() {
    function getSeason(date = new Date()) {
    const month = date.getMonth();

    if (month >= 2 && month <= 4) return 'Spring';
    if (month >= 5 && month <= 7) return 'Summer';
    if (month >= 8 && month <= 10) return 'Autumn';
    return 'Winter';
    }


    return (
        <div className="highlights">
            <div className='highlight-buttons'>
                <button className="highlight-item">New</button>
                <button className="highlight-item">Best Sellers</button>
                <button className="highlight-item">{getSeason(new Date())} Collection</button>
            </div>
        </div>  
    );
}