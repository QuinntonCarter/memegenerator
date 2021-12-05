import { BeakerIcon } from '@heroicons/react/outline';
import { SwitchHorizontalIcon } from '@heroicons/react/outline';
import LoadingComp from '../components/Loading';

export default function MemeForm(props){
    const {
        inputs,
        handleChange,
        handleSubmit,
        randomMeme,
        memes,
        getCreatedMemes,
        allMemes,
        getRandom,
        getMemes,
        errMsg
    } = props

    return(
        <>
            { randomMeme.imgSrc ?
                <div className='rounded pt-3 px-3'>
                    <h1 className='border-solid border-2 border-navy p-2 text-center bg-white rounded font-normal text-navy'>{randomMeme.name}</h1>
                    <form className='grid pt-2 grid-cols-4 '>
                        <button className='col-span-2 text-xs px-4 p-1 m-1 mx-auto font-medium rounded-full w-auto bg-cream border-b-4 border-yellow-400 text-indigo-800 inline-flex items-center' onClick={handleSubmit} >
                            <span> Generate </span>
                            <BeakerIcon className='w-5'/>
                        </button>
                        <button className='col-span-2 text-xs px-4 p-1 m-1 mx-auto rounded-full font-medium w-auto bg-babyBlue text-indigo-800 border-b-4 border-blue-400 inline-flex items-center' onClick={getRandom}>
                            <span> Randomize </span>
                            <SwitchHorizontalIcon className='w-5'/>
                        </button>
                        <img className='col-span-4 max-h-auto mx-auto rounded border-white border-4 m-3' src={randomMeme.imgSrc} alt='initial-meme' />
                        <input required className='col-span-4 focus:ring-2 text-xs focus:ring-gray-200' type='text' name='topText' placeholder='First text' value={inputs.topText} onChange={handleChange}/>
                        <input required className='col-span-4 focus:ring-2 text-xs focus:ring-gray-200' type='text' name='bottomText' placeholder='Second text' value={inputs.bottomText} onChange={handleChange}/>
                        <h3> {errMsg}</h3>
                    </form>
                </div>
            :
                <LoadingComp
                    getMemes={getMemes}
                    allMemes={allMemes}
                    memes={memes}
                    getCreatedMemes={getCreatedMemes}
                />
            }
            
        </>
    )
}