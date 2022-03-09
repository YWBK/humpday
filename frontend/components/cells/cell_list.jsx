import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import CellListItem from './cell_list_item';

class CellList extends React.Component {
    render() {
        const { col, currentAccountUsers, itemPeople, statuses, dueDates } = this.props;
        let content;
        switch(col.columnType) {
            case 'person':
                if (!itemPeople) break;
                const filteredItemPpl = itemPeople.filter(itemPerson => itemPerson.columnId === col.id);
                // debugger
                content = <ul className='item-people'>
                    {filteredItemPpl.map(filteredItemPerson => (
                        <li key={filteredItemPerson.id}>
                            {!filteredItemPerson.userId ? null : currentAccountUsers[filteredItemPerson.userId].fullName}
                        </li>
                    ))}
                </ul>
                break;
            case 'status':
                if (!statuses) break;
                const filteredStatuses = statuses.filter(status =>  status.columnId === col.id);
                content = <ul className='status'>
                    {filteredStatuses.map(filteredStatus => (
                        <CellListItem key={filteredStatus.id} cellType={'status'} status={filteredStatus} />
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