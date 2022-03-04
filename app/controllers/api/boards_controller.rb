class Api::BoardsController < ApplicationController
    def create
        @board = Board.new(board_params)
        @board.board_owner_id = current_user.id
        # @board.workspace_id = board_params[:workspace_id]
        # debugger
        if @board.save
            # debugger
            BoardMember.create(board_id: @board.id, user_id: @board.board_owner_id)
            @workspace = Workspace.find_by(id: board_params[:workspace_id])
            # @workspace.board_ids.push(@board.id)
            # @workspace.save

            render :show
        else
            render json: @board.errors.full_messages, status: 422
        end
    end

    def index
        @boards = Workspace.find_by(id: board_params[:workspace_id]).boards
        render :index
    end

    private
    def board_params
        params.require(:board).permit(:board_name, :workspace_id, :board_owner_id)
    end
end
