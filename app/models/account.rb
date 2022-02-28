class Account < ApplicationRecord
    validates :acocunt_name, presence: true, uniqueness: true

    has_many :users,
    foreign_key: :account_id,
    class_name: 'User'

    has_many :workspaces,
    foreign_key: :account_id,
    class_name: 'Workspace'
end
