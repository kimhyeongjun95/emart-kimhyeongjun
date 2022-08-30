import Navbar from "../../components/Navbar.jsx";
import { useState, useEffect, useRef, useCallback } from "react";
import { request } from '../../api/api'
import styles from './index.module.css';

function MainPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [shows, setShows] = useState({
        showList: [],
        loadCount: 0,
    });
    const observerRef = useRef(null);
    const preventRef = useRef(true);
    const { showList, loadCount } = shows;
    // const URL = "http://localhost:8080/productList";
    const URL = "https://emart-kimhyeongjun.herokuapp.com/api/productList";
    
    const loadData = async () => {
        try {
            const res = await request(URL);
            const result = organizeData(res)
            setData(result);
            handleLoadMore(result);
            return;
        } catch (e) {
            console.warn(e);
        }
    }

    const organizeData = (response) => {
        return response.map((element) => {
            const organizedPrice = element.price.toLocaleString('en-US') + '원';
            const organizedLikes = element.likes.toLocaleString('en-US');
            const organizedComments = element.comments.toLocaleString('en-US');
            return { ...element, 
                price : organizedPrice,
                likes: organizedLikes,
                comments: organizedComments
            };
        })
    }

    const showProduct = () => {
        return showList.map((item) => {
            return (
                <div key={item.id} className={styles.box}>
                    <div className={styles.boxImg}>
                        <img 
                            src={item.image ? item.image :"https://stimg.emart.com/upload/onlineleaflet/220818/2000001420751.png"} 
                            alt={`${item.id}+'img`} 
                        />
                    </div>
                    <div className={styles.boxInfo}>
                        <span className={styles.price}>{item.price}</span>
                        <p>{item.name}</p>
                        <div className={styles.favoriteBox}>
                            <span className={styles.likes}>좋아요 {item.likes}</span>
                            <span className={styles.comments}>댓글 {item.comments}</span>
                        </div>
                    </div>
                    <hr />
                </div>
            )
        })
    }

    const handleLoadMore = useCallback(async(datas) => {
        if (loadCount > 30) return;
        let sliced = datas.slice(loadCount, loadCount + 10);
        setShows((shows) => ({...shows, loadCount: loadCount + 10 }));
        setShows((shows) => ({...shows, showList: [...showList, ...sliced] }));
        preventRef.current = true;
    }, [page])

    const handleIntersect = (entry) => {
        const target = entry[0];
        if (target.isIntersecting && preventRef.current) {
            preventRef.current = false;
            setPage(page => page + 1);
        }
    }

    const handleFilterProduct = (name) => {
        if (name === '전체') {
            setShows((shows) => ({...shows, showList: data }));
            return;
        };
        let temp = [...data];
        let result = temp.filter(item => item.category === name);
        setShows((shows) => ({...shows, showList: result}));
    }

    useEffect(() => {
        handleLoadMore(data);        
    }, [page])

    useEffect(() => {
        loadData();
        const observer = new IntersectionObserver(handleIntersect, { threshold: 0.5});
        if (observerRef.current) observer.observe(observerRef.current)
        return () => {
            observer.disconnect();
        }
    }, []);

    return (
        <>
            <Navbar handleFilterProduct={handleFilterProduct} />
            {showProduct()}
            {loadCount <= 30 && <h1 ref={observerRef}>더보기</h1>}
        </>
    );
}

export default MainPage;