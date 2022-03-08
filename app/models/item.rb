class Item < ApplicationRecord
    validates :item_name, presence: true

    belongs_to :group,
    foreign_key: :group_id,
    class_name: 'Group'

    has_one :board,
    through: :group

    has_many :columns,
    through: :board

    has_many :item_people, dependent: :destroy
    has_many :statuses, dependent: :destroy
    has_many :due_dates, dependent: :destroy
end
