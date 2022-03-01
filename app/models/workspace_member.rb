class WorkspaceMember < ApplicationRecord
    validates :workspace_id, :user_id, presence: true
    validates :user_id, uniqueness: { scope: :workspace_id, 
        message: 'user is already a workspace member' } 

    belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: 'Workspace'

    belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'
end
