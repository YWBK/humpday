class Status < ApplicationRecord
    STATUSES = ['Working on it', 'Stuck', 'Done', '']
    validates :status, inclusion: { in: STATUSES }

    belongs_to :item
    belongs_to :column

    has_one :group,
    through: :item
end
