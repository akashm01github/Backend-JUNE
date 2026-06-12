import '../src/index.css'
import FacialExpression from './components/FacialExpression/FacialExpression'

const App = () => {
  return (
    <div className='main_container'>
      <h1>Moody-Player</h1>
      <FacialExpression/>
    </div>
  )
}

export default App