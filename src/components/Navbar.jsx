import styles from './Navbar.module.css';
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

function Navbar({handleFilterProduct}) {
    const [currentMenu, setCurrentMenu] = useState(0);
    
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
        setCurrentMenu(() => idx);
        handleFilterProduct(menuArr[idx].name);
    }

    return(
        <>
            <h2>금주의 전단 상품 광고를 만나보세요</h2>
            <Swiper
                className={styles.Navbar}
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
        </>
    )
}

export default Navbar;


