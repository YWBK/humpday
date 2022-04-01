class Api::ItemsController < ApplicationController
    def create
        @item = Item.create(item_params)
        if @item.save
            @item.columns.each do |col| 
                case col.column_type
                when 'person'
                    ItemPerson.create(
                        item_id: @item.id,
                        column_id: col.id
                    )
                when 'status'
                    Status.create(
                        item_id: @item.id,
                        column_id: col.id,
                        status: '-'
                    )
                when 'date'
                    DueDate.create(
                        item_id: @item.id,
                        column_id: col.id,
                        date: DateTime.now
                    )
                end
            end

            @board = @item.board
            render 'api/boards/show'
        else
            render json: @item.errors.full_messages, status: 422
        end
    end

    def update
        @item = Item.find_by(id: params[:id])
        if @item.update(item_params)
            @group = Group.find_by(id: item_params[:group_id])
            @board = Board.find_by(id: @group.board_id)
            render 'api/boards/show'
        else
            render json: @group.errors.full_messages, status: 422
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
