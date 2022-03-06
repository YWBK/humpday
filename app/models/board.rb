class Board < ApplicationRecord
    PERMISSIONS = [1, 2, 3, 4]
    validates :board_name, :workspace_id, :board_owner_id, presence: true
    validates :board_permissions, inclusion: { in: PERMISSIONS }

    belongs_to :workspace,
    foreign_key: :workspace_id,
    class_name: 'Workspace'

    belongs_to :owner, 
    foreign_key: :board_owner_id,
    class_name: 'User'

    has_many :board_members,
    foreign_key: :board_id,
    class_name: 'BoardMember',
    dependent: :destroy

    has_many :users,
    through: :board_members

    has_many :columns,
    foreign_key: :board_id,
    class_name: 'Column',
    dependent: :destroy

    has_many :groups,
    foreign_key: :board_id,
    class_name: 'Group',
    dependent: :destroy
end
    