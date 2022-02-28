class Account < ApplicationRecord
    validates :account_name, presence: true, uniqueness: true

    has_many :users,
    foreign_key: :account_id,
    class_name: 'User',
    dependent: :delete_all

    has_many :workspaces,
    foreign_key: :account_id,
    class_name: 'Workspace',
    dependent: :delete_all
end
