export const signup = (user, accountName) => (
    $.ajax({
        method: 'POST',
        url: '/api/users',
        data: { 
            user: user,
            account: accountName
        }
    })
)

export const findUserByEmail = (email) => (
    $.ajax({
        method: 'GET',
        url: '/api/users/find_user_by_email'
    })
)

export const login = (user, accountName) => (
    $.ajax({
        method: 'POST',
        url: '/api/session',
        data: {
            user: user,
            account: accountName
        }
    })
)

export const logout = () => (
    $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
)
        
        