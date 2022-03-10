class Api::UsersController < ApplicationController
    def create
        @user = User.new(user_params)
        
        # at signup, find Account by name and if none found, make new Account with that name
        @account = Account.find_by(account_name: account_params[:account_name])
        unless @account 
            # if a new Account is made, then the new user also owns the Account
            @account = Account.new(account_params)
            @workspace = Workspace.new(workspace_name: 'Main Workspace')
            @board = Board.new(board_name: 'Start from scratch')
            if @account.save
                @user.owned_account_id = @account.id
                @workspace.account_id = @account.id
            else
                render json: @account.errors.full_messages, status: 422
            end
        end
        # once Account is found or created, the User can reference the account_id
        @user.account_id = @account.id
        if @user.save
            if @workspace
                @workspace.workspace_owner_id = @user.id
                @workspace.save
                WorkspaceMember.create(workspace_id: @workspace.id, user_id: @user.id)

                @board.board_owner_id = @user.id
                @board.workspace_id = @workspace.id
                @board.save
                BoardMember.create(board_id: @board.id, user_id: @user.id)

                ['Item', 'Person', 'Status', 'Date'].each do |col|
                    @column = Column.create(
                        column_name: col, 
                        column_type: col.downcase, 
                        board_id: @board.id)
                end
                ['blue', 'purple'].each do |color|
                    @group = Group.create(
                        group_name: 'Group Title',
                        group_color: color,
                        board_id: @board.id)
                end

                # @workspace.board_ids.push(@board.id)
                # @workspace.save
            else
                @workspace = @account.workspaces[0]
                WorkspaceMember.create(workspace_id: @workspace.id, user_id: @user.id)

                @board = @workspace.boards[0]
                BoardMember.create(board_id: @board.id, user_id: @user.id)
            end
            login!(@user)
            render :show
        else
            @account.destroy if @workspace
            render json: @user.errors.full_messages, status: 422
        end
    end

    def index
        account = Account.find_by(id: current_user.account_id)
        @users = account.users
        render :index
    end

    def show
        @user = User.find_by(id: params[:id])
        render :show
    end

    def show_by_email
        @user = User.find_by(email: user_params[:email])
        if @user
            render :show
        else
            render json: ["We couldn't find this email."], status: 404
        end
    end

    private
    def user_params
        params.require(:user).permit(:email, :full_name, :password)
    end

    def account_params
        params.require(:account).permit(:account_name)
    end
end
