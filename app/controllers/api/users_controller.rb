class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        
        # at signup, find Account by name and if none found, make new Account with that name
        @account = Account.find_by(account_name: account_params[:account_name])
        unless @account 
            # if a new Account is made, then the new user also owns the Account
            @account = Account.new(account_params)
            if @account.save
                # debugger
                @user.owned_account_id = @account.id
                # debugger
            else
                render json: @account.errors.full_messages, status: 422
            end
        end
        # once Account is found or created, the User can reference the account_id
        # debugger
        @user.account_id = @account.id
        # debugger
        if @user.save
            # debugger
            login!(@user)
            render :show
        else
            @account.destroy
            render json: @user.errors.full_messages, status: 422
        end
    end

    # def find_user_by_email
    #     # debugger
    #     @user = User.find_by(email: user_params[:email])
    #     # debugger
    #     if @user
    #         # render json: {}, status: 200
    #     else
    #         render json: @user.errors.full_messages, status: 422
    #     end
    # end

    private
    def user_params
        params.require(:user).permit(:email, :full_name, :password)
    end

    def account_params
        params.require(:account).permit(:account_name)
    end
end
