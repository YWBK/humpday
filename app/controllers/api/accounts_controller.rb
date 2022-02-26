class Api::AccountsController < ApplicationController
    def show
        # debugger
        @account = Account.find_by(account_name: params[:account_name])
        # debugger
        if @account
            render :show
        else
            render json: ['Account not found'], status: 404
        end
    end

    private
    def account_params
        params.permit(:account_name)
    end
end
