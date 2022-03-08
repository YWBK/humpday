class ItemPerson < ApplicationRecord
    belongs_to :item
    belongs_to :column

    belongs_to :person,
    foreign_key: :user_id,
    class_name: 'User'
    # optional: true

    has_one :group,
    through: :item
end
