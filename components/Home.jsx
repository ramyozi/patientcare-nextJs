import Link from 'next/link';
import { useUser } from '../lib/hooks';
import AfterLogin from '../components/AfterLogin';
import { useState } from 'react';

export default function Home() {
    const [user, { mutate }] = useUser();
    const [loading, isLoading] = useState(false);
    const handleLogout = async () => {
        isLoading(true);
        await fetch('/api/auth', {
            method: 'DELETE',
        });
        // set the user state to null
        mutate(null);
        isLoading(false);
    };
    return (
        <>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-5">
                        {!user ? (
                            <img src='/Images/logo.png' className="img-fluid" alt="Welcome to PatientCare" />
                        ) : (
                            <img src="/Images/Home2.png" className="img-fluid" alt="User Dashboard" />
                        )}
                    </div>
                    <div className="col-md-7">
                        <div className="card-body h-100 text-center">
                            <div className='row h-100' style={{ flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div className='col-sm-12'>
                                    <h2 style={{ marginTop: '0' }}>
                                        <span style={{ fontWeight: 'bolder', color: `${user ? '#5c9eff' : '#5c9eff'}`, textShadow: '2px 2px black' }}>
                                            Hello
                                        </span> {!user ? 'Stranger' : user.name}
                                    </h2>
                                    <p>Welcome to <strong>PatientCare</strong> – Revolutionizing Medical File Management</p>
                                </div>
                                <div className='col-sm-12'>
                                    {!user ? (
                                        <>
                                            <div className="card-text">
                                                PatientCare offers a seamless way to manage and access medical files online. With our innovative platform, healthcare providers can easily create, manage, and retrieve patient files through a unique QR code system. This system ensures that critical patient information is readily available when needed, improving the efficiency of medical care delivery.
                                            </div>
                                            <div className="alert alert-primary my-2" role="alert">
                                                Explore our features and see how we can transform your medical file management process.
                                            </div>
                                        </>
                                    ) : (<AfterLogin />)}
                                </div>
                                <div className='col-sm-12' style={{ alignSelf: 'end' }}>
                                    {!user ? (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/login">
                                                    <a className="btn btn-primary">Log in</a>
                                                </Link>
                                                <Link href="/signup">
                                                    <a className="btn btn-primary">Sign up</a>
                                                </Link>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                <Link href="/user/[userId]" as={`/user/${user._id}`}>
                                                    <a className="btn btn-primary">Profile</a>
                                                </Link>
                                                <button className="btn btn-primary" onClick={handleLogout}>Logout</button>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
