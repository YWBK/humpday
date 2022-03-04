# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

demo_account = Account.create(account_name: 'demo')
demo_user = User.create(
    email: 'user@demo.com',
    full_name: 'demo user', 
    password: 'Demo123', 
    account_id: demo_account.id,
    owned_account_id: demo_account.id
)
demo_user_2 = User.create(
    email: 'johndoe@demo.com',
    full_name: 'John Doe', 
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