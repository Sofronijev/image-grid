import './App.scss';
import CardColumn from './components/CardColumn'
import Addimage from './components/Addimage'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getImages } from './redux'


function App() {
  //number of image columns on page, default 3
  const [columnsNum, setColumnsNum] = useState(3)
  const state = useSelector(state => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getImages())
  }, [dispatch])

  //Changing number of columns based on window width, so it looks better when screen is smaller and there are 2 columns
  useEffect(() => {
    function handleResize() {
      if (window.innerWidth > 1008) {
        setColumnsNum(3)
      } else if (window.innerWidth > 641) {
        setColumnsNum(2)
      } else setColumnsNum(1)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [])
  
  function createImageColumns() {
    if (state.loading === false) {
      //create new array so state doesnt get deleted after splice()
      let arr = [...state.images]
      let columns = []
      //loop through all images and split them in 3 arays
      for (let i = columnsNum; i > 0; i--) {
        columns.push(arr.splice(0, Math.ceil(arr.length / i)));
      }
      return columns.map((images, index) => {
        return <CardColumn key={index} images={images} />
      })
    }
  }

  return (
    <div className="App">
      <h1>Catsplash</h1>
      <Addimage />
      <main>
        {state.loading ? <h2>Loading...</h2> :
          state.error ? <h2>{state.error}</h2> :
            createImageColumns()}
      </main>
    </div>
  );
}
export default App