import React, { useState, useEffect } from 'react';
import {
    XMarkIcon, MegaphoneIcon
} from "@heroicons/react/24/outline";

import { db } from '../../services/firebase/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Banner = () => {
    const [Data, setData] = useState([])

    useEffect(() => {
        async function fetchData() {

            const getBanner = doc(db, "banner", "bannerContent");
            const docSnap = await getDoc(getBanner);

            if (docSnap.exists()) {

                const data = docSnap.data();
                setData(data)

            } else {
                console.log("No such document!");
            }
        }

        fetchData();

    }, []);

    if (Data.status) {
        return (
            <div className='bg-indigo-700 text-white py-1 px-4 font-medium text-sm flex justify-between items-center'>

                <div></div>
                <div className='flex justify-center items-center gap-2'><MegaphoneIcon className='h-4 w-4' /> {Data.content}</div>
                <button type="submit" onClick={() => setData(false)}>
                    <XMarkIcon className='h-5 w-5' />
                </button>

            </div>
        );
    }
}

export default Banner;