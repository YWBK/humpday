class DueDate < ApplicationRecord
    belongs_to :item
    belongs_to :column

    has_one :group,
    through: :item
end
