class Api::WorkspaceMembersController < ApplicationController
    def create
        @workspace_member = WorkspaceMember.create(workspace_member_params)
        if @workspace_member.save
            render :show
        else
            render json: @workspace_member.errors.full_messages, status: 422
        end
    end

    private
    def workspace_member_params
        params.require(:workspace_member).permit(:workspace_id, :user_id)
    end
end
