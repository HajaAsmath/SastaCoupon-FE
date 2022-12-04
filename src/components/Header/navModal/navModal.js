import { Link } from 'react-router-dom';
import './NavModalStyle.css'

export default function NavModal(props) {

    let hideNavModal = (e) => {
        e.currentTarget.parentElement.classList.add('out');
        e.currentTarget.parentElement.classList.remove('active');
    }

    let handleOnClick = (e) => {
      document.querySelector('.nav-modal').classList.add('out');
      document.querySelector('.nav-modal').classList.remove('active');
    }

    return <div className="nav-modal">
    <span className="nav-close material-icons md-48" onClick={hideNavModal}>close</span>
    <ul className='modal-nav-list'>
      <Link onClick={handleOnClick} to='/about'><li>Mission</li></Link>
      <Link onClick={handleOnClick} to='/discover'><li>Discover</li></Link>
      <Link onClick={handleOnClick} to='/faq'><li>FAQ</li></Link>
      <Link onClick={handleOnClick} to='/upload-coupon'><li>Sell your coupon</li></Link>
      <li></li>
    </ul>
    </div>
}