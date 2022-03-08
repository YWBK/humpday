class Api::ItemsController < ApplicationController
    def create
        @item = Item.create(item_params)
        if @item.save
            @board = @item.board
            render 'api/boards/show'
        else
            render json: @item.errors.full_messages, status: 422
        end
    end

    private 
    def item_params
        params.require(:item).permit(:item_name, :group_id)
    end
end
