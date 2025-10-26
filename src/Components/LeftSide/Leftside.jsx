import React, { Suspense } from 'react';
import PetNews from '../PetNews/PetNews';

const Leftside = () => {
    return (
        <div>
            <Suspense fallback= {<span>Loading...</span>}>
            <PetNews></PetNews>

            </Suspense>
        </div>
    );
};

export default Leftside;