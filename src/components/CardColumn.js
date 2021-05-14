import React from 'react'
import Card from './Card'

export default function CardColumn({ images }) {    

    function showAllImages() {
        return images.map(image => {
            return <Card key={image.id} image={image} />
        })
    }

    return (
        <div className="card-columns">
            {showAllImages()}
        </div>
    )
}
