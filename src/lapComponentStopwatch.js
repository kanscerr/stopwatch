const NewComponent = (props) => {
    return(
        <div className="lapItem">
            <h4>{props.text}</h4>
            <h4>{props.hour} : {props.min} : {props.sec} : {props.milliSec}</h4>
        </div>
    )
}

export { NewComponent };