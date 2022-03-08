class Group < ApplicationRecord
    COLORS = %w(blue purple magenta orange fuschia 
        turqoise skyblue blush teal yellow green)
    
    validates :group_name, :group_color, presence: true
    validates :group_color, inclusion: { in: COLORS }

    belongs_to :board,
    foreign_key: :board_id,
    class_name: 'Board'

    has_many :items,
    foreign_key: :group_id,
    class_name: 'Item',
    dependent: :destroy

    has_many :columns,
    through: :board
end
