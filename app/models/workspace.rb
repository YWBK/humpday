class Workspace < ApplicationRecord
    belongs_to :account,
    foreign_key: :account_id,
    class_name: 'Workspace'

    belongs_to :owner,
    foreign_key: :workspace_owner_id,
    class_name: 'User'
end
