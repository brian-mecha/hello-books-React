import React from 'react';

class Header extends React.Component {
    render() {
        return (
            <header class="py-5 bg-image-full" >
                <div class="col-lg-12 text-center">
                    <h1 class="mt-5">Hello-Books</h1>
                    <p class="lead">A Library Management System</p>
                </div>
            </header>
        )
    }
}

export default Header