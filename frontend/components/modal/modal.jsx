import React from 'react';
import { closeModal } from '../../actions/modal_actions';
import { connect } from 'react-redux';
import WorkspaceFormContainer from './workspace_form_container';
import BoardForm from './board_form';

function Modal({modal, closeModal, currentUserId, currentAccountId, currentWorkspaceId}) {
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
      component = <BoardForm currentUserId={currentUserId} currentAccountId={currentAccountId} currentWorkspaceId={currentWorkspaceId} />;
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
    modal: state.ui.modal,
    currentUserId: state.session.currentUserId,
    currentAccountId: state.session.currentAccountId,
    currentWorkspaceId: state.session.currentWorkspaceId
  };
};

const mapDTP = dispatch => {
  return {
    closeModal: () => dispatch(closeModal())
  };
};

export default connect(mapSTP, mapDTP)(Modal);