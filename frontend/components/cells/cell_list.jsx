import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatusItem from './status_item';
import ItemPersonItem from './item_person_item';
import DueDateItem from './due_date_item';
// import StatusItem from './status_item';


class CellList extends React.Component {
    render() {
        const { col, item, currentBoard, itemPeople, statuses, dueDates, updateStatus, updateItemPerson, updateDueDate } = this.props;
        let content;
        let statusClass;
        switch(col.columnType) {
            case 'person':
                if (!itemPeople) break;
                const filteredItemPpl = itemPeople.filter(itemPerson => itemPerson.itemId === item.id && itemPerson.columnId === col.id);
                const boardMembers = currentBoard.members;
                content = <ul className='item-people'>
                    {filteredItemPpl.map(filteredItemPerson => (
                        <ItemPersonItem key={filteredItemPerson.id} itemPerson={filteredItemPerson} boardMembers={boardMembers} updateItemPerson={updateItemPerson} />
                    ))}
                </ul>
                break;
            case 'status':
                if (!statuses) break;
                const filteredStatuses = statuses.filter(status =>  status.itemId === item.id && status.columnId === col.id);
                // debugger
                switch (filteredStatuses[0].status) {
                    case 'Working on it':
                        statusClass = 'working';
                        break;
                    case 'Stuck':
                        statusClass = 'stuck';
                        break;
                    case 'Done':
                        statusClass = 'done';
                        break;
                    case '-':
                        statusClass = 'none';
                        break;
                }
                content = <ul className='status'>
                    {filteredStatuses.map(filteredStatus => (
                        <StatusItem key={filteredStatus.id} status={filteredStatus} updateStatus={updateStatus} />
                    ))}
                </ul>
                break;
            case 'date':
                if (!dueDates) break;
                const filteredDates = dueDates.filter(dueDate => dueDate.itemId === item.id && dueDate.columnId === col.id)
                // debugger
                content = <DueDateItem key={filteredDates[0].id} dueDate={filteredDates[0]} updateDueDate={updateDueDate} />
                break;            
            default:
                return null;
        }
        return (<div className={`item-cell ${statusClass}`}>{content}</div>);
    }
}

export default CellList;