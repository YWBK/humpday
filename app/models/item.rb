class Item < ApplicationRecord
    validates :item_name, presence: true

    belongs_to :group,
    foreign_key: :group_id,
    class_name: 'Group'

    has_one :board,
    through: :group
end
