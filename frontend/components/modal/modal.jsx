import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import WorkspaceFormContainer from './workspace_form_container';
import BoardFormContainer from './board_form_container';

function Modal({modal, closeModal}) {
  if (!modal) {
    return null;
  }
  let component;
  switch (modal) {
    case 'workspace':
      component = <WorkspaceFormContainer />;
      break;
    case 'board':
      // debugger
      component = <BoardFormContainer />;
      break;
    case 'about':
      component = <div className='about-me'>
        <span>Welcome to Humpday, my clone of <a href='https://monday.com/' target='_blank'>Monday.com</a>.</span>
        <br></br>
        <span>Monday.com has many more awesome features that I would love to add on to Humpday in the future.</span>
        <br></br>
        <span>In the mean time, please enjoy Humpday!</span>
      </div>
      break;
    default:
      return null;
  }
  return (
    <div className="modal-background" onClick={closeModal}>
      <div className="modal-child" onClick={e => e.stopPropagation()}>
        { component }
      </div>
    </div>
  );
}

const mapSTP = state => {
  return {
    modal: state.ui.modal
  };
};

const mapDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapSTP, mapDTP)(Modal);