import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import { LinkCard } from '../components/LinkCard'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const DetailPage = () => {
    const [link, setLink] = useState(null)
    const linkId = useParams().id
    const {token} = useContext(AuthContext)
    const {request, loading} = useHttp()

    const getLink = async () => {
        try {
            const fetchedLink = await request(
                `/api/link/${linkId}`,
                'GET',
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            setLink(fetchedLink)
        } catch (e) {
            
        }
    }

    useEffect(() => {
        getLink()
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
}