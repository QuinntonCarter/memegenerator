import { useEffect } from 'react';
import Trollface from '../images/Trollface.svg';

const LoadingComp = (props) => {
    const {
        randomMeme,
        getMemes
    } = props

    // get memes from api if fall out
    useEffect(() => {
        if(!randomMeme){
            getMemes()
        }
    },)

    return(
        <div className="flex items-center h-screen justify-center ">
            <img className='animate-spin h-20' alt='Loading...' src={Trollface}/>
        </div>
    )
}

export default LoadingComp;