import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { SET_FILTER_USER_DATA, SET_IS_SEARCH } from '../../../../store/actions/userAction'
import { getQString } from '../../../../utils/helpers/common'
import './Filter.scss'

const Filter = props => {
    const {
        currentPage,
        location,
        page,
        params
    } = props

    const dispatch = useDispatch()
    const [searchStr, setSearchStr] = useState('')

    const onGenderSelected = e => {
        let queryString = ''
        if(!e.target.value) return
        if(e.target.value === 'all') {
            params.delete('gender')
        } else {
            params.set('gender', e.target.value)
        }
        queryString = '?' + params
        props.history.push(location.pathname + queryString)
    }

    const onChangeSearch = e => {
        if(e.target.value === '') {
            setSearchStr('')
            dispatch({ type: SET_IS_SEARCH, data: false })
            dispatch({ type: SET_FILTER_USER_DATA, data: '' })
        }
        setSearchStr(e.target.value)
    }
    const onSearchKeyword = () => {
        if(searchStr === '') return
        dispatch({ type: SET_IS_SEARCH, data: true })
        dispatch({ type: SET_FILTER_USER_DATA, data: searchStr })
    }

    const onResetClicked = () => {
        let queryString = ''
        const selectedID = document.getElementById('selected-gender')
        const inputID = document.getElementById('input-search')
        if(selectedID) selectedID.selectedIndex = null
        if(inputID) inputID.value = ''
        if(currentPage > 1) {
            queryString = '?page=' + page
        }
        onChangeSearch({ target: { value: '' } })
        props.history.push(location.pathname + queryString)
    }

    return(
        <div className='filter-container'>
            <div className='search-container'>
                <label>Search</label>
                <div className='search-content'>
                    <input
                        id='input-search'
                        className='form-control search-content-input'
                        type='text'
                        placeholder='Search...'
                        onChange={e => onChangeSearch(e)}
                    />
                    <button
                        className='btn btn-primary'
                        onClick={()=> onSearchKeyword()}
                    >
                        Search
                    </button>
                </div>
            </div>
            <div className='gender-container'>
                <label>Gender</label>
                <select
                    id='selected-gender'
                    className='form-control'
                    defaultValue={getQString('gender') || 'all'}
                    onChange={e => onGenderSelected(e)}
                >
                    <option value='all'>All</option>
                    <option value='male'>Male</option>
                    <option value='female'>Female</option>
                </select>
            </div>
            <div className='reset-container'>
                <label>Reset</label>
                <button
                    className='btn btn-light border'
                    onClick={() => onResetClicked()}
                >Reset Filter</button>
            </div>
        </div>
    )
}
export default Filter