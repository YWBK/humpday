class Column < ApplicationRecord
    belongs_to :board,
    foreign_key: :board_id,
    class_name: 'Board'
end
