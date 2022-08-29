import { useState, useEffect } from "react";
import { request } from '../../api/api'

function MainPage() {
    const [datas, setDatas] = useState([]);
    
    const loadData = async () => {
        try {
            const res = await request('http://localhost:8080/productList');
            const result = organizeData(res)
            setDatas(result);
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
        return datas.map((item) => {
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

    useEffect(() => {
        loadData();        
    }, [])

    return (
        <>
            {showProduct()}
        </>
    );
}

export default MainPage;