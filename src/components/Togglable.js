import {useState} from 'react'
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visible, setVisible] = useState(false)

  const hiddenComponent = {display: visible ? 'none' : ''}
  const visibleComponent = {display: visible ? '' : 'none'}

  const toggleVisible = () => {
    setVisible(!visible)
  }

  return (
    <div>
      <div style={hiddenComponent}>
        <button onClick={toggleVisible}>{props.buttonLabel}</button>
      </div>
      <div style={visibleComponent}>
        {props.children}
        <button onClick={toggleVisible}>cancel</button>
      </div>
    </div>
  )
}

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable
