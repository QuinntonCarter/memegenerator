import React, { useState, useEffect } from 'react';
import UserMemes from './UserMemes.js';
import MemeForm from '../forms/MemeForm.js';
import axios from 'axios';

const initInputs = { topText: '', bottomText: '' }

export default function MemeGenerator(props){
    const {
        errMsg,
        memes,
        getMemes,
        // all memes from DB
        setMemes,
        // all memes from api
        allMemes,
        // all current user's memes
        userMemes,
        setUserMemes,
        randomMeme,
        setRandomMeme,
        submitMeme
    } = props

    const [ inputs, setInputs ] = useState(initInputs);

    function handleChange(e){
        const { name, value } = e.target
            setInputs(prevInputs => ({
            ...prevInputs,
            [name]: value,
        })
        );
    };

    function handleSubmit(e){
        e.preventDefault()
        const createdDate = JSON.stringify(new Date()).slice(1,11).replace('"', '')
        // sends inputs through as params to endpoint to complete meme creation
        axios.get(`/create`, 
        { params: {
            template_id: randomMeme.id,
            text0: inputs.topText,
            text1: inputs.bottomText
            }
        })
        .then(res => 
            // saves to userMemes array until it is submitted to db
            // by submitMeme function
            setUserMemes(prevState => ([
                ...prevState,
                {
                    imgSrc: res.data.data.url,
                    initialUrl: randomMeme.initialUrl,
                    tempID: res.data.data.page_url.slice(22),
                    _api_id: randomMeme.id,
                    created: createdDate
                }
            ])),
            // sets randomMeme key values to match default image's
            setRandomMeme({
                name: randomMeme.name,
                imgSrc: randomMeme.initialUrl,
                initialUrl: randomMeme.initialUrl,
                id: randomMeme.id
            })
        )
        .catch(err => console.log(err))
        // reset inputs to init
        setInputs(initInputs)
    };

    const getRandom = (e) => {
        e.preventDefault()
        // variable finds random number and finds meme at index of that number
        const randomMeme = allMemes[Math.floor(Math.random()*(73-1+1)+1)]
        // sets that meme to randomMeme
        setRandomMeme({
            name: randomMeme.name,
            imgSrc: randomMeme.url,
            initialUrl: randomMeme.url,
            id: randomMeme.id,
            boxes: randomMeme.box_count
        })
    };

    const mappedMemes = (memeObj) => 
        memeObj.map(meme => 
            <UserMemes
                key={meme.tempID}
                {...randomMeme}
                userMemes={userMemes}
                inputs={inputs}
                handleEdit={handleSubmit}
                handleChange={handleChange}
                submitMeme={submitMeme}
                setUserMemes={setUserMemes}
                setMemes={setMemes}
                tempID={meme.tempID}
                _api_id={meme._api_id}
                imgSrc={meme.imgSrc}
                created={meme.created}
                initialUrl={meme.initialUrl}
            />
        ).reverse()

        useEffect(() => {
            axios.get(`/create`, 
            { params: {
                template_id: randomMeme.id,
                text0: inputs.topText,
                text1: inputs.bottomText
                }
            })
            .then((res) => 
            // sets preview img url to randomMeme imgSrc
                setRandomMeme(prevInputs => ({
                    ...prevInputs,
                    name: randomMeme.name,
                    imgSrc: res.data.data ? res.data.data.url : randomMeme.imgSrc,
                    initialUrl: randomMeme.initialUrl,
                    id: randomMeme.id
                }))
            )
            .catch(err => console.log(err))
        }, [inputs.topText, inputs.bottomText])

        return(
            <div className='flex flex-col pb-12 pt-16 overflow-scroll bg-blue-200 w-screen p-3'>
                    <MemeForm
                        errMsg={errMsg}
                        inputs={inputs}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                        randomMeme={randomMeme}
                        allMemes={allMemes}
                        getRandom={getRandom}
                        getMemes={getMemes}
                        memes={memes}
                    />
                    { userMemes ? mappedMemes(userMemes) : null }
                <p className='pt-14 text-center text-xs font-mono text-blue-300'> Quinnton Carter 2021 </p>
            </div>
        )
}