import React, { useState, useEffect, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useHttp } from '../hooks/http.hook'

export const CreateUserPage = () => {
    const [link, setLink] = useState('')
    const { request } = useHttp()
    const auth = useContext(AuthContext)

    useEffect(() => {
        window.M.updateTextFields()                  //Просто делает текстовые инпуты активными (materialize)
    }, [])

    const pressHandler = async (event) => {
        if (event.key === 'Enter') {
            try {
                const data = await request(
                    '/api/link/generate',
                    'POST',
                    { from: link },
                    {Authorization: `Bearer ${auth.token}`}
                )
                console.log(data)
            } catch (error) {

            }
        }
    }

    return (
        <div className="row">
            <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
                <div className="input-field">
                    <input
                        placeholder="Вставьте ссылку"
                        id="link"
                        type="text"
                        value={link}
                        onChange={(e) => setLink(e.target.value)}
                        onKeyPress={pressHandler}                          // Срабатывает при нажатии enter
                    />
                    <label htmlFor="link">Вставьте ссылку</label>
                </div>
            </div>
        </div>
    )
}