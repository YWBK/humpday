class User < ApplicationRecord
    validates :email, :account_id, :full_name, :password_digest, :session_token, presence: true
    validates :sesion_token, uniqueness: true
    validates :password, length: { minimum: 6, allow_nil: true }
    validates :email, uniqueness: { scope: :account_id }

    after_validation :ensure_session_token
    attr_reader :password

    def self.find_by_credentials(email, password)
        user = User.find_by(emai: email)
        if user && user.is_password?(password)
            user
        else
            nil
        end
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
        self.save!
        self.session_token
    end

    def ensure_session_token
        self.session_token ||= self.class.generate_session_token
    end
end
