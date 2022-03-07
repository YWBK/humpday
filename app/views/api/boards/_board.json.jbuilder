json.extract! board, :id, :board_name, :owner, :users, :workspace, :groups
# :columns, :groups

json.columns do
    board.columns.each do |column|
        json.set! column.id do
            json.extract! column, :id, :column_name, :column_type
        end
    end
end