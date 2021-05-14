import React, { useRef, useState } from 'react'
import { useDispatch } from "react-redux"
import { deleteImage, removeCategory, addCategory } from '../redux'

export default function Card({ image }) {

    const { url, id, categories, height, width } = image
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(false)
    const [inputText, setInputText] = useState("")
    const inputRef = useRef(null)
    const cardRef = useRef(null)
    const addRef = useRef(null)


    function showCategories() {
        if (categories) {
            return categories.map(category => <p key={category.id}>{category.name} <span onClick={() => dispatch(removeCategory(id, category.id))}>x</span></p>)
        }
    }

    function changeInput(e) {
        setInputText(e.target.value)
    }

    function showInput() {
        inputRef.current.style.display = "grid"
        addRef.current.style.display = "none"
    }

    function closeInput() {
        inputRef.current.style.display = "none"
        addRef.current.style.display = "inline-block"
        setInputText("")
    }

    function submitInput() {
        dispatch(addCategory(id, inputText))
        setInputText("")
    }

    function changeCardSize(size) {
        cardRef.current.style.width = size
    }

    return (
        <div ref={cardRef} className="card">
            <img width={width} height={height} src={url} alt={url}></img>
            <div className="card-overlay">
                <button onClick={() => dispatch(deleteImage(id))}>❌</button>
                <button onClick={() => setLiked(currVal => !currVal)}>{liked ? "💖" : '🖤'}</button>
                <div className="size-buttons">
                    <button onClick={() => changeCardSize("50%")} type="button">S</button>
                    <button onClick={() => changeCardSize("70%")} type="button">M</button>
                    <button onClick={() => changeCardSize("100%")} type="button">L</button>
                </div>
                <div className="categories">
                    {showCategories()}
                    <p ref={addRef} className="add-category" title="Add category" onClick={showInput}>+</p>
                    <div ref={inputRef} className="input-container">
                        <input type="text" placeholder="Add category" value={inputText} onChange={changeInput}></input>
                        <span className="submit" onClick={submitInput}>✔</span>
                        <span className="cancel" onClick={closeInput}>✖</span>
                    </div>
                </div>
            </div>            
        </div>
    )
}
