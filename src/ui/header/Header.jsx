import './header.css';
import { IoIosArrowDown } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { IoPerson } from "react-icons/io5";
import { IoMdHeart } from "react-icons/io";

export default function Header({ onNavigate }) {

  return (
    <header className="header">
      <div className='header-top'>
        <div className='header-left'>
          <button className='header-button'>PT<IoIosArrowDown /></button>
          <button className='header-button'>About us</button>
        </div>
        <button className='header-button' onClick={() => onNavigate('home')}>
          <img className='title' src="/void.png" alt="void" />
        </button>
        <div className='header-right'>
          <button className='header-button'><IoSearch /></button>
          <button className='header-button'><IoMdHeart /></button>
          <button className='header-button' onClick={() => onNavigate('login')}><IoPerson /></button>
        </div>
      </div>
      <div className='header-bottom'>
        <button className='header-button'>Elegance</button>
        <button className='header-button'>Casual</button>
        <button className='header-button'>Daily</button>
      </div>
    </header>
  );
}