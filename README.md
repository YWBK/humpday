## Background

Humpday.com is a clone of Monday.com, a work management software. Users can create or join an organization account. Once signed up users can:
- create, view, rename, or delete workspaces
- create, view, rename, or delete boards within workspaces
- create, view, or delete groups and items within boards
- manage items by setting assigned users, statuses, and due dates

## Let's make every day feel like [humpday](https://humpday.herokuapp.com/#/)!

## Technologies Used

- React-Redux
- Ruby on Rails
- Javascript/HTML/SCSS
- Webpack
- Babel
- Heroku
- Icons from [Font Awesome](https://fontawesome.com/)

## Features

### Create Workspace / Board Modal

At signup, based on the `Account` name given, `User`s will either be added to an existing `Account` or a new `Account` with a template `Workspace` and `Board` will be simulatenously created with the `User` with the `User` as the owner of the `Account`, `Workspace`, and `Board`.

```ruby
def create
    @user = User.new(user_params)
    @account = Account.find_by(account_name: account_params[:account_name])
    unless @account 
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
```


`User`s can create `Workspace`s or `Board`s through the modal and, after creation, are automatically taken to the created `Workspace` or `Board` show page.

```js
handleSubmit(e) {
    e.preventDefault();
    const { currentAccountName, formType, currentWorkspaceId } = this.props
    const k = formType + '_name';
    const newObj = Object.assign({}, {
        [k]: this.state.formName, 
    });
    if (formType === 'board') {
        newObj.workspace_id = currentWorkspaceId;
    }
    const createBoard = async () => {
        const response = await this.props.processForm(newObj);
        const id = response[formType].id
        this.props.formType === 'board' ? await this.props.fetchWorkspaces() : null;
        this.props.history.push({pathname: `/${currentAccountName}/${formType}s/${id}` })
        this.props.closeModal();
    };
    createBoard()
}
```

