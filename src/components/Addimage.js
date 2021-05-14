import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addImage } from '../redux'

export default function Addimage() {

    const dispatch = useDispatch()
    const [imageUrl, setImageUrl] = useState("")

    function submitImage() {
        if (imageUrl.trim() === "") {
            return
        }
        dispatch(addImage(imageUrl))
    }

    return (
        // Using img URL to upload new image to grid and add it to state
        <div className="add-image">
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} type="text" placeholder="Enter image URL"></input>
            <button type="button" onClick={submitImage}>Add</button>
        </div>
    )
}
