import React, { useState } from 'react';
import { useUser } from '../lib/hooks';
import { IoMdSend, IoMdClose, IoMdMailOpen } from 'react-icons/io'; 

export default function afterLogin() {
    const [errorMsg, setErrorMsg] = useState("");
    const [user] = useUser();
    const [Loader, updateLoad] = useState(false);
    const [msgAck, setMsgAck] = useState(false);
    const [showMessageForm, setShowMessageForm] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        updateLoad(true);
        const body = {
            message: e.currentTarget.message.value,
            name: user.name
        };
        const res = await fetch("/api/message", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        });
        if (res.status === 201) {
            setMsgAck(true);
            setTimeout(() => setMsgAck(false), 2500)
        } else {
            setErrorMsg(await res.text());
        }
        updateLoad(false);
        var msgForm = document.getElementById("msgForm");
        msgForm.reset();
        setShowMessageForm(false); 

    };

    const renderButtonsForRole = (role) => {
        switch (role) {
            case 'admin':
                return (
                    <>
                        <button className="btn btn-primary btn-lg me-2">Add Users</button>
                        <button className="btn btn-secondary btn-lg">View Users List</button>
                    </>
                );
            case 'medic':
                return (
                    <>
                        <button className="btn btn-primary btn-lg me-2">Add Patient</button>
                        <button className="btn btn-secondary btn-lg">Scan Patient</button>
                    </>
                );
            case 'doctor':
                return (
                    <>
                        <button className="btn btn-primary btn-lg me-2">Scan Patient</button>
                        <button className="btn btn-secondary btn-lg">Search</button>
                    </>
                );
            default:
                return null;
        }
    };

    return (
        <>
            <div className="row">
                <div className="col-sm-12">
                    <div className="card-text">
                        Bienvenue {user ? user.name : 'Stranger'}
                    </div>
                </div>
                
                <div className="col-sm-12 my-3">
                    {user && renderButtonsForRole(user.role)}
                </div>
                {!showMessageForm && (
                    <div className="col-sm-12 my-3">
                        <button className="btn btn-info btn-sm" onClick={() => setShowMessageForm(true)}>Send a Message <IoMdMailOpen /></button>
                    </div>
                )}
                {showMessageForm && (
                    <div className="col-sm-12 my-3">
                        <div className="card">
                            <div className="card-body">
                                <div className="d-flex justify-content-between align-items-center mb-3">
                                    <h5 className="card-title">Send a Message</h5>
                                    <button className="btn" onClick={() => setShowMessageForm(false)}><IoMdClose /></button> 
                                </div>
                                <div className="card-form">
                                    <div className='err-msg text-danger'> {errorMsg && <p>{errorMsg}</p>}</div>
                                    {msgAck && <div className="alert alert-success" role="alert">
                                        Message Sent
                                    </div>}
                                    <form onSubmit={handleSubmit} id="msgForm">
                                        <div className="form-floating mb-3">
                                            <textarea className="form-control" placeholder="Leave a comment here" id="message" name="message"></textarea>
                                            <label htmlFor="floatingTextarea">Message</label>
                                        </div>
                                        <button type='submit' className='btn btn-primary btn-sm'>{Loader ? <div className="spinner-border" role="status" style={{ width: '1.5rem', height: '1.5rem' }}>
                                            <span className="visually-hidden">Loading...</span>
                                        </div> : <>Send <IoMdSend /></>}</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}