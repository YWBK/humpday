class Column < ApplicationRecord
    validates :column_name, :column_type, presence: true
    
    belongs_to :board,
    foreign_key: :board_id,
    class_name: 'Board'

    has_many :item_people, dependent: :destroy
    has_many :statuses, dependent: :destroy
    has_many :due_dates, dependent: :destroy
end
