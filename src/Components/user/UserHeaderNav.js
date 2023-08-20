import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {ReactComponent as Photos} from '../../Assets/feed.svg';
import {ReactComponent as Statics} from '../../Assets/estatisticas.svg';
import {ReactComponent as AddPhoto} from '../../Assets/adicionar.svg';
import {ReactComponent as Sair} from '../../Assets/sair.svg';
import styles from './UserHeaderNav.module.css';
import UseMedia from '../../Hooks/UseMedia';
import { useDispatch } from 'react-redux';
import { userLogout } from '../../store/user';

const UserHeaderNav = () => {
  const dispatch = useDispatch();
  const mobile = UseMedia('(max-width: 40rem)');
  const [mobileMenu,setMobileMenu] = React.useState(false);
  const {pathname} = useLocation();

  React.useEffect(() => {
    setMobileMenu(false);
  },[pathname])

  return (
    <React.Fragment>
      {mobile &&
        <button aria-label="Menu" className={`${styles.mobileButton} ${mobileMenu && styles.mobileButtonActive}`} onClick={() => setMobileMenu(!mobileMenu)}></button>
    }
      <nav className={`${mobile ? styles.navMobile : styles.nav} ${mobileMenu && styles.navMobileActive}`}>
        <NavLink to="/conta/" end><Photos />{mobile && 'Minha conta'}</NavLink>    
        <NavLink to="/conta/estatisticas"><Statics />{mobile && 'estatísticas'}</NavLink>
        <NavLink to="/conta/postar"><AddPhoto />{mobile && 'Adicionar foto'}</NavLink>
        <button onClick={() => dispatch(userLogout())}><Sair />{mobile && 'Sair'}</button>
      </nav>
    </React.Fragment>
  )
}

export default UserHeaderNav;