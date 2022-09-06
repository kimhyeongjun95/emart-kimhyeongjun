import styles from './navbar.module.css';
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

import backHome from '../../assets/backhome.png';
import hamburger from '../../assets/hamburger.png';

function Navbar({handleFilterProduct}) {
    const [currentMenu, setCurrentMenu] = useState(0);
    const [visible, setVisible] = useState(false);
    
    const menuArr = [
        { name: '전체' },
        { name: '가공' },
        { name: '신선' },
        { name: '대한민국수산대전' },
        { name: '시니어 WEEK' },
        { name: '마음은 가볍게 준비는 완벽히' },
        { name: 'SUMMER 클e어런스' },
        { name: '금주의 초특가 찬스' },
    ]

    const handleMenu = (idx) => {
        setCurrentMenu((index) => index = idx);
        handleFilterProduct(menuArr[idx].name);
    }

    const handleNav = () => {
        if (window.scrollY > 100) setVisible(true);
        else setVisible(false);
    }

    useEffect(() => {
        window.addEventListener('scroll', handleNav);
        return () => {
            window.removeEventListener('scroll', handleNav);
        }
    }, [])

    return(
        <nav className={styles.navhead}>
            <div className={styles.top}>
                <img src={backHome} alt="backhome" className={styles.navimg}/>
                <h2>금주의 전단 광고</h2>
                <img src={hamburger} alt="hamburger" className={styles.navimg} />
            </div>
            <h2>금주의 전단 상품을 만나보세요</h2>
            <Swiper
                className={`${styles.navbar} ${visible && 'top-move'}`}
                slidesPerView={3}
                spaceBetween={2}
                initialSlide={1}
                centeredSlides={true}
                scrollbar={{ draggable: true, dragSize: 24 }}
            >
                {menuArr.map((ele, idx) => {
                    return (
                        <SwiperSlide 
                            key={idx}
                            className={currentMenu === idx ?  `${styles.subMenu} ${styles.selected}` : `${styles.subMenu}` }
                            onClick={() => handleMenu(idx)}
                        >
                            {ele.name}
                        </SwiperSlide>
                    )
                })}
            </Swiper>
        </nav>
    )
}

export default Navbar;


