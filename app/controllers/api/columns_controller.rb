class Api::ColumnsController < ApplicationController
    def create
        @column = Column.new(column_params)
        if @column.save
            @board = Board.find_by(id: column_params[:board_id])
            render 'api/boards/show'
        else
            render json: @column.errors.full_messages, status: 422
        end
    end

    private
    def column_params
        params.require(:column).permit(:column_name, :column_type, :board_id)
    end
end
