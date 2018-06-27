import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header className="py-5 bg-image-full" >
                <div className="col-lg-12 text-center">
                    <h1 className="mt-5">Hello-Books</h1>
                    <p className="lead">A Library Management System</p>
                </div>
            </header>
        )
    }
}

export default Header