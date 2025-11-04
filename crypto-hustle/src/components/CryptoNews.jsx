import { useEffect, useState } from "react"
const API_KEY = import.meta.env.VITE_APP_API_KEY

function CryptoNews() {
    const [newsList, setNewsList] = useState(null);


    useEffect(() => {
        const fetchNews = async () => {
            const newsResponse = await fetch(`https://min-api.cryptocompare.com/data/v2/news/?lang=EN&api_key=${API_KEY}`);
            const newsData = await newsResponse.json();
            //console.log('News API Response:', newsData); // This shows the structure of the api data response.
            setNewsList(newsData);
        }
        fetchNews().catch(console.error);
    }, [])

    return (
        <div>
        <h3>Crypto News</h3>
            <ul className="side-list">
                {newsList?.Data?.map((article) => 
                <li className="news-article" key={article.id}><a href={article.url}>{article.title}</a></li>
                )}
            </ul>
        </div>
    );
    
}

export default CryptoNews;