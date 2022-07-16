import './Button.css'

export default props => {
    return (
        <div className="defaultButton">
            <button
                type={props?.type ? props?.type : "button"}
                onClick={props.onClick}
            >
            {props.label}</button>
        </div>
    )
}