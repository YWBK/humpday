class User < ApplicationRecord
    validates :email, :full_name, :password_digest, :session_token, presence: true
    validates :session_token, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :email, 
        uniqueness: { scope: :account_id, case_sensitive: false }, 
        format: { with: /\A[^\s@]+@[^\s@]+\.[^\s@]+\z/ },
        length: { minimum: 4, maximum: 254 }
    attr_reader :password
    after_initialize :ensure_session_token

    belongs_to :account,
    foreign_key: :account_id,
    class_name: 'Account'

    has_many :owned_workspaces,
    foreign_key: :workspace_owner_id,
    class_name: 'Workspace'

    has_many :workspace_members,
    foreign_key: :user_id,
    class_name: 'WorkspaceMember'

    has_many :workspaces,
    through: :workspace_members

    has_many :owned_boards,
    foreign_key: :board_owner_id,
    class_name: 'Board'

    has_many :board_members,
    foreign_key: :user_id,
    class_name: 'BoardMember'

    has_many :boards,
    through: :board_members

    has_many :assigned_items,
    foreign_key: :user_id,
    class_name: 'ItemPerson'

    has_many :item_people,
    through: :boards

    has_many :statuses,
    through: :boards
    
    has_many :due_dates,
    through: :boards

    
    def self.find_by_credentials(account_id, email, password)
        user = User.find_by(account_id: account_id, email: email)
        user && user.is_password?(password) ? user : nil
    end

    def self.generate_session_token
        SecureRandom::urlsafe_base64
    end

    def is_password?(password)
        BCrypt::Password.new(self.password_digest).is_password?(password)
    end

    def password=(password)
        @password = password
        self.password_digest = BCrypt::Password.create(password)
    end

    def reset_session_token!
        self.session_token = self.class.generate_session_token
        # debugger
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end
