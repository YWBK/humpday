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

    def show
        @board = current_user.boards.find_by(id: params[:id])
        # debugger
        if @board
            render :show
        else
            render json: ['Board not found'], status: 404
        end
    end
    def index
        @boards = current_user.boards
        render :index
    end

    def update
        @board = current_user.boards.find_by(id: params[:id])
        if @board.update(board_params)
             render :show
        else
            render json: @board.errors.full_messages, status: 422
        end
    end

    def destroy
        @board = current_user.owned_boards.find_by(id: params[])
        @workspace = Workspace.find_by(id: @board.workspace_id)
        if @board
            @board.destroy
            render 'api/workspaces/show'
        else
            render json: ['You cannot delete this board'], status: 422
        end
    end


    private
    def board_params
        params.require(:board).permit(:board_name, :workspace_id, :board_owner_id)
    end
end
