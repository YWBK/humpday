# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

[Account, User, Workspace, WorkspaceMember, Board, BoardMember].each { |obj| obj.destroy_all }

demo_account = Account.create(account_name: 'goat')
demo_user = User.create(
    email: 'rnadal@goat.com',
    full_name: 'Rafael Nadal', 
    password: 'Demo123', 
    account_id: demo_account.id,
    owned_account_id: demo_account.id
)
demo_user_2 = User.create(
    email: 'rfederer@goat.com',
    full_name: 'Roger Federer', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_3 = User.create(
    email: 'ndjokovic@goat.com',
    full_name: 'Novak Djokovic', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_4 = User.create(
    email: 'tbrady@goat.com',
    full_name: 'Tom Brady', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_5 = User.create(
    email: 'twoods@goat.com',
    full_name: 'Tiger Woods', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_6 = User.create(
    email: 'cronaldo@goat.com',
    full_name: 'Cristiano Ronaldo', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_7 = User.create(
    email: 'lmessi@goat.com',
    full_name: 'Lionel Messi', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_8 = User.create(
    email: 'mjordan@goat.com',
    full_name: 'Michael Jordan', 
    password: 'Demo123', 
    account_id: demo_account.id
)
demo_user_9 = User.create(
    email: 'ljames@goat.com',
    full_name: 'LeBron James', 
    password: 'Demo123', 
    account_id: demo_account.id
)

demo_workspace_main = Workspace.create(
    workspace_name: 'Main Workspace',
    workspace_owner_id: demo_user.id,
    account_id: demo_account.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_2.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_3.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_4.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_5.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_6.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_7.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_8.id
)
WorkspaceMember.create(
    workspace_id: demo_workspace_main.id,
    user_id: demo_user_9.id
)

demo_workspace = Workspace.create(
    workspace_name: 'Demo Workspace',
    workspace_owner_id: demo_user.id,
    account_id: demo_account.id
)

WorkspaceMember.create(
    workspace_id: demo_workspace.id,
    user_id: demo_user.id
)

demo_board = Board.create(
    board_name: 'Start from scratch',
    board_owner_id: demo_user.id,
    workspace_id: demo_workspace_main.id
)

BoardMember.create(
    board_id: demo_board.id,
    user_id: demo_user.id
)
BoardMember.create(
    board_id: demo_board.id,
    user_id: demo_user_2.id
)
BoardMember.create(
    board_id: demo_board.id,
    user_id: demo_user_3.id
)
BoardMember.create(
    board_id: demo_board.id,
    user_id: demo_user_6.id
)
BoardMember.create(
    board_id: demo_board.id,
    user_id: demo_user_7.id
)

demo_column_1 = Column.create(
    board_id: demo_board.id
)
demo_column_2 = Column.create(
    column_name: 'Person',
    column_type: 'person',
    board_id: demo_board.id
)
demo_column_3 = Column.create(
    column_name: 'Status',
    column_type: 'status',
    board_id: demo_board.id
)
demo_column_4 = Column.create(
    column_name: 'Date',
    column_type: 'date',
    board_id: demo_board.id
)

demo_group_1 = Group.create(
    group_name: 'Group Title',
    group_color: 'blue',
    board_id: demo_board.id
)
demo_group_2 = Group.create(
    group_name: 'Group Title',
    group_color: 'purple',
    board_id: demo_board.id
)

demo_item_1 = Item.create(
    item_name: 'Item 1',
    group_id: demo_group_1.id
)

demo_group_1.columns.each do |col| 
    case col.column_type
    when 'person'
        ItemPerson.create(
            item_id: demo_item_1.id,
            column_id: col.id,
            user_id: demo_user.id
        )
    when 'status'
        Status.create(
            item_id: demo_item_1.id,
            column_id: col.id,
            status: 'Working on it'
        )
    when 'date'
        DueDate.create(
            item_id: demo_item_1.id,
            column_id: col.id,
            date: col.created_at + 2.days
        )
    end
end