import { useState, useEffect, useRef, useCallback } from "react";
import { request } from '../../api/api'

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
    
    const loadData = async () => {
        try {
            const res = await request('http://localhost:8080/productList');
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
                <div key={item.id}>
                    <img src={item.image} alt={`${item.id}+'img`} />
                    <span>{item.price}</span>
                    <p>{item.name}</p>
                    <span>{item.likes}</span>
                    <span>{item.comments}</span>
                    <hr />
                </div>
            )
        })
    }
    const handleLoadMore = useCallback(async(datas) => {
        if (loadCount > 30) return;
        let sliced = datas.slice(0, loadCount + 10);
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
            {showProduct()}
            <h1>대기</h1>
            <h1>대기</h1>
            <h1>대기</h1>
            <h1>대기</h1>
            <h1 ref={observerRef}>로딩중</h1>
        </>
    );
}

export default MainPage;