json.extract! user, :id, :email, :full_name, :account_id, :owned_account_id, :owned_workspaces, :workspaces

json.account do
    json.extract! user.account, :id, :account_name
end