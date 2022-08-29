export const request = async (url) => {
    try {
        const res = await fetch(url);
        if (res.ok) {
            return await res.json();
        }
        throw new Error('데이터를 불러오지 못했습니다!');
    } catch (e) {
        console.warn(e);
    }
}