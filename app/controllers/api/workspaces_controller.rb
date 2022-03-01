class Api::WorkspacesController < ApplicationController
    def create
        @workspace = Workspace.new(workspace_params)
        @workspace.owner = current_user.id
        if @workspace.save
            render :show
        else
            render json: @workspace.errors.full_messages, status: 422
        end
    end

    # def show
    #     @workspace = current_user.workspaces.find_by(id: params[id])
    #     if @workspace
    #         render :show
    #     else
    #         render json: ['Workspace not found'], status: 404
    #     end
    # end

    # def index
    #     @workspaces = current_user.workspaces
    #     render :index
    # end

    def delete
        @target_workspace = current_user.owned_workspaces.find_by(id: params[:id])
        @workspace = current_user.account.workspaces.first
        if @target_workspace && @target_workspace != @workspace
            @target_workspace.destroy
            render :show
        else
            render json: ['You cannot delete this workspace'], status: 422
        end
    end

    private
    def workspace_params
        params.require(:workspace).permit(:workspace_name, :board_ids)
    end
end
