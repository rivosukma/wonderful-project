import { useEffect, useState } from "react"
import { getQString } from "../../../../utils/helpers/common"

import './Pagination.scss'

const Pagination = props => {
    const {
        totalPage,
        currentPage,
        params,
        location
    } = props

    const [disableNext, setNext] = useState(true)
    const [disablePrev, setPrev] = useState(true)

    useEffect(() => {
        if (totalPage) {
            if (currentPage) {
            if (currentPage <= 1) {
                setPrev(true)
            } else {
                setPrev(false)
            }
            if (totalPage === currentPage) {
                setNext(true)
            } else {
                setNext(false)
            }
            } else {
            if (totalPage > 1) {
                setNext(false)
            }else{
                setNext(true)
            }
            setPrev(true)
            }
        }
    }, [props])

    const nextPage = () => {
        let paramsPage = getQString('page')
        let queryString = ""
        if (paramsPage) {
            const intparamsPage = parseInt(paramsPage)
            if (intparamsPage < totalPage) {
                paramsPage = intparamsPage + 1
                params.set('page', paramsPage)
                queryString = "?" + params.toString()
                props.history.push(location.pathname + queryString)
            } else {
                setNext(true)
            }
        } else {
            if (totalPage > 1) {
                params.append('page', 2)
                queryString = "?" + params.toString()
                props.history.push(location.pathname + queryString)
            }
        }
    }

    const prevPage = () => {
        let paramsPage = getQString('page')
        let queryString = ""
        if (paramsPage) {
            const intparamsPage = parseInt(paramsPage)
            if (intparamsPage === 2) {
                params.delete('page')
                queryString = "?" + params.toString()
                props.history.push(props.location.pathname + queryString)
            } else {
                paramsPage = intparamsPage - 1
                params.set('page', paramsPage)
                queryString = "?" + params.toString()
                props.history.push(location.pathname + queryString)
            }
        } else {
            setPrev(true)
        }
    }

    const handleClickPage = (page) => {
        let queryString = ""
        if (params.toString() === "") {
          queryString = "?page=" + page
        } else {
          if (params.get('page')) {
            params.set('page', page)
          } else {
            params.append('page', page)
          }
          queryString = "?" + params.toString()
        }
    
        if (page === 1) {
          props.history.push(location.pathname)
        } else {
          props.history.push(location.pathname + queryString)
        }
      }

    let createPage = [
        { page: 1 },
        { page: 2 },
        { page: 3 },
        { page: 4 },
        { page: 5 }
    ]
    if (totalPage > 5) {
        if (currentPage > 2 && currentPage < totalPage - 1) {
        createPage = [
            { page: currentPage - 2 },
            { page: currentPage - 1 },
            { page: currentPage },
            { page: currentPage + 1 },
            { page: currentPage + 2 }
        ]
        }
        if (currentPage >= totalPage - 1) {
        createPage = [
            { page: totalPage - 4 },
            { page: totalPage - 3 },
            { page: totalPage - 2 },
            { page: totalPage - 1 },
            { page: totalPage }
        ]
        }
    } else {
        createPage = []
        for (let i = 0; i < totalPage; i++) {
        createPage.push({ page: i + 1 })
        }
    }    

    let page = []
    if (createPage !== []) {
        for (let i = 0; i < createPage.length; i++) {
            const id = createPage[i].page
            const active = currentPage == id
                ? 'active'
                : ''
            
            page.push(
                <li 
                    onClick={() => handleClickPage(createPage[i].page)}
                    key={createPage[i].page}
                    className={`greyDefault normalFont ${active}`}
                >
                    <span>{createPage[i].page}</span>
                </li>
            )
        }
    }

    return(
        <div className='pagination-container'>
            {totalPage > 0 
                &&  <div className="d-flex px-4 mt-4">
                        <div className="custom-pagination d-flex">
                            <ul className="d-flex m-0 p-0">
                            {disablePrev 
                                ?   <li className='cursor-default'>
                                        <label 
                                            className='arrow-page-prev cursor-default' 
                                            style={{ opacity: '0.3' }}
                                        ></label>
                                    </li>
                                :   <li onClick={() => prevPage()} className='cursor-pointer'>
                                        <label className='arrow-page-prev cursor-pointer active'></label>
                                    </li>
                            }
                            {page}
                            {disableNext 
                                ?   <li className='cursor-default'>
                                        <label
                                            className='arrow-page-next cursor-default' 
                                            style={{ opacity: '0.3' }}
                                        ></label>
                                    </li> 
                                :   <li onClick={() => nextPage()} className='cursor-pointer'>
                                        <label className='arrow-page-next cursor-pointer active'></label>
                                    </li>
                            }
                            </ul>
                        </div>
                    </div>
            }
        </div>
    )
}
export default Pagination