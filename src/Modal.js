import './styles/modal.css'
import { Fragment } from 'react'
import ReactDOM from 'react-dom'

const Backdrop = ({ hideEmail }) => {
  return <div className="backdrop" onClick={hideEmail}></div>
}

const ModalOverlay = props => {
  return (
    <div className="modal">
      <div>{props.children}</div>
    </div>
  )
}

const portalElement = document.getElementById('overlays')

const Modal = props => {
  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop hideEmail={props.hideEmail} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  )
}

export default Modal
