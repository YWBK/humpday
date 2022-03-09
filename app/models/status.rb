class Status < ApplicationRecord
    STATUSES = ['Working on it', 'Stuck', 'Done', '-']
    validates :status, inclusion: { in: STATUSES }

    belongs_to :item
    belongs_to :column

    has_one :group,
    through: :item

    has_one :board,
    through: :column
end
