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
export const login = (user, accountId) => (
    $.ajax({
        method: 'POST',
        url: '/api/session',
        data: {
            user: user,
            account: accountId
        }
    })
)
export const logout = () => (
    $.ajax({
        method: 'DELETE',
        url: '/api/session'
    })
)

