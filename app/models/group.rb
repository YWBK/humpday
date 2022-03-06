class Group < ApplicationRecord
    COLORS = %w(blue purple magenta orange fuschia 
        turqoise skyblue blush teal yellow green)
    
    validates :group_name, :group_color, :board_id, presence: true
    validates :board_color, inclusion: { in: COLORS }

    belongs_to :board,
    foreign_key: :board_id,
    class_name: 'Board'

end
