import classNames from 'classname'

function Button({onClick, className, outline, children}) {
    return (
        <button onClick = {onClick} className = {classNames('button', 
        className, 
        {'button--outline': outline}
        )}>
            {children}
        </button>
    );
}

export default Button