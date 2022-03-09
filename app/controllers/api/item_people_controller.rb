class Api::ItemPeopleController < ApplicationController
    def update
        @item_person = current_user.item_people.find_by(id: params[:id])
        if @item_person.update(item_person_params)
            @board = @item_person.board
            render 'api/boards/show'
        else
            render json: @item_person.errors.full_messages, status: 422
        end
    end

    private
    def item_person_params
        params.require(:item_person).permit(:user_id, :column_id, :item_id)
    end
end
