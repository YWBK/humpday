json.extract! board, :id, :board_name, :owner

json.workspace do 
    json.extract! board.workspace, :id, :workspace_name, :workspace_owner_id, :board_ids
end

json.columns do
    board.columns.each do |column|
        json.set! column.id do
            json.extract! column, :id, :column_name, :column_type
        end
    end
end

json.groups do
    board.groups.each do |group|
        json.set! group.id do
            json.extract! group, :id, :group_name, :group_color, :item_ids
        end
    end
end