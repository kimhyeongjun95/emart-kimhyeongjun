import Navbar from "../../components/Navbar";
import { useState, useEffect, useRef } from "react";
import { request } from '../../api/api'
import styles from './index.module.css'

function MainPage() {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(0);
    const [shows, setShows] = useState({
        showList: [],
        loadCount: 0,
    });
    const observerRef = useRef(null);
    const { showList, loadCount } = shows;
    const URL = "http://localhost:8080/productList";
    // const URL = "https://emart-kimhyeongjun.herokuapp.com/api/productList";

    const showProduct = () => {
        return showList.map((item) => {
            return (
                <div key={item.id} className={styles.box}>
                    <div className={styles.boxImg}>
                        <img 
                            src={item.image ? item.image :"https://stimg.emart.com/upload/onlineleaflet/220818/2000001420751.png"} 
                            alt={`img${item.id}`}
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

    const handleFilterProduct = async (name) => {
        try {
            setShows((shows) => ({...shows, loadCount: 10 }));
            const res = await request(URL);
            let result = organizeData(res)
            if (name === '전체') {
                setData(result);
                return;
            };
            result = result.filter(item => item.category === name);
            setData(result);
        } catch (e) {
            console.warn(e);
        }
    }
    
    const handleIntersect = (entry) => {
        const target = entry[0];
        if (target.isIntersecting) setPage(page => page + 1);
    }

    useEffect(() => {
        const handleLoadMore = async (datas) => {
            if (loadCount > 50) return;
            if (data.length) {
                const sliced = datas.slice(0, loadCount + 10);
                setShows((shows) => ({...shows, showList: sliced, loadCount: loadCount + 10 }));
            }
        };
        handleLoadMore(data); 
    }, [page, data])

    useEffect(() => {
        const observer = new IntersectionObserver(handleIntersect, { threshold: 0 });
        const loadData = async () => {
            try {
                const res = await request(URL);
                const result = organizeData(res)
                setData(result);
                if (observerRef.current) observer.observe(observerRef.current);
            } catch (e) {
                console.warn(e);
            }
        }
        loadData();
        return () => {
            observer.disconnect();
        }
    }, []);

    return (
        <>
            <Navbar handleFilterProduct={handleFilterProduct} />
            <div className={styles.main}>
                {showProduct()}
            </div>
            {<div ref={observerRef}></div>}
            <br />
        </>
    );
}

export default MainPage;