class Api::AccountsController < ApplicationController
    def show
        @account = Account.find_by(id: params[:id])
        # debugger
        if @account
            render :show
        else
            render json: ['Account not found'], status: 404
        end
    end
    
    def show_by_name
        # debugger
        @account = Account.find_by(account_name: params[:account_name])
        if @account
            render :show
        else
            render json: ['Account not found'], status: 404
        end
    end

    private
    def account_params
        params.permit(:id, :account_name)
    end
end
