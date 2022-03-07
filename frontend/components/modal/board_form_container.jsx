import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom'
import { CLEAR_SESSION_ERRORS } from '../../actions/session_actions'
import { fetchWorkspaces } from '../../actions/workspace_actions';
import { addBoard } from '../../actions/board_actions';
import { closeModal } from '../../actions/modal_actions';
import MainForm from './main_form';

const mapSTP = ({ entities, session, errors }) => {
    const currentAccount = entities.accounts[session.currentAccountId];
    return({
        errors: errors,
        formType: 'board',
        currentUserId: session.currentUserId,
        currentAccountId: session.currentAccountId,
        currentAccountName: currentAccount.accountName,
        // currentAccountName: currentAccount.account_name ? 
        //     currentAccount.account_name : currentAccount.accountName,
        currentWorkspaceId: session.currentWorkspaceId
    })
}

const mapDTP = dispatch => {
    return({
        // fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        processForm: board => dispatch(addBoard(board)),
        fetchWorkspaces: () => dispatch(fetchWorkspaces()),
        closeModal: () => {
            dispatch({
                type: CLEAR_SESSION_ERRORS,
            });
            dispatch(closeModal());
        }
    })
}

export default withRouter(connect(mapSTP, mapDTP)(MainForm));