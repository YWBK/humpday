class Column < ApplicationRecord
    validates :column_name, :column_type, :board_id, presence: true
    
    belongs_to :board,
    foreign_key: :board_id,
    class_name: 'Board'
end
