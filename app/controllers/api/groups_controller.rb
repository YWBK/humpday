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

    def destroy
        @group = Group.find_by(id: params[:id])
        if @group
            @board = Board.find_by(id: @group.board_id)
            if @board.groups.length == 1
                render json: ['Board has to have at least one group']
            else
                board_id = @group.board_id
                @group.destroy
                @board = Board.find_by(id: board_id)
                render 'api/boards/show'
            end
        else
            render json: ['You cannot delete this column'], status: 422
        end
    end

    private
    def group_params
        params.require(:group).permit(:group_name, :board_id)
    end
end
