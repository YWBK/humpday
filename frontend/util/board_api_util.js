export const fetchBoard = boardId => (
    $.ajax({
        method: 'GET',
        url: `/api/boards/${boardId}`,
    })
)
export const fetchBoards = () => (
    $.ajax({
        method: 'GET',
        url: `/api/boards`,
    })
)

export const addBoard = board => (
    $.ajax({
        method: 'POST',
        url: '/api/boards',
        data: { board }
    })
)