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

json.items do
    board.items.each do |item|
        json.set! item.id do
            json.extract! item, :id, :item_name, :group_id
        end
    end
end

json.itemPeople do
    board.item_people.each do |item_person|
        # debugger
        json.set! item_person.id do
            json.extract! item_person, :id, :item_id, :column_id, :user_id
            json.groupId item_person.group.id
        end
    end
end

json.statuses do
    board.statuses.each do |status|
        json.set! status.id do
            json.extract! status, :id, :item_id, :column_id, :status
            json.groupId status.group.id
        end
    end
end

json.dueDates do
    board.due_dates.each do |due_date|
        json.set! due_date.id do
            json.extract! due_date, :id, :item_id, :column_id, :date
            json.groupId due_date.group.id
        end
    end
end


# debugger