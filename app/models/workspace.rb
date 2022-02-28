class Workspace < ApplicationRecord
    belongs_to :account,
    foreign_key: :account_id,
    class_name: 'Account'

    belongs_to :owner,
    foreign_key: :workspace_owner_id,
    class_name: 'User'

    has_many :workspace_members,
    foreign_key: :workspace_id,
    class_name: 'WorkspaceMember'

    has_many :users,
    through: :workspace_members
end
