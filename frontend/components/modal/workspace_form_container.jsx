import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { CLEAR_SESSION_ERRORS } from '../../actions/session_actions'
import { addWorkspace, fetchWorkspaces } from '../../actions/workspace_actions';
import { closeModal } from '../../actions/modal_actions';
import MainForm from './main_form';

const mapSTP = ({ entities, session, errors }) => {
    const currentAccount = entities.accounts[session.currentAccountId];
    return({
        errors: errors,
        formType: 'workspace',
        currentUserId: session.currentUserId,
        currentAccountId: session.currentAccountId,
        currentAccountName: currentAccount.account_name ? currentAccount.account_name : currentAccount.accountName
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

export default withRouter(connect(mapSTP, mapDTP)(MainForm));