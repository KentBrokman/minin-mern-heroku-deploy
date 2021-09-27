import React, { useContext, useEffect, useState } from 'react'
import { LinksList } from '../components/LinksList'
import { Loader } from '../components/Loader'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const LinksPage = () => {
    const [links, setLinks] = useState([])
    const {loading, request} = useHttp()
    const {token} = useContext(AuthContext)

    const fetchLinks = async () => {
        try {
            const fetchedLinks = await request(
                '/api/link',
                'GET',
                null,
                {
                    Authorization: `Bearer ${token}`
                }
            )
            setLinks(fetchedLinks)
        } catch (e) {
            
        }
    }

    useEffect(() => {
        fetchLinks()
    }, [])

    if (loading) {
        return (
            <Loader />
        )
    }
    return (
        <>
            {!loading && <LinksList links={links} />}
        </>
    )
}