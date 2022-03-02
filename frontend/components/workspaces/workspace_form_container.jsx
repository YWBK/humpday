import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { CLEAR_SESSION_ERRORS } from '../../actions/session_actions'
import { addWorkspace, fetchWorkspaces } from '../../actions/workspace_actions';
import { openModal, closeModal } from '../../actions/modal_actions';
import WorkspaceForm from './workspace_form';

const mapSTP = ({ entities, session, errors }) => {
    return({
        errors: errors,
        formType: 'login',
        currentUserId: session.currentUserId,
        currentAccountId: session.currentAccountId,
        currentAccountName: entities.accounts[session.currentAccountId].account_name
    })
}

const mapDTP = dispatch => {
    return({
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        processForm: workspace => dispatch(addWorkspace(workspace)),
        closeModal: () => {
            dispatch({
                type: CLEAR_SESSION_ERRORS,
            });
            dispatch(closeModal());
        }
    })
}

export default withRouter(connect(mapSTP, mapDTP)(WorkspaceForm));