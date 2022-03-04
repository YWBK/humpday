class Board < ApplicationRecord
    belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: 'Workspace'

    belongs_to :owner, 
    foreign_key: :board_owner_id,
    class_name: 'User'

    has_many :board_members,
    foreign_key: :board_id,
    class_name: 'BoardMember'

    has_many :users,
    through: :board_members
end
    