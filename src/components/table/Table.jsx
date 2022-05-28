import './Table.css'
import { FaTrashAlt } from 'react-icons/fa';
import { GrUpdate } from "react-icons/gr";


const refresh = () => {
    //e.stopPropagation(); 
    //console.log(e)
    console.log('HERE')
}

export default props => {
    return (
        <div class="table-wrapper">
            <table className="fl-table">
                <thead>
                    <tr>
                        <th></th>
                        <th></th>
                        {props.keys.map((h) => {
                            return <th>{h}</th>
                        })}
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((line) => {
                        return <tr>
                            <td><button onclick={refresh()}><FaTrashAlt /></button></td>
                            <td><button><GrUpdate /></button></td>
                            {
                                props.keys.map((h) => {
                                    if (h === 'autCgm' || h === 'status') {
                                        return (<td><select name={h} id={h + '_' + line[h]} defaultValue={line[h]} >
                                            <option value="true">Ativo</option>
                                            <option value="false">Inativo</option>
                                        </select></td>
                                        )
                                    } 
                                    if(h === 'versaoEstavel' || h === 'linkAtualizacao')
                                        return <td><input
                                            value={line[h]}
                                        ></input></td>
                                    
                                    return (<td>{line[h]}</td>)
                                })
                            }</tr>

                    })}

                </tbody>
            </table>
        </div>
    )
}