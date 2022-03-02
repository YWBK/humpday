import React from 'react';
import { connect } from 'react-redux';
import { CLEAR_SESSION_ERRORS } from '../../actions/session_actions'
import { addWorkspace } from '../../actions/workspace_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import WorkspaceForm from './workspace_form';

const mapSTP = ({ errors }) => {
    return({
        errors: errors,
        formType: 'login'
    })
}

const mapDTP = dispatch => {
    return({
        processForm: workspace => dispatch(addWorkspace(workspace)),
        otherForm: (
            <button onClick={() => dispatch(openModal('workspace'))}>
                Add workspace
            </button> 
        ),
        closeModal: () => {
            dispatch({
                type: CLEAR_SESSION_ERRORS,
            });
            dispatch(closeModal());
        }
    })
}

export default connect(mapSTP, mapDTP)(WorkspaceForm);