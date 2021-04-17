import {Link} from 'react-router-dom'

function NotFoundScreen() {
  return (
    <div>
      <div>
        Sorry... nothing here. <Link to="/list">Go home</Link>
      </div>
    </div>
  )
}

export {NotFoundScreen}