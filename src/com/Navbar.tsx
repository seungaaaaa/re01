import { NavLink } from 'react-router-dom'
import styles from './Navbar.module.scss'

const Navbar = () => {

    let menus = [
        { name: '홈', path: '/home' },
        { name: '날씨', path: '/weather' },
        { name: '상품소개', path: '/products' },
        { name: '장바구니', path: '/cart' },
        { name: '후기', path: '/contact' }
    ]

    return (
        <header className={styles.navbar}>
            <div className={styles.logo}>&lt;Seunga /&gt;</div>
            <nav>
                <ul className={styles.menuList}>
                    {
                        menus.map((item) => (
                            <li key={item.path}>
                                <NavLink to={item.path}
                                    className={({ isActive }) => isActive ? styles.active : undefined}  // 클릭을 햇으면 true로 active클래스 적용
                                >{item.name}</NavLink>
                            </li>
                        ))
                    }
                </ul>
            </nav>
        </header>
    )
}

export default Navbar