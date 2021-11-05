import { useState } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { SET_SORT_EMAIL, SET_SORT_GENDER, SET_SORT_NAME, SET_SORT_REGISTERED, SET_SORT_USERNAME } from "../../../../../../store/actions/userAction"
import Loading from "../../../../components/loading/Loading"

import './TableComponent.scss'

const TableComponent = props => {
    const {
        loading
    } = props

    const dispatch = useDispatch()
    const USER = useSelector(state => state.user)
    const { filtered } = USER

    const [active, setActive] = useState(0)

    const onClickSort = (type, index) => {
        setActive(index +1)
        dispatch({ type: type })
    }

    const header = [
        { title: 'Username', type: SET_SORT_USERNAME },
        { title: 'Name', type: SET_SORT_NAME },
        { title: 'Email', type: SET_SORT_EMAIL },
        { title: 'Gender', type: SET_SORT_GENDER },
        { title: 'Registered Date', type: SET_SORT_REGISTERED }
    ]

    return(
        <div className='w-100 p-1 card'>
            <table className='table table-hover'>
                <thead>
                    <tr>
                    {header.length > 0
                        &&  header
                            .map((head, index) => {
                            return(
                            <th 
                                key={index}
                                scope="col"
                            >
                                <div>
                                    {head.title}
                                    <button
                                        className={`asc-desc ${active === index +1 ? 'active-sort': ''}`}
                                        onClick={() => onClickSort(head.type, index)}
                                    >asc</button>
                                </div>
                            </th>
                            )})
                    }
                    </tr>
                </thead>
                <tbody>
                    {!loading 
                        ?   filtered.length > 0
                            &&  filtered
                                .map((list, index) => {
                                return(
                                    <tr key={index}>
                                        <td>{list?.login?.username || ''}</td>
                                        <td>{list?.name?.first + ' ' + list?.name?.last}</td>
                                        <td>{list?.email || ''}</td>
                                        <td>{list?.gender || ''}</td>
                                        <td>{new Date(list?.registered?.date).toLocaleString() || ''}</td>
                                    </tr>
                                )})
                        :   <tr><td><Loading /></td></tr>
                    }
                </tbody>
            </table>
        </div>
    )
}
export default TableComponent