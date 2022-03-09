class Api::StatusesController < ApplicationController
    def update
        @status = current_user.statuses.find_by(id: params[:id])
        if @status.update(status_params)
            @board = @status.board
            render 'api/boards/show'
        else
            render json: @status.errors.full_messages, status: 422
        end
    end

    private
    def status_params
        params.require(:status).permit(:status, :column_id, :item_id)
    end
end
