class Api::GroupsController < ApplicationController
    def create
        @group = Group.new(group_params)
        @group.group_color = Group::COLORS.sample
        if @group.save
            @board = Board.find_by(id: group_params[:board_id])
            render 'api/boards/show'
        else
            render json: @board.errors.full_messages, status: 422
        end
    end

    private
    def group_params
        params.require(:group).permit(:group_name, :board_id)
    end
end
