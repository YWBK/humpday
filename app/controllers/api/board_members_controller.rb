class Api::BoardMembersController < ApplicationController
    def create
        @board_member = BoardMember.create(board_member_params)
        if @board_member.save
            render :show
        else
            render json: @board_member.errors.full_messages, status: 422
        end
    end

    private
    def board_member_params
        params.require(:board_member).permit(:board_id, :user_id)
    end
end
