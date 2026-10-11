
// 📁 src/components/Header.jsx

function Header() {
    return (
        <header className="site-header">
            <div className="header-content">
                <div className="brand">
                    <span className="brand-name">
                        Future <span>Stacks</span>
                    </span>
                </div>

                <div className="header-tech">
                    <span className="code-icon" aria-hidden="true">
                        {"</>"}
                    </span>
                    <span>React 18</span>
                </div>
            </div>
        </header>
    );
}

export default Header;
