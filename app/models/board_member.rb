class BoardMember < ApplicationRecord
    validates :board_id, :user_id, presence: true
    validates :user_id, uniqueness: { scope: :board_id, 
        message: 'user is already a board member' } 

    belongs_to :board,
    foreign_key: :board_id,
    class_name: 'Board'

    belongs_to :user,
    foreign_key: :user_id,
    class_name: 'User'
end
