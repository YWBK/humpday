class Api::DueDatesController < ApplicationController
    def update
        @due_date = current_user.due_dates.find_by(id: params[:id])
        if @due_date.update(due_date_params)
            @board = @due_date.board
            render 'api/boards/show'
        else
            render json: @due_date.errors.full_messages, status: 422
        end
    end

    private
    def due_date_params
        params.require(:due_date).permit(:date, :column_id, :item_id)
    end
end
