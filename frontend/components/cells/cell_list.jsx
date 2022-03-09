import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import StatusItem from './status_item';
import ItemPersonItem from './item_person_item';
// import StatusItem from './status_item';

class CellList extends React.Component {
    render() {
        const { col, currentBoard, itemPeople, statuses, dueDates, updateStatus, updateItemPerson, updateDueDate } = this.props;
        let content;
        switch(col.columnType) {
            case 'person':
                if (!itemPeople) break;
                const filteredItemPpl = itemPeople.filter(itemPerson => itemPerson.columnId === col.id);
                const boardMembers = currentBoard.members;
                content = <ul className='item-people'>
                    {filteredItemPpl.map(filteredItemPerson => (
                        <ItemPersonItem key={filteredItemPerson.id} itemPerson={filteredItemPerson} boardMembers={boardMembers} updateItemPerson={updateItemPerson} />
                    ))}
                </ul>
                break;
            case 'status':
                if (!statuses) break;
                // debugger
                const filteredStatuses = statuses.filter(status =>  status.columnId === col.id);
                content = <ul className='status'>
                    {filteredStatuses.map(filteredStatus => (
                        <StatusItem key={filteredStatus.id} status={filteredStatus} updateStatus={updateStatus} />
                        // <li key={filteredStatus.id}>{filteredStatus.status}</li>
                    ))}
                </ul>
                break;
            case 'date':
                if (!dueDates) break;
                const filteredDates = dueDates.filter(dueDate => dueDate.columnId === col.id)
                content = <ul className='due-date'>
                    {filteredDates.map(filteredDate => (
                        <li key={filteredDate.id}>{filteredDate.date}</li>
                    ))}
                </ul>
                break;            
            default:
                return null;
        }
        return (<div>{content}</div>);
    }
}

export default CellList;