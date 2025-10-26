import React, { use } from 'react';
import { NavLink } from 'react-router';

const news = fetch('/kidsdata.json') .then(res => res.json())

const PetNews = () => {
    // console.log(news)
    const newsData = use(news);
    return (
        <div className='font-bold'>
            <h1>All pet ({newsData.length})</h1>
            <div className='grid grid-cols-1 mt-5 gap-3'>
                {
                    newsData.map(sideLink=> <NavLink key={sideLink.toyId} className={"btn bg-base-100 border-0 hover:bg-base-200 font-semibold "}
                    
                         to ={`/pets-news/${sideLink.toyId}`}

                    > {sideLink.toyName}</NavLink>)
                }
            </div>
        </div>
    );
};

export default PetNews;