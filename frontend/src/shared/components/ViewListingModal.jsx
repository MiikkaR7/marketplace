import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import { useRef } from 'react';

import Backdrop from './Backdrop';
import Button from './Button';

import './Modal.css';

const ModalOverlay = props => {
  const content = (
    <>
    <div className={`modal ${props.className}`} style={props.style}>
      <header className={`modal__header ${props.headerClass}`}>
        <h2>{props.header}</h2>
        <button onClick={props.onClick}>X</button>
      </header>
      <h3>{props.description}</h3>
      <img style={props.style} src={props.img}/>
      <h4>Listing created by: {props.displayname}</h4>
      <footer className={`modal__footer ${props.footerClass}`}>
        <h2>{props.footer}</h2>
      </footer>
    </div>
    </>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'))
}

const ViewListingModal = props => {
  const nodeRef = useRef();
  return ( 
    <>
      {props.show && <Backdrop onClick={props.onCancel}/>}
      <CSSTransition 
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
        nodeRef={nodeRef}
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  )
}
export default ViewListingModal;
