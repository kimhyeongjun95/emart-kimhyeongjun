import { useState, useEffect } from "react";

function MainPage() {
    const [product, setProduct] = useState([]);
    
    const loadData = async () => {
        try {
            const res = await fetch('http://localhost:8080/productList');
            if (res.ok) {
                const result = await res.json();
                setProduct(result);
                return;
            }
            throw new Error('데이터를 불러오지 못했습니다!');
        } catch (e) {
            console.warn(e);
        }
    }

    const showProduct = () => {
        return product.map((item) => {
            return (
                <div key={item.id}>
                    <span>{item.name}</span>
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