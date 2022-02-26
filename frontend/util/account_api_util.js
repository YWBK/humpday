export const fetchAccount = accountName => (
    $.ajax({
        method: 'GET',
        url: `/api/accounts/${accountName}`,
    })
)
