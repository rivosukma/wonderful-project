import React, { lazy, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { getUserList } from '../../../../services/user'
import { SET_FILTER_USER_DATA, SET_USER_DATA } from '../../../../store/actions/userAction'
import { getQString } from '../../../../utils/helpers/common'

const Filter = lazy(() => import('../../components/filter/Filter'))
const TableComponent = lazy(() => import('./components/TableComponent/TableComponent'))
const Pagination = lazy(() => import('../../components/pagination/Pagination'))

const Homepage = props => {
    const dispatch = useDispatch()
    const USER = useSelector(state => state.user)
    const { isSearch } = USER
    const params = new URLSearchParams(window.location.search)
    const [loading, setLoading] = useState(false)
    
    const page = getQString('page')
    const results = getQString('results')
    const gender = getQString('gender')

    const include = 'gender, name, registered, email, login'
    const nat = 'us'

    useEffect(async() => {
        setLoading(true)
        const res = await getUserList({
            page: page || 1,
            results: results?.length <= 5 || 5,
            gender: gender,
            inc: include,
            nat: nat
        })
        if(res?.status !== 200 && res?.response?.length > 0) return setLoading(false)
        dispatch({ type: SET_USER_DATA, data: res.response })
        dispatch({ type: SET_FILTER_USER_DATA, data: '' })
        setLoading(false)
    },[page, results, gender])

    return(
        <div className='homepage-container'>
            <Filter
                currentPage={page || 1}
                page={page}
                params={params}
                {...props} />
            <TableComponent 
                loading={loading}
            />
            <Pagination
                totalPage={isSearch || 5}
                currentPage={page || 1}
                params={params}
                {...props}
            />
        </div>
    )
}
export default Homepage