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

    def destroy
        @item = Item.find_by(id: params[:id])
        if @item
            @item.destroy
            @board = @item.board
            render 'api/boards/show'
        else
            render json: ['Item not found'], status: 404
        end
    end

    private 
    def item_params
        params.require(:item).permit(:item_name, :group_id)
    end
end
