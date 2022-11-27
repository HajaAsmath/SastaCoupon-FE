import './NavModalStyle.css'

export default function NavModal(props) {

    let hideNavModal = (e) => {
        e.currentTarget.parentElement.classList.add('out');
        e.currentTarget.parentElement.classList.remove('active');
    }

    return <div className="nav-modal">
    <span className="nav-close material-icons md-48" onClick={hideNavModal}>close</span>
    <ul className='modal-nav-list'>
      <li>Mission</li>
      <li>Discover</li>
      <li>FAQ</li>
      <li>Sell your coupon</li>
      <li></li>
    </ul>
    </div>
}