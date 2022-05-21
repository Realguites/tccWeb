import './Table.css'

export default props => {
    /*<td>{props.data.map((line) => line.map((h) => '<td>' + h + '</td>'))}</td> */
    console.log('asdsadsadasd',props.data)
    return (
        <div className="defaultTable">
            <table>
                <tr>
                    {props.headers.map((h)=>{
                       return <th>{h}</th>
                    })}
                </tr>

                
                {props.data.map((line) => {
                    //return line.map((h) => '<td>' + h + '</td>')
                    console.log( line)
                })}  
                
            </table>
        </div>
    )
}