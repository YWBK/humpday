class Api::WorkspacesController < ApplicationController
    def create
        @workspace = Workspace.new(workspace_params)
        @workspace.workspace_owner_id = current_user.id
        @workspace.account_id = current_user.account_id
        if @workspace.save
            WorkspaceMember.create(workspace_id: @workspace.id, user_id: @workspace.workspace_owner_id)
            render :show
        else
            render json: @workspace.errors.full_messages, status: 422
        end
    end

    
    def index
        @workspaces = current_user.workspaces
        render :index
    end

    def show
        @workspace = current_user.workspaces.find_by(id: params[:id])
        if @workspace
            render :show
        else
            render json: ['Workspace not found'], status: 404
        end
    end

    def update
        @workspace = current_user.owned_workspaces.find_by(id: params[:id])
        @main_workspace = current_user.account.workspaces.first
        if @workspace == @main_workspace
            render :show
        elsif @workspace.update(workspace_params) && (@workspace != @main_workspace)
             render :show
        else
            render json: @workspace.errors.full_messages, status: 422
        end
    end

    def destroy
        @target_workspace = current_user.owned_workspaces.find_by(id: params[:id])
        @workspace = current_user.account.workspaces.first
        if @target_workspace && (@target_workspace != @workspace)
            @target_workspace.destroy
            render :show
        else
            render json: ['You cannot delete this workspace'], status: 422
        end
    end

    private
    def workspace_params
        params.require(:workspace).permit(:workspace_name, :board_ids, selected: [])
    end
end
