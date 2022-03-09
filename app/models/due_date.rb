class DueDate < ApplicationRecord
    belongs_to :item
    belongs_to :column

    has_one :group,
    through: :item

    has_one :board,
    through: :column
end
