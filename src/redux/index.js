import { createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"

export function getImages() {
    return (dispatch) => {
        dispatch({
            type: "FETCH_REQUEST"
        })
        fetch('https://api.thecatapi.com/v1/images/search?limit=80&mime_t􀁜pes=&order=Random&si􀁝e=small&page=3&sub_id=demo-ce06ee')
            .then(res => res.json())
            .then(images => {
                dispatch({
                    type: "FETCH_SUCCESS",
                    // added liked property for like button
                    payload: images
                })
            })
            .catch(error => {
                dispatch({
                    type: "FETCH_ERROR",
                    payload: error.message
                })
            })
    }
}


export function deleteImage(image_id) {
    return {
        type: "DELETE_IMAGE",
        payload: image_id
    }
}

export function removeCategory(image_id, category_id) {
    return {
        type: "DELETE_CATEGORY",
        payload: { image_id, category_id }
    }
}

export function addCategory(image_id, category_name) {
    return {
        type: "ADD_CATEGORY",
        payload: { image_id, category_name }
    }
}

export function addImage(imageUrl) {
    console.log(imageUrl)
    return {
        type: "ADD_IMAGE",
        payload: imageUrl
    }
}


const initialState = {
    images: [],
    loading: true,
    error: ""
}


function reducer(state = initialState, action) {
    switch (action.type) {
        case "DELETE_IMAGE":
            return {
                ...state,
                images: state.images.filter(image => image.id !== action.payload)
            }
        case "ADD_IMAGE": {
            return {
                ...state,
                images: [
                    {
                        url: action.payload,
                        id:Math.floor(Math.random() * 9999)
                    },
                    ...state.images
                ]
            }
        }
        case "DELETE_CATEGORY":
            // first it finds image then filters its categories and deletes the one selected
            return {
                ...state,
                images: state.images.map(image => {
                    if (image.id === action.payload.image_id) {
                        return {
                            ...image,
                            categories: image.categories.filter(category => category.id !== action.payload.category_id)
                        }
                    } else return image

                })
            }

        case "ADD_CATEGORY":
            const newCategory = {
                // adding random number for ID
                id: Math.floor(Math.random() * 9999),
                name: action.payload.category_name
            }
            return {
                ...state,
                images: state.images.map(image => {
                    if (image.id === action.payload.image_id) {
                        //if there is image.categories property then use spread syntax to get all existing categories else create category property
                        return image.categories ?
                            {
                                ...image,
                                categories: [
                                    ...image.categories,
                                    newCategory
                                ]
                            } :
                            {
                                ...image,
                                categories: [
                                    newCategory
                                ]
                            }

                    } else return image

                })
            }
        case "FETCH_REQUEST":
            return {
                ...state,
                loading: true
            }
        case "FETCH_SUCCESS":
            return {
                images: action.payload,
                loading: false,
                error: ""
            }
        case "FETCH_ERROR":
            return {
                images: [],
                loading: false,
                error: action.payload
            }
        default:
            return state
    }
}

const store = createStore(reducer, applyMiddleware(thunk))
//store.subscribe(() => console.log("REDUX", store.getState()))
export default store