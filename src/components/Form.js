import React, {useState, useContext} from "react";
import {AlertContext} from "../context/alert/alertContext";
import {FirebaseContext} from "../context/firebase/firebaseContext";

export const Form = () => {
    const [value, setValue]  = useState('')
    const alert = useContext(AlertContext)
    const firebase = useContext(FirebaseContext)

    const submitHendler = event => {
        event.preventDefault()

        if (value.trim()) {
            firebase.addNote(value.trim())
                .then(() => {
                    alert.show(" Заметка була создана", 'success')
                    setTimeout(() => {
                        alert.hide(" Заметка була создана", 'success')
                    }, 3000)
                })
                .catch(() => {
                    alert.show(" Что-то пошло не так!", 'danger')
                    setTimeout(() => {
                        alert.hide(" Что-то пошло не так!", 'danger')
                    }, 3000)
                })
            setValue('')
        } else {
            alert.show(" Введите название заметки")
            setTimeout(() => {
                alert.hide(" Введите название заметки")
            }, 4000)
        }


    }

    return(
        <form onSubmit={submitHendler}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Введите название заметки..."
                    value={value}
                    onChange={e => setValue(e.target.value)}
                />
            </div>
        </form>
    )
}