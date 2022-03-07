class Api::GroupsController < ApplicationController
    def create
        @group = Group.new(group_params)
        if @group.save
            @board = Board.find_by(id: board_params[:group_id])
            render 'api/boards/show'
        else
            render json: @board.errors.full_messages, status: 422
        end
    end

    private
    def group_params
        params.require(:group).permit(:group_name, :group_color, :board_id)
    end
end
