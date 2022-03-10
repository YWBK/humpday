class Api::ColumnsController < ApplicationController
    def create
        @column = Column.new(column_params)
        if @column.save
            @column.items.each do |item|
                case @column.column_type
                when 'person'
                    ItemPerson.create(
                        item_id: item.id,
                        column_id: @column.id
                    )
                when 'status'
                    Status.create(
                        item_id: item.id,
                        column_id: @column.id,
                        status: '-'
                    )
                when 'date'
                    DueDate.create(
                        item_id: item.id,
                        column_id: @column.id,
                        date: DateTime.now
                    )
                end
            end    
            @board = Board.find_by(id: column_params[:board_id])
            render 'api/boards/show'
        else
            render json: @column.errors.full_messages, status: 422
        end
    end

    def destroy
        @column = Column.find_by(id: params[:id])
        if @column
            @board = Board.find_by(id: @column.board_id)
            @column.destroy
            render 'api/boards/show'
        else
            render json: ['You cannot delete this column'], status: 422
        end
    end

    private
    def column_params
        params.require(:column).permit(:column_name, :column_type, :board_id)
    end
end
