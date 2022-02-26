export const fetchAccount = accountId => (
    $.ajax({
        method: 'GET',
        url: `/api/accounts/${accountId}`,
    })
)

export const fetchAccountByName = accountName => (
    $.ajax({
        method: 'GET',
        url: `/api/accounts_by_name/${accountName}`,
    })
)
