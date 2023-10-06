function Square({ className, index, eventHandler, value }) {
    // Return JSX that uses all the props needed for a square on the board.
    return (
        <div className={className}
            id={index}
            onClick={eventHandler}>
            {(value != null) ? value : ""}
        </div>
    );
}

export default Square;