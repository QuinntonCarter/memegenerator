import { useEffect } from 'react';
import Trollface from '../images/Trollface.svg';

const localRand = JSON.parse(localStorage.getItem('RandomMeme')) || ''


const LoadingComp = (props) => {
    const {
        setRandomMeme,
        randomMeme,
        getMemes
    } = props

    // get memes from api if fall out
    useEffect(() => {
        if(!randomMeme){
            getMemes()
            setRandomMeme({
                imgSrc: localRand.url
            })
        } if(localRand.url === null || undefined){
            getMemes()
            setRandomMeme({
                imgSrc: localRand.url
            })
        }
    }, [])

    return(
        <div className="flex items-center h-screen justify-center ">
            <img className='animate-spin h-20' alt='Loading...' src={Trollface}/>
        </div>
    )
}

export default LoadingComp;