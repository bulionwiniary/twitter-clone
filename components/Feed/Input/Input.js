import {
    CalendarIcon, ChartBarIcon,
    EmojiHappyIcon, PhotographIcon,
    XIcon
} from '@heroicons/react/outline'
import { Picker } from 'emoji-mart'
import 'emoji-mart/css/emoji-mart.css'
import { db, storage } from '../../../firebase'
import { collection, addDoc, serverTimestamp, updateDoc, doc } from '@firebase/firestore'
import { ref, getDownloadURL, uploadString } from '@firebase/storage'
import React, { useState, useRef } from 'react'
import Loader from 'react-loader-spinner'

export default function Input() {

    const [input, setInput] = useState('')
    const [selectedFile, setSelectedFile] = useState(null)
    const [showEmojis, setShowEmojis] = useState(false)
    const [loading, setLoading] = useState(false)
    const filePickerRef = useRef(null)

    const textChangeHandler = (e) => {
        setInput(e.target.value)
    }

    const closeImageHandler = (e) => {
        setSelectedFile()
    }

    const addImageToPost = (e) => {
        const reader = new FileReader();
        if (e.target.files[0]) {
            reader.readAsDataURL(e.target.files[0]);
        }

        reader.onload = (readerEvent) => {
            console.log(readerEvent)
            setSelectedFile(readerEvent.target.result);
        };
    };

    const addEmoji = (e) => {
        let sym = e.unified.split("-")
        let codesArray = []
        console.log(e)
        sym.forEach(el => codesArray.push("0x" + el))
        let emoji = String.fromCodePoint(...codesArray)
        setInput(prevState => prevState + emoji)
    }

    // const addEmoji2 = (emoji) => {
    //     setInput(prevState => prevState + emoji.native)
    // }

    const sendPost = async () => {
        if (loading) {
            return
        }
        setLoading(true)

        const docRef = await addDoc(collection(db, 'posts'), {
            text: input,
            timestamp: serverTimestamp()
        })

        const imgRef = ref(storage, `posts/${docRef.id}/image`)
        if (selectedFile) {
            await uploadString(imgRef, selectedFile, "data_url").then(async () => {
                const downloadURL = await getDownloadURL(imgRef)
                await updateDoc(doc(db, "posts", docRef.id), {
                    image: downloadURL
                })
            })
        }
        setLoading(false)
        setInput('')
        setShowEmojis(false)
        setSelectedFile('')
    }

    return (
        <>

            <div className={`border-b border-gray-700 p-3 flex space-x-3 overflow-y-scrol relative`}>
                {loading && <div className='absolute flex justify-center items-center w-full top-1/4'>
                    <Loader
                        type='ThreeDots'
                        height={56}
                        width={56}
                        color='#1d9bf0'
                    />
                </div>}
                <img src='https://scontent-frx5-1.xx.fbcdn.net/v/t1.6435-9/180978949_314228950059549_1005358403722529104_n.jpg?_nc_cat=105&ccb=1-5&_nc_sid=09cbfe&_nc_ohc=H9Aph8axL3kAX87x4GW&_nc_ht=scontent-frx5-1.xx&oh=9e69a83385611ebef0232ec10774d7d7&oe=61C66F8E' alt='user Image' className={`rounded-full h-11 w-11  cursor-pointer ${loading && 'opacity-40'}`} />
                <div className={`text-white w-full divide-y divide-gray-700 ${loading && 'opacity-40'}`}>
                    <div className={`${selectedFile && 'pb-7'} ${input && 'space-y-2.5'}`}>
                        <textarea
                            onChange={textChangeHandler}
                            value={input}
                            rows='2'
                            placeholder="What's happening?"
                            className='bg-transparent outline-none text-[#d9d9d9] w-full tracking-wide min-h-[50px]' />
                    </div>

                    {selectedFile && (
                        <div className='relative'>
                            <div className='absolute w-8 h-8 bg-[#15181c] hover:bg-[#272c26] bg-opacity-75 rounded-full flex items-center justify-center top-1 left-1 cursor-pointer'
                                onClick={closeImageHandler}>
                                <XIcon className='text-white h-5' />
                            </div>
                            <img
                                src={selectedFile}
                                alt='selected image'
                                className='rounden-2xl max-h-80 object-contain' />
                        </div>
                    )}

                    {!loading && <div className="flex items-center justify-between pt-2.5">
                        <div className='flex items-center'>
                            <div className='icon' onClick={() => filePickerRef.current.click()}>
                                <PhotographIcon className='h-[22px] text-[#1d9bf0]' />
                                <input type='file' onChange={addImageToPost} ref={filePickerRef} hidden />
                            </div>

                            <div className='icon rotate-90'>
                                <ChartBarIcon className='text-[#1d9bf0] h-[22px]' />
                            </div>
                            <div className='icon' onClick={() => setShowEmojis(prevState => !prevState)
                            }>
                                <EmojiHappyIcon className='text-[#1d9bf0] h-[22px]' />
                            </div>
                            <div className='icon'>
                                <CalendarIcon className='text-[#1d9bf0] h-[22px]' />
                            </div>
                            {showEmojis && <Picker
                                onSelect={addEmoji}
                                style={{
                                    position: "absolute",
                                    marginTop: 465,
                                    marginLeft: -40,
                                    maxWidth: 320,
                                    borderRadius: 20,
                                }}
                                theme='dark'
                            />}
                        </div>
                        <button disabled={!input.trim() && !selectedFile} className='font-bold bg-[#1d9bf0] hover:bg-[#1a8cd8] py-1.5 px-4 rounded-full transition disabled:opacity-50 disabled:bg-[#1d9bf0] disabled:cursor-default' onClick={sendPost}>Tweet</button>
                    </div>}
                </div>
            </div>
        </>
    )
}
