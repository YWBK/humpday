class Api::SessionsController < ApplicationController
    before_action :ensure_logged_in, only: [:destroy]
    def create
        @account = Account.find_by(
            account_name: params[:account][:account_name]
        )
        @user = User.find_by_credentials(
            @account.id,
            params[:user][:email],
            params[:user][:password]
        )
        if @user
            # debugger
            login!(@user)
            render "api/users/show"
        else
            render json: ["invalid credentials"], status: 422
        end
    end

    def destroy
        logout!
        render json: {}
    end
end
